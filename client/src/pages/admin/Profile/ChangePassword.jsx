import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changePassword } from '@/pages/client/Profile/ProfileService';
import PageTitle from '@/components/pageTitle/PageTitle';

const schema = yup.object({
    oldPassword: yup.string().required('Vui lòng nhập dữ liệu'),
    password: yup.string().required('Vui lòng nhập dữ liệu'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
});

const defaultValues = {
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
};
const ChangePasswordAdmin = () => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
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
            form.reset(defaultValues);
        },
    });

    const onSubmit = data => {
        mutate({
            oldPassword: data.oldPassword,
            newPassword: data.password,
        });
    };
    return (
        <div>
            <PageTitle title='Thay đổi mật khẩu' />
            <div className='py-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='oldPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mật khẩu cũ (*)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    type='password'
                                                    placeholder='Nhập mật khẩu cũ ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-start-1'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mật khẩu mới (*)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    type='password'
                                                    placeholder='Nhập mật khẩu mới ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-start-1'>
                                <FormField
                                    control={form.control}
                                    name='passwordConfirmation'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Xác nhận mật khẩu (*)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    type='password'
                                                    placeholder='Xác nhận mật khẩu mới ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='pt-6'>
                            <Button type='submit' className='bg-blueColor'>
                                Thay đổi
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ChangePasswordAdmin;
