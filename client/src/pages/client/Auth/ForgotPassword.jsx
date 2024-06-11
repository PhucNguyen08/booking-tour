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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { forgotPassword } from './ResetPasswordService';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email('Nhập đúng định dạng email').required(),
});

const defaultValues = {
    email: '',
};

const LoginClient = () => {
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: err => {
            setError(err.message);
        },
        onSuccess: () => {
            setError('');
            setSubmitted(true);
        },
    });

    const onSubmit = data => {
        mutate(data);
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div>
            <Breadcrumb label='Quên mật khẩu' />
            <Wrapper className='my-16'>
                <div className='grid place-items-center'>
                    <Card className='xl:w-[500px] p-5 bg-white shadow-lg'>
                        <h3 className='uppercase font-bold text-xl text-center'>
                            Quên mật khẩu
                        </h3>
                        {!submitted && (
                            <>
                                <div className='py-4'>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className='space-y-3'>
                                            <FormField
                                                control={form.control}
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
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
                                            {error && (
                                                <p className='text-red-600'>
                                                    {error}
                                                </p>
                                            )}
                                            <div>
                                                <Button
                                                    type='submit'
                                                    className='w-full'>
                                                    Gửi
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                                <div className='text-right'>
                                    <Link
                                        to={'/login'}
                                        className='text-blueColor underline text-sm'>
                                        Đăng nhập
                                    </Link>
                                </div>
                            </>
                        )}
                        {submitted && (
                            <div className='py-4'>
                                <p>
                                    Nếu tài khoản đó nằm trong hệ thống của
                                    chúng tôi, chúng tôi sẽ gửi cho bạn một liên
                                    kết qua email để đặt lại mật khẩu của bạn
                                </p>
                                <div className='flex items-center justify-center'>
                                    <Button
                                        type='button'
                                        className='w-1/2'
                                        onClick={handleSignIn}>
                                        Quay lại để đăng nhập
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </Wrapper>
        </div>
    );
};

export default LoginClient;
