/* eslint-disable react-hooks/rules-of-hooks */
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { X } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { createSite, updateSite, deleteSite, getSite } from './SiteService';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { useGetSites, useGetLocations } from '@/hooks/useFetch';
import CustomModal from '@/components/dialog/Modal';
import useModal from '@/hooks/useModal';

const schema = yup.object({
    siteName: yup.string().required(),
    locationId: yup.number().required(),
    siteNote: yup.string().nullable(),
});

const Site = () => {
    const queryClient = useQueryClient();
    const query = useGetSites();
    const queryLocation = useGetLocations();
    const [mode, setMode] = useState('add');
    const [idSite, setIdSite] = useState();
    const { closeModal, openModal, modalIsOpen } = useModal();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            siteName: '',
            siteDescription: '',
        },
    });

    const onSubmit = data => {
        if (mode === 'add') {
            mutate(data);
        } else if (mode === 'edit') {
            mutateUpdate({
                id: idSite,
                ...data,
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: createSite,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['sites'],
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
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateUpdate } = useMutation({
        mutationFn: updateSite,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['sites'],
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
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteSite,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['sites'],
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
            handleReset();
            closeModal();
        },
    });

    const handleReset = () => {
        form.setValue('siteName', '');
        form.setValue('siteNote', '');
        form.setValue('locationId', '');
    };

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'siteName',
            header: 'Tên địa danh',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {row.getValue('siteName')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'location',
            header: 'Thuộc',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {row.original?.location.locationName}
                    </div>
                );
            },
        },
        {
            accessorKey: 'siteNote',
            header: 'Ghi chú',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        {row.getValue('siteNote')}
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

    const handleGetSite = async id => {
        const data = await getSite(id);
        form.setValue('siteName', data.siteName);
        form.setValue('siteNote', data.siteNote ?? '');
        form.setValue('locationId', data.locationId.toString());
    };

    const handleEdit = async id => {
        openModal();
        setMode('edit');
        handleGetSite(id);
        setIdSite(id);
    };

    const handleAdd = () => {
        openModal();
        setMode('add');
        handleReset();
    };

    const handleDelete = id => {
        openModal();
        setIdSite(id);
        setMode('delete');
    };

    return (
        <div>
            <PageTitle title='Địa Danh' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên địa danh'}
                    filter={'siteName'}
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
                                            name='siteName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tên địa danh
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='eg: điểm du lịch ...'
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
                                            name='locationId'
                                            render={({ field }) => (
                                                <>
                                                    <FormLabel>
                                                        Nơi thuộc địa danh
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}>
                                                            <SelectTrigger className='w-full focus:ring-transparent'>
                                                                <SelectValue placeholder='Chọn nơi thuộc địa danh' />
                                                            </SelectTrigger>
                                                            <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Chọn nơi
                                                                        thuộc
                                                                        địa danh
                                                                    </SelectLabel>
                                                                    {queryLocation.data.map(
                                                                        item => (
                                                                            <SelectItem
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                value={item.id.toString()}>
                                                                                {
                                                                                    item.locationName
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='siteNote'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Ghi chú
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder='ghi chú...'
                                                            className='resize-none'
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
                                            mutateDelete(idSite);
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

export default Site;
