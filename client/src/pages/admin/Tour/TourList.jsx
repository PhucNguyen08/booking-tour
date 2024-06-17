import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useGetTours } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { deleteTour } from './TourService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import CustomModal from '@/components/dialog/Modal';
import { X } from 'lucide-react';

const TourList = () => {
    const query = useGetTours();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { closeModal, openModal, modalIsOpen } = useModal();
    const [idTour, setIdTour] = useState();

    const { mutate } = useMutation({
        mutationFn: deleteTour,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tours'],
                exact: true,
            });
            toast.success('Bạn đã xóa thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        },
    });

    const columns = [
        {
            accessorKey: 'index',
            header: 'STT',
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'tourName',
            header: 'Tên tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        {row.getValue('tourName')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'coverImg',
            header: 'Hình ảnh',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        <img
                            src={row.getValue('coverImg')}
                            alt={row.getValue('tourName')}
                        />
                    </div>
                );
            },
        },
        {
            header: 'Thao tác',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-1'>
                        <Button
                            variant='secondary'
                            onClick={() => handleEdit(row.original.id)}>
                            Sửa
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={() => handleDelete(row.original.id)}>
                            Xóa
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (query.isLoading) {
        return <div className='hidden'>Loading...</div>;
    }

    const handleEdit = id => {
        navigate('/admin/tour/edit/' + id);
    };

    const handleAdd = () => {
        navigate('/admin/tour/create');
    };

    const handleDelete = id => {
        openModal();
        setIdTour(id);
    };

    return (
        <div>
            <PageTitle title='Tour' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'tour'}
                    filter={'tourName'}
                    onClick={handleAdd}
                />
                <CustomModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    minWidth={'500px'}>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-semibold'>Xóa</h2>
                        <Button onClick={closeModal} variant='ghost'>
                            <X className='w-4 h-4' />
                        </Button>
                    </div>
                    <div className='py-4'>
                        <p>Bạn có muốn xóa không ?</p>
                        <div className='text-right pt-6'>
                            <Button
                                type='button'
                                onClick={() => {
                                    mutate(idTour);
                                    closeModal();
                                }}>
                                Xóa
                            </Button>
                        </div>
                    </div>
                </CustomModal>
            </div>
        </div>
    );
};

export default TourList;
