import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGetLocations } from '@/hooks/useFetch';
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
import {
    getParentLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation,
} from './LocationService';
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
import useModal from '@/hooks/useModal';
import CustomModal from '@/components/dialog/Modal';
import { toast } from 'react-toastify';

const schema = yup.object({
    locationName: yup.string().required(),
});

const Location = () => {
    const queryClient = useQueryClient();
    const query = useGetLocations();
    const queryParents = useQuery({
        queryKey: ['parentLocations'],
        queryFn: getParentLocations,
    });
    const { closeModal, openModal, modalIsOpen } = useModal();
    const [idLocation, setIdLocation] = useState();
    const [mode, setMode] = useState('add');

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            locationName: '',
        },
    });

    const { mutate } = useMutation({
        mutationFn: createLocation,
        onSuccess: () => {
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
            queryClient.invalidateQueries({
                queryKey: ['locations'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['parentLocations'],
                exact: true,
            });
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateUpdate } = useMutation({
        mutationFn: updateLocation,
        onSuccess: () => {
            toast.success('Bạn đã sửa thành công', {
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
                queryKey: ['locations'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['parentLocations'],
                exact: true,
            });
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteLocation,
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
                queryKey: ['locations'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['parentLocations'],
                exact: true,
            });
            handleReset();
            closeModal();
        },
    });

    const onSubmit = data => {
        if (mode === 'add') {
            mutate(data);
        } else if (mode === 'edit') {
            mutateUpdate({ ...data, id: idLocation });
        }
    };

    const handleGetLocation = async id => {
        const res = await getLocation(id);
        console.log(res);
        form.setValue('locationName', res.locationName);
        form.setValue('parentId', res.parentId);
    };

    const handleReset = () => {
        form.setValue('locationName', '');
        form.setValue('parentId', '');
    };

    const handleAdd = () => {
        openModal();
        setMode('add');
        handleReset();
    };

    const handleEdit = id => {
        openModal();
        setMode('edit');
        handleGetLocation(id);
        setIdLocation(id);
    };

    const handleDelete = id => {
        openModal();
        setIdLocation(id);
        setMode('delete');
    };

    const columns = [
        {
            accessorKey: 'index',
            header: 'STT',
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'locationName',
            header: 'Tên vị trí',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {console.log(row)}
                        {row.getValue('locationName')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'parent',
            header: 'Thuộc',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[250px]'>
                        {row.original.parent?.locationName}
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

    if (query.isLoading || queryParents.isLoading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <PageTitle title='Vị trí' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên quốc gia hoặc thành phố'}
                    filter={'locationName'}
                    onClick={handleAdd}
                />
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
                                            name='locationName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tên vị trí
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Nhập tên vị trí...'
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
                                            name='parentId'
                                            render={({ field }) => (
                                                <>
                                                    <FormLabel>Thuộc</FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}>
                                                        <SelectTrigger className='w-full focus:ring-transparent'>
                                                            <SelectValue placeholder='Chọn' />
                                                        </SelectTrigger>
                                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Chọn
                                                                </SelectLabel>
                                                                {queryParents.data.map(
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
                                                </>
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
                                            mutateDelete(idLocation);
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

export default Location;
