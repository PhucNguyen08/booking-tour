import Wrapper from '@/components/Client/wrapper/Wrapper';
import { Card } from '@/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from './ResetPasswordService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const schema = yup.object({
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu của bạn quá ngắn.'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu phải trùng khớp'),
});

const defaultValues = {
    password: '',
    passwordConfirmation: '',
};

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const { mutate } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            setSubmitted(true);
        },
    });

    const onSubmit = data => {
        mutate({
            id: searchParams.get('userId'),
            token: searchParams.get('token'),
            ...data,
        });
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div>
            <Breadcrumb label='Cập nhật mật khẩu' />
            <Wrapper className='my-16'>
                <div className='grid place-items-center'>
                    <Card className='xl:w-[500px] p-5 bg-white shadow-lg'>
                        <h3 className='uppercase font-bold text-xl text-center'>
                            Cập nhật mật khẩu của bạn
                        </h3>
                        <div className='py-4'>
                            {!submitted && (
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-3'>
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Mật khẩu mới'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='passwordConfirmation'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Xác nhận mật khẩu'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <Button
                                                type='submit'
                                                className='w-full'>
                                                Cập nhật mật khẩu
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                            {submitted && (
                                <div className='py-4'>
                                    <p className='text-center my-4'>
                                        Mật khẩu của bạn đã được lưu
                                    </p>
                                    <div className='flex items-center justify-center'>
                                        <Button
                                            type='button'
                                            className='w-1/2'
                                            onClick={handleSignIn}>
                                            Đăng nhập lại
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </Wrapper>
        </div>
    );
};

export default ResetPassword;
