import { useContext, useState } from 'react';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { Card } from '@/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginPost } from '@/utils/api';
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
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import { UserContext } from '@/context/userContext';

const schema = yup.object({
    account: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ'),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu 6 ký tự trở lên.'),
});

const defaultValues = {
    account: '',
    password: '',
};

const LoginClient = () => {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState();

    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: LoginPost,
        onSuccess: data => {
            setUser(data);
            navigate('/');
        },
        onError: err => {
            if (err.response.status === 404) {
                setError('Tài khoản không chính xác');
            }
            if (err.response.status === 400) {
                setError('Tài khoản hoặc mật khẩu không đúng');
            }
        },
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });
    const onSubmit = data => {
        mutate(data);
    };
    return (
        <div>
            <Breadcrumb label='Đăng nhập' />
            <Wrapper className='my-16'>
                <div className='grid place-items-center'>
                    <Card className='xl:w-[500px] p-5 bg-white shadow-lg'>
                        <h3 className='uppercase font-bold text-xl text-center'>
                            Đăng nhập
                        </h3>
                        <div className='py-4'>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-3'>
                                    <FormField
                                        control={form.control}
                                        name='account'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Nhập số điện thoại'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='Nhập mật khẩu'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {error && (
                                        <p className='text-red-600'>{error}</p>
                                    )}
                                    <div className='text-center'>
                                        <Button type='submit'>Đăng nhập</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        <div className='flex justify-between'>
                            <span>
                                <Link to='/forgot-password'>
                                    Quên mật khẩu?
                                </Link>
                            </span>
                            <span>
                                Bạn không có tài khoản?{' '}
                                <Link to='/register' className='text-blueColor'>
                                    Đăng ký
                                </Link>
                            </span>
                        </div>
                    </Card>
                </div>
            </Wrapper>
        </div>
    );
};

export default LoginClient;
