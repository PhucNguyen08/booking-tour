/* eslint-disable react-hooks/exhaustive-deps */
import PageTitle from '@/components/pageTitle/PageTitle';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/pages/client/Profile/ProfileService';
import { getCurrentAdmin } from '@/utils/getCurrentUser';
import { transformFile } from '@/utils/uploadImg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NoAvatar } from '@/utils/img';

const schema = yup.object({
    fullName: yup.string().required('Vui lòng nhập dữ liệu'),
    email: yup.string().email().required('Vui lòng nhập đúng email'),
});

const defaultValues = {
    fullName: '',
    email: '',
    birthDate: '',
    address: '',
};

const ProfileAdmin = () => {
    const currentAdmin = getCurrentAdmin();

    const [avatar, setAvatar] = useState();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: data => updateProfile(currentAdmin.id, data),
        onSuccess: data => {
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
            localStorage.setItem('adminUser', JSON.stringify(data));
        },
    });

    const handleAvatarChange = event => {
        const file = event.target.files[0];
        transformFile(file, uploadedImage => {
            form.setValue('avatar', uploadedImage);
        });
        setAvatar(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (currentAdmin) {
            form.setValue('fullName', currentAdmin?.fullName);
            form.setValue('email', currentAdmin?.email);
            currentAdmin?.birthDate &&
                form.setValue(
                    'birthDate',
                    format(currentAdmin.birthDate, 'dd-MM-yyyy')
                );
            currentAdmin?.address &&
                form.setValue('address', currentAdmin?.address);
            form.setValue('avatar', currentAdmin.avatar);
            setAvatar(currentAdmin.avatar);
        }
    }, []);

    const onSubmit = data => {
        const birthDate = parse(data.birthDate, 'dd-MM-yyyy', new Date());
        const formatDate = format(birthDate, 'yyyy-MM-dd');
        const newData = { ...data, birthDate: formatDate };
        console.log(newData);
        mutate(newData);
    };

    return (
        <div>
            <PageTitle title='Thông tin cá nhân' />
            <section className='py-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid gap-4 grid-cols-12'>
                            <div className='col-span-12 flex flex-col gap-4 items-center justify-center'>
                                <img
                                    src={avatar ? avatar : NoAvatar}
                                    alt='avatar'
                                    className='w-32 h-32 object-cover'
                                />
                                <FormField
                                    control={form.control}
                                    name='avatar'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='cursor-pointer hover:bg-blueColor hover:text-white rounded-lg p-3'>
                                                Chọn ảnh mới
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='file'
                                                    accept='image/*'
                                                    className='hidden'
                                                    {...field}
                                                    value={
                                                        field.value?.fileName
                                                    }
                                                    onChange={e => {
                                                        field.onChange(
                                                            e.target.files[0]
                                                        );
                                                        handleAvatarChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-3 flex items-center'>
                                <span>Họ và tên (*)</span>
                            </div>
                            <div className='col-span-9'>
                                <FormField
                                    control={form.control}
                                    name='fullName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    placeholder='Nhập họ và tên ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-3 flex items-center'>
                                <span>Email (*)</span>
                            </div>
                            <div className='col-span-9'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    placeholder='abc@gmail.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-3 flex items-center'>
                                <span>Ngày sinh</span>
                            </div>
                            <div className='col-span-9'>
                                <FormField
                                    control={form.control}
                                    name='birthDate'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    placeholder='10-04-1945'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-3 flex items-center'>
                                <span>Địa chỉ</span>
                            </div>
                            <div className='col-span-9'>
                                <FormField
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                                    placeholder='Địa chỉ ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-2'>
                            <Button className='bg-blueColor mt-5' type='submit'>
                                {isPending ? (
                                    <BeatLoader
                                        color='#fff'
                                        loading={isPending}
                                        size={10}
                                    />
                                ) : (
                                    'Lưu'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </div>
    );
};

export default ProfileAdmin;
