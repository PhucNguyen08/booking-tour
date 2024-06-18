import Wrapper from '@/components/Client/wrapper/Wrapper';
import { Card } from '@/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
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
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterPost } from '@/utils/api';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

const schema = yup.object({
    fullName: yup.string().required('Vui lòng nhập tên'),
    email: yup
        .string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email'),
    birthDate: yup.date().required('Vui lòng chọn ngày sinh'),
    account: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ'),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu của bạn quá ngắn.'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu phải trùng khớp')
        .required('Vui lòng nhập mật khẩu'),
});

const defaultValues = {
    fullName: '',
    email: '',
    account: '',
    password: '',
    passwordConfirmation: '',
};

const RegisterClient = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: RegisterPost,
        onSuccess: () => {
            toast.success('Bạn đã đăng ký thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            navigate('/login');
        },
        onError: err => {
            console.log(err);
        },
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });
    const onSubmit = data => {
        const formattedDate = format(data.birthDate, 'yyyy-MM-dd');

        mutate({
            fullName: data.fullName,
            account: data.account,
            password: data.password,
            email: data.email,
            birthDate: formattedDate,
        });
    };
    return (
        <div>
            <Breadcrumb label='Đăng ký' />
            <Wrapper className='py-10'>
                <div className='grid place-items-center'>
                    <Card className='xl:w-[500px] p-5 bg-white shadow-lg'>
                        <h3 className='uppercase font-bold text-xl text-center'>
                            Đăng ký
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
                                                <FormLabel>
                                                    Số điện thoại
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='eg: 0938293841'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                                                        placeholder='Nhập tên người dùng'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='birthDate'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col gap-2'>
                                                <FormLabel>Ngày sinh</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        {...field}
                                                        className={
                                                            'border-input'
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Nhập email'
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
                                                        placeholder='*******'
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
                                                <FormLabel>
                                                    Xác nhận mật khẩu
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='*******'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className='text-center'>
                                        <Button type='submit'>Đăng ký</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        <div className='flex justify-between'>
                            <span>
                                Bạn đã có tài khoản?{' '}
                                <Link to='/login' className='text-blueColor'>
                                    Đăng nhập
                                </Link>
                            </span>
                        </div>
                    </Card>
                </div>
            </Wrapper>
        </div>
    );
};

export default RegisterClient;
