/* eslint-disable react-hooks/rules-of-hooks */
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useGetNews } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import CustomModal from '@/components/dialog/Modal';
import { X } from 'lucide-react';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteNews } from './NewsService';

const News = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const query = useGetNews();
    const { closeModal, openModal, modalIsOpen } = useModal();
    const [idNews, setIdNews] = useState();

    const columns = [
        {
            accessorKey: 'index',
            header: 'STT',
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'title',
            header: 'Tên tiêu đề',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {row.getValue('title')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'coverImg',
            header: 'Ảnh bìa',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        <img src={row.getValue('coverImg')} alt='image' />
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

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteNews,
        onSuccess: () => {
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
            queryClient.invalidateQueries({
                queryKey: ['news'],
                exact: true,
            });
            closeModal();
        },
    });

    const handleAdd = () => {
        navigate('/admin/news/create');
    };

    const handleEdit = async id => {
        navigate('/admin/news/' + id);
    };

    const handleDelete = id => {
        openModal();
        setIdNews(id);
    };

    return (
        <div>
            <PageTitle title='Tin tức' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên tiêu đề'}
                    filter={'title'}
                    onClick={handleAdd}
                />
                {query.isLoading && <div className='hidden'>Loading...</div>}
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
                                    mutateDelete(idNews);
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

export default News;
