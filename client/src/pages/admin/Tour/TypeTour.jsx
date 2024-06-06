import { useState } from 'react';
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    createTypeTour,
    getTypeTour,
    updateTypeTour,
    deleteTypeTour,
} from './TourService';
import { useGetTypeTours } from '@/hooks/useFetch';
import { toast } from 'react-toastify';
import CustomModal from '@/components/dialog/Modal';
import useModal from '@/hooks/useModal';

const schema = yup.object({
    typeName: yup.string().required(),
    englishName: yup.string().nullable(),
});

const TypeTour = () => {
    const queryClient = useQueryClient();
    const query = useGetTypeTours();
    const { closeModal, openModal, modalIsOpen } = useModal();
    const [mode, setMode] = useState('add');
    const [idTypeTour, setIdTypeTour] = useState();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            typeName: '',
            englishName: '',
        },
    });

    const { mutate } = useMutation({
        mutationFn: createTypeTour,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['typeTours'],
                exact: true,
            });
            toast.success('Bạn đã thêm mới thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            closeModal();
            handleReset();
        },
    });

    const { mutate: mutateUpdate } = useMutation({
        mutationFn: updateTypeTour,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['typeTours'],
                exact: true,
            });
            toast.success('Bạn đã cập nhật thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            closeModal();
            handleReset();
        },
    });

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteTypeTour,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['typeTours'],
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

    const onSubmit = data => {
        if (mode === 'add') {
            mutate(data);
        } else if (mode === 'edit') {
            const dataUpdate = { ...data, id: idTypeTour };
            mutateUpdate(dataUpdate);
        }
    };

    const handleReset = () => {
        form.reset({
            typeName: '',
            englishName: '',
        });
    };

    const handleGetTypeTour = async id => {
        const res = await getTypeTour(id);
        form.setValue('typeName', res.typeName);
        form.setValue('englishName', res.englishName);
    };

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'typeName',
            header: 'Tên Loại Tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {row.getValue('typeName')}
                    </div>
                );
            },
        },

        {
            accessorKey: 'englishName',
            header: 'Tên Tiếng Anh',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        {row.getValue('englishName')}
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
                            onClick={() => handleEdit(row.getValue('id'))}>
                            Sửa
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={() => handleDelete(row.getValue('id'))}>
                            Xóa
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handleEdit = id => {
        openModal();
        handleGetTypeTour(id);
        setIdTypeTour(id);
        setMode('edit');
    };

    const handleAdd = () => {
        openModal();
        setMode('add');
        handleReset();
    };

    const handleDelete = id => {
        openModal();
        setIdTypeTour(id);
        setMode('delete');
    };

    return (
        <div>
            <PageTitle title='Loại Tour' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên loại Tour'}
                    filter={'typeName'}
                    onClick={handleAdd}
                />
                {query.isLoading && <div>Loading...</div>}
            </div>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                minWidth={mode === 'delete' ? '500px' : '700px'}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                        {mode === 'add' && 'Thêm Mới'}
                        {mode === 'edit' && 'Sửa'}
                        {mode === 'delete' && 'Xóa'}
                    </h2>
                    <Button onClick={closeModal} variant='ghost'>
                        <X className='w-4 h-4' />
                    </Button>
                </div>
                <div className='py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {!(mode === 'delete') && (
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='typeName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tên loại Tour
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Nhập tên loại tour ...'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='englishName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tên Tiếng Anh
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Nhập tên tiếng anh ...'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                            {mode === 'delete' && (
                                <p>Bạn có muốn xóa không ?</p>
                            )}
                            <div className='text-right pt-6'>
                                {!(mode === 'delete') && (
                                    <Button type='submit'>
                                        {mode === 'add' && 'Lưu'}
                                        {mode === 'edit' && 'Lưu'}
                                    </Button>
                                )}
                                {mode === 'delete' && (
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            mutateDelete(idTypeTour);
                                            closeModal();
                                        }}>
                                        Xóa
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </CustomModal>
        </div>
    );
};

export default TypeTour;
