import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { createUser, getUser, getUsers } from './UserService';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useModal from '@/hooks/useModal';
import CustomModal from '@/components/dialog/Modal';

const schema = yup.object({
    fullName: yup.string().required(),
    account: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
});

const defaultValues = {
    fullName: '',
    account: '',
    email: '',
    isAdmin: false,
};

const Users = () => {
    const queryClient = useQueryClient();
    const query = useQuery({ queryKey: ['users'], queryFn: getUsers });

    const { closeModal, openModal, modalIsOpen } = useModal();

    const [isEdit, setIsEdit] = useState(false);

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const { mutate } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'], exact: true });
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

    const onSubmit = data => {
        if (!isEdit) {
            mutate(data);
        }
    };

    const handleReset = () => {
        form.reset(defaultValues);
    };

    if (query.isLoading) {
        return <div>loading...</div>;
    }

    const columns = [
        {
            accessorKey: 'index',
            header: 'STT',
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'account',
            header: 'Tài khoản',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>{row.getValue('account')}</div>
                );
            },
        },
        {
            accessorKey: 'fullName',
            header: 'Tên',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>{row.getValue('fullName')}</div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => {
                return <div className='truncate'>{row.getValue('email')}</div>;
            },
        },
        {
            accessorKey: 'isAdmin',
            header: 'Quyền',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {row.getValue('isAdmin') ? 'Admin' : 'Khách hàng'}
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
                            Xem
                        </Button>
                        <Button variant='secondary'>Xóa</Button>
                    </div>
                );
            },
        },
    ];

    const handleEdit = async id => {
        const res = await getUser(id);
        form.setValue('account', res.account);
        form.setValue('email', res.email);
        form.setValue('fullName', res.fullName);
        openModal();
        setIsEdit(true);
    };

    const handleAdd = () => {
        openModal();
        setIsEdit(false);
        handleReset();
    };

    return (
        <div>
            <PageTitle title='Người dùng' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên tài khoản'}
                    filter={'account'}
                    onClick={handleAdd}
                />
            </div>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                minWidth='700px'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                        {isEdit ? 'Xem thông tin' : 'Thêm mới'}
                    </h2>
                    <Button onClick={closeModal} variant='ghost'>
                        <X className='w-4 h-4' />
                    </Button>
                </div>
                <div className='py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='account'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tài khoản</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Nhập số điện thoại ...'
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
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='abc@gmail.com'
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
                                        name='fullName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tên người dùng
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Nhập tên người dùng ...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='text-right pt-6 flex justify-end gap-2'>
                                <Button type='button' onClick={closeModal}>
                                    Đóng
                                </Button>
                                {!isEdit && <Button type='submit'>Lưu</Button>}
                            </div>
                        </form>
                    </Form>
                </div>
            </CustomModal>
        </div>
    );
};

export default Users;
