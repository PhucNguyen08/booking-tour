/* eslint-disable react-hooks/exhaustive-deps */
import '@/assets/css/ImgQuill.scss';
import PageTitle from '@/components/pageTitle/PageTitle';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { createNews, updateNews, getOneNews } from './NewsService';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { transformFile } from '@/utils/uploadImg';
import ReactQuill from 'react-quill';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        [{ color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
    ],
};

const formats = [
    'header',
    'font',
    'size',
    'color',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
});

const NewsDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { newsId } = useParams();
    const queryClient = useQueryClient();
    const [coverImg, setCoverImg] = useState('');

    useEffect(() => {
        if (location.pathname !== '/admin/news/create') {
            handleGetOneNews(newsId);
        }
    }, [location.pathname, newsId]);

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const handleGetOneNews = async id => {
        const response = await getOneNews(id);
        form.setValue('title', response.title);
        form.setValue('content', response.content);
        setCoverImg(response.coverImg);
    };

    const onSubmit = data => {
        if (location.pathname === '/admin/news/create') {
            const newData = { ...data, coverImg: coverImg };
            mutate(newData);
        } else {
            const updateData = { ...data, coverImg: coverImg, id: newsId };
            console.log(updateData);
            mutateUpdate(updateData);
        }
    };

    const handleUploadImg = e => {
        const file = e.target.files[0];
        transformFile(file, uploadedImage => {
            setCoverImg(uploadedImage);
        });
    };

    const { mutate } = useMutation({
        mutationFn: createNews,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['news'],
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
            navigate('/admin/news/list');
        },
    });

    const { mutate: mutateUpdate } = useMutation({
        mutationFn: updateNews,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['news'],
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
            navigate('/admin/news/list');
        },
    });

    return (
        <div>
            <PageTitle
                title={
                    location.pathname === '/admin/news/create'
                        ? 'Thêm mới'
                        : 'Sửa'
                }
            />
            <div className='mt-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tiêu đề</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Nhập tên tiêu đề ...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Ảnh bìa</Label>
                                <Input
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    className='mt-2'
                                    onChange={handleUploadImg}
                                />
                                <div className='mt-2'>
                                    {coverImg && (
                                        <img
                                            src={coverImg}
                                            alt='image'
                                            className='w-[150px] h-[150px] object-cover'
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='col-start-1 col-end-4'>
                                <FormField
                                    control={form.control}
                                    name='content'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nội dung tin tức
                                            </FormLabel>
                                            <FormControl>
                                                <ReactQuill
                                                    className='quill w-full'
                                                    theme='snow'
                                                    modules={modules}
                                                    formats={formats}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='text-right pt-6'>
                            <Button type='submit'>Lưu</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default NewsDetail;
