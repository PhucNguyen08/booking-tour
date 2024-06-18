/* eslint-disable react-hooks/exhaustive-deps */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PageTitle from '@/components/pageTitle/PageTitle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
    useGetLocations,
    useGetTypeTours,
    useGetSites,
} from '@/hooks/useFetch';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useState } from 'react';
import { transformFile } from '@/utils/uploadImg';
import '@/assets/css/ImgQuill.scss';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { createTour, getTour, updateTour } from './TourService';
import ReactQuillCustom from '@/components/reactQuill/ReactQuillCustom';
import { BeatLoader } from 'react-spinners';

const modules = {
    toolbar: {
        container: [
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
    },
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
    tourName: yup.string().required(),
    departurePlaceId: yup.string().required(),
    destinationPlaceId: yup
        .string()
        .required()
        .notOneOf(
            [yup.ref('departurePlaceId')],
            'Điểm khởi hành và điểm đến không được giống nhau.'
        ),
    typeId: yup.string().required(),
    vehicle: yup.string().required(),
    numberOfDay: yup.number().required(),
    numberOfNight: yup.number().required(),
    sites: yup.array(),
});

const initialValues = {
    tourName: '',
    departurePlaceId: '',
    destinationPlaceId: '',
    typeId: '',
    vehicle: '',
    numberOfDay: '',
    numberOfNight: '',
    sites: [],
};

const TourDetail = () => {
    const [selectSite, setSelectSite] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [tourImgs, setTourImgs] = useState([]);
    const [content, setContent] = useState();
    const { tourId } = useParams();
    const location = useLocation();
    const queryLocation = useGetLocations();
    const queryTypeTour = useGetTypeTours();
    const querySite = useGetSites();
    const navigate = useNavigate();
    const inputDayRef = useRef();

    useEffect(() => {
        if (location.pathname !== '/admin/tour/create') {
            handleGetTour(tourId);
        } else {
            handleReset();
        }
    }, [location.pathname, tourId]);

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    const { control } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sites',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createTour,
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
            navigate('/admin/tour/list');
        },
    });

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
        mutationFn: updateTour,
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
            navigate('/admin/tour/list');
        },
    });

    const onSubmit = data => {
        if (data.numberOfDay < data.numberOfNight) {
            toast.error('Số ngày phải lớn hơn số đêm', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        if (tourImgs.length < 6) {
            toast.error('Bạn phải chọn 6 ảnh Tour', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        if (location.pathname === '/admin/tour/create') {
            const newData = {
                ...data,
                departurePlaceId: +data.departurePlaceId,
                destinationPlaceId: +data.destinationPlaceId,
                tourProgramDesc: content,
                typeId: +data.typeId,
                coverImg: coverImg,
                images: tourImgs,
            };
            mutate(newData);
        } else {
            const updateData = {
                ...data,
                coverImg: coverImg,
                images: tourImgs,
                departurePlaceId: +data.departurePlaceId,
                destinationPlaceId: +data.destinationPlaceId,
                tourProgramDesc: content,
                typeId: +data.typeId,
                id: tourId,
            };
            mutateUpdate(updateData);
        }
    };

    const handleGetTour = async id => {
        const res = await getTour(id);
        console.log(res.tourSites);
        form.setValue('tourName', res.tourName);
        form.setValue('departurePlaceId', res.departurePlace.id);
        form.setValue('destinationPlaceId', res.destinationPlace.id);
        form.setValue('typeId', res.typeId);
        form.setValue('vehicle', res.vehicle);
        form.setValue('numberOfDay', res.numberOfDay);
        form.setValue('numberOfNight', res.numberOfNight);
        form.setValue('shortDesc', res.shortDesc);
        form.setValue(
            'sites',
            res.tourSites.map(site => ({
                day: site.day,
                siteId: site.siteId,
            }))
        );
        setContent(res.tourProgramDesc);
        setCoverImg(res.coverImg);
        setTourImgs(res.images.map(img => img.url));
    };

    const handleUploadImg = e => {
        const file = e.target.files[0];
        transformFile(file, uploadedImage => {
            setCoverImg(uploadedImage);
        });
    };

    const handleUploadMultipleImg = e => {
        const files = Array.from(e.target.files);

        if (files.length > 6) {
            toast.error('Bạn chỉ được thêm 6 ảnh', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        const filesBase64 = [];

        files.forEach(file => {
            transformFile(file, uploadedImage => {
                filesBase64.push(uploadedImage);

                if (filesBase64.length === files.length) {
                    setTourImgs(prevImgs => [...prevImgs, ...filesBase64]);
                }
            });
        });
    };

    const handleReset = () => {
        form.reset(initialValues);
        setCoverImg('');
        setTourImgs([]);
    };

    const handleDeleteImage = index => {
        const updatedImages = [...tourImgs];
        updatedImages.splice(index, 1);
        setTourImgs(updatedImages);
    };

    if (
        queryLocation.isLoading ||
        queryTypeTour.isLoading ||
        querySite.isLoading
    ) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <PageTitle
                title={
                    location.pathname === '/admin/tour/create'
                        ? 'Thêm mới'
                        : 'Sửa'
                }
            />
            <div className='py-6'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-3 gap-3'>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='tourName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên tour</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Nhập tên tour ...'
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
                                    name='departurePlaceId'
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Nơi đi</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                                        <SelectValue placeholder='Chọn nơi đi' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn nơi đi
                                                            </SelectLabel>
                                                            {queryLocation.data.map(
                                                                item => {
                                                                    if (
                                                                        item.locationName !==
                                                                        'Việt Nam'
                                                                    ) {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                value={item.id.toString()}>
                                                                                {
                                                                                    item.locationName
                                                                                }
                                                                            </SelectItem>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='destinationPlaceId'
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Nơi đến</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                                        <SelectValue placeholder='Chọn nơi đến' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn nơi đến
                                                            </SelectLabel>
                                                            {queryLocation.data.map(
                                                                item => {
                                                                    if (
                                                                        item.locationName !==
                                                                        'Việt Nam'
                                                                    ) {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                value={item.id.toString()}>
                                                                                {
                                                                                    item.locationName
                                                                                }
                                                                            </SelectItem>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='vehicle'
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Phương tiện</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                                        <SelectValue placeholder='Chọn phương tiện' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn phương tiện
                                                            </SelectLabel>
                                                            <SelectItem
                                                                value={'plane'}>
                                                                Máy Bay
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={'car'}>
                                                                Ô Tô
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='numberOfDay'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số ngày</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Nhập số ngày ...'
                                                    type='number'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='numberOfNight'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số đêm</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Nhập số đêm ...'
                                                    type='number'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='typeId'
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Loại Tour</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                                        <SelectValue placeholder='Chọn loại tour' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn loại tour
                                                            </SelectLabel>
                                                            {queryTypeTour.data.map(
                                                                item => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={item.id.toString()}>
                                                                        {
                                                                            item.typeName
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                />
                            </div>
                            <div className='col-start-1 col-end-4 space-y-2'>
                                <Label>Chương trình tour</Label>
                                <ReactQuillCustom
                                    value={content}
                                    onChange={setContent}
                                />
                            </div>
                            <div className='col-start-1 col-end-4'>
                                <FormField
                                    control={form.control}
                                    name='shortDesc'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mô tả tour ngắn
                                            </FormLabel>
                                            <FormControl>
                                                <ReactQuill
                                                    className='quill'
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
                            <div className='col-start-1'>
                                <Label>Các địa danh trong tour</Label>
                                <div className='flex gap-2 items-center'>
                                    <Input
                                        ref={inputDayRef}
                                        type='number'
                                        placeholder='Ngày...'
                                        className='mt-2'
                                    />
                                    <Select
                                        value={selectSite}
                                        onValueChange={value =>
                                            setSelectSite(value)
                                        }>
                                        <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                            <SelectValue placeholder='Chọn địa danh' />
                                        </SelectTrigger>
                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Chọn địa danh
                                                </SelectLabel>
                                                {querySite.data.map(item => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}>
                                                        {item.siteName}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={() => {
                                            if (
                                                fields.some(
                                                    item =>
                                                        item.siteId ===
                                                            +selectSite &&
                                                        item.day ===
                                                            +inputDayRef.current
                                                                .value
                                                )
                                            ) {
                                                setSelectSite('');
                                                inputDayRef.current.value = '';
                                                toast.error(
                                                    'Không được thêm địa danh trùng nhau',
                                                    {
                                                        position: 'top-right',
                                                        autoClose: 3000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: 'light',
                                                    }
                                                );
                                                return;
                                            }
                                            append({
                                                day: +inputDayRef.current.value,
                                                siteId: +selectSite,
                                            });
                                            setSelectSite('');
                                            inputDayRef.current.value = '';
                                        }}
                                        type='button'
                                        className='mt-2'
                                        variant='secondary'>
                                        Thêm
                                    </Button>
                                </div>
                            </div>
                            <div className='col-start-1 col-end-4'>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ngày</TableHead>
                                            <TableHead>Địa danh</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fields.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name={`sites.${index}.day`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        disabled
                                                        value={
                                                            querySite.data.find(
                                                                site =>
                                                                    site.id ===
                                                                    Number(
                                                                        form.getValues(
                                                                            `sites.${index}.siteId`
                                                                        )
                                                                    )
                                                            )?.siteName
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant='secondary'
                                                        onClick={() =>
                                                            remove(index)
                                                        }>
                                                        X
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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
                                            alt='image!'
                                            className='w-[150px] h-[150px] object-cover'
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='col-start-1'>
                                <Label>Ảnh Tour</Label>
                                <Input
                                    type='file'
                                    multiple
                                    accept='image/png, image/jpeg'
                                    className='mt-2'
                                    onChange={handleUploadMultipleImg}
                                />
                            </div>
                            <div className='col-start-1 col-end-4'>
                                <div className='mt-2 flex gap-5'>
                                    {tourImgs &&
                                        tourImgs.map((image, i) => (
                                            <div key={i} className='relative'>
                                                <img
                                                    src={image}
                                                    alt='image'
                                                    className='w-[150px] h-[150px] object-cover'
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        handleDeleteImage(i)
                                                    }
                                                    className='absolute -top-4 -right-[15px] w-6 h-6 p-4 flex items-center justify-center bg-slate-200 rounded-full hover:bg-slate-400 hover:text-white'>
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='text-right pt-6'>
                            <Button type='submit'>
                                {isPending || isPendingUpdate ? (
                                    <BeatLoader
                                        color='#fff'
                                        loading={isPending || isPendingUpdate}
                                        size={10}
                                    />
                                ) : (
                                    'Lưu'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default TourDetail;
