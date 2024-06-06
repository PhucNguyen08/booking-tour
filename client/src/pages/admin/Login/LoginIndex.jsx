import background from '/img/background.jpg';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginPost } from '@/utils/api';

const schema = yup.object({
    account: yup.string().required(),
    password: yup.string().required(),
});

const Login = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: LoginPost,
        onSuccess: data => {
            localStorage.setItem('adminUser', JSON.stringify(data));
            if (data.isAdmin === true) {
                navigate('/admin');
            }
        },
        onError: err => {
            console.log(err);
        },
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = data => {
        mutate(data);
    };
    return (
        <div
            className='bg-cover bg-center w-full h-screen relative'
            style={{ backgroundImage: `url(${background})` }}>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white p-8 rounded-xl'>
                <h3 className='text-center text-2xl font-semibold'>
                    Đăng nhập
                </h3>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-3'>
                            <FormField
                                control={form.control}
                                name='account'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tài khoản</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Nhập tài khoản'
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
                                        <FormLabel>Mật khẩu</FormLabel>
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
                            <div className='text-center'>
                                <Button type='submit'>Đăng nhập</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
