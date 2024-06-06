/* eslint-disable react-hooks/rules-of-hooks */
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CalendarIcon, X } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-toastify';
import {
    createTourSchedule,
    getTourSchedule,
    updateTourSchedule,
    deleteTourSchedule,
} from './TourService';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useGetTours, useGetTourSchedules } from '@/hooks/useFetch';
import useModal from '@/hooks/useModal';
import CustomModal from '@/components/dialog/Modal';

const schema = yup.object({
    tourId: yup.string().required(),
    departureDay: yup.date().required(),
    returnDay: yup.date().required(),
    childPrice: yup.number().required(),
    adultPrice: yup.number().required(),
    maxParticipants: yup.number().required(),
});

const defaultValues = {
    tourId: '',
    departureDay: new Date(),
    returnDay: new Date(),
    childPrice: 0,
    adultPrice: 0,
    maxParticipants: 0,
    numberOfParticipantsBooked: 0,
};

const TourSchedule = () => {
    const queryClient = useQueryClient();
    const query = useGetTourSchedules();
    const queryTours = useGetTours();
    const { closeModal, openModal, modalIsOpen } = useModal();
    const [mode, setMode] = useState('add');
    const [idTourSchedule, setIdTourSchedule] = useState();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = data => {
        if (mode === 'add') {
            const newData = { ...data, tourId: +data.tourId };
            mutate(newData);
        } else if (mode === 'edit') {
            mutateUpdate({ ...data, tourId: +data.tourId, id: idTourSchedule });
        }
    };

    const { mutate } = useMutation({
        mutationFn: createTourSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tourSchedules'],
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
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateUpdate } = useMutation({
        mutationFn: updateTourSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tourSchedules'],
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
            handleReset();
            closeModal();
        },
    });

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteTourSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tourSchedules'],
                exact: true,
            });
            toast.success('Bạn đã xóa thành công', {
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

    const handleReset = () => {
        form.reset(defaultValues);
    };

    const handleGetTourSchedule = async id => {
        const data = await getTourSchedule(id);
        form.setValue('tourId', data.tourId.toString());
        form.setValue('departureDay', data.departureDay);
        form.setValue('returnDay', data.returnDay);
        form.setValue('childPrice', data.childPrice);
        form.setValue('adultPrice', data.adultPrice);
        form.setValue('maxParticipants', data.maxParticipants);
        form.setValue(
            'numberOfParticipantsBooked',
            data.numberOfParticipantsBooked
        );
        form.setValue('status', data.status);
    };

    const handleAdd = () => {
        openModal();
        setMode('add');
        handleReset();
    };

    const handleEdit = async id => {
        openModal();
        setMode('edit');
        handleGetTourSchedule(id);
        setIdTourSchedule(id);
    };

    const handleDelete = id => {
        openModal();
        setIdTourSchedule(id);
        setMode('delete');
    };

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'tourId',
            header: 'Tên tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {
                            queryTours.data?.find(
                                tour =>
                                    tour.id === Number(row.getValue('tourId'))
                            )?.tourName
                        }
                    </div>
                );
            },
        },
        {
            accessorKey: 'departureDay',
            header: 'Ngày khởi hành',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {format(row.getValue('departureDay'), 'dd-MM-yyyy')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'returnDay',
            header: 'Ngày về',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {format(row.getValue('returnDay'), 'dd-MM-yyyy')}
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
                            onClick={() => handleEdit(row.getValue('id'))}>
                            Sửa
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={() => handleDelete(row.getValue('id'))}>
                            Xóa
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (queryTours.isLoading) {
        <div>Loading...</div>;
    }

    return (
        <div>
            <PageTitle title='Tour ngày' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'Tên tour'}
                    filter={'tourId'}
                    onClick={handleAdd}
                />
                {query.isLoading && <div>Loading...</div>}
            </div>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                minWidth={mode === 'delete' ? '500px' : '700px'}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                        {mode === 'add' && 'Thêm Mới'}
                        {mode === 'edit' && 'Sửa'}
                        {mode === 'delete' && 'Xóa'}
                    </h2>
                    <Button onClick={closeModal} variant='ghost'>
                        <X className='w-4 h-4' />
                    </Button>
                </div>
                <div className='py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {!(mode === 'delete') && (
                                <div className='grid grid-cols-3 gap-3'>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='tourId'
                                            render={({ field }) => (
                                                <>
                                                    <FormLabel>Tour</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}>
                                                            <SelectTrigger className='w-full focus:ring-transparent mt-2'>
                                                                <SelectValue placeholder='Chọn tour' />
                                                            </SelectTrigger>
                                                            <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Chọn
                                                                        tour
                                                                    </SelectLabel>
                                                                    {queryTours.data.map(
                                                                        item => (
                                                                            <SelectItem
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                value={item.id.toString()}>
                                                                                {
                                                                                    item.tourName
                                                                                }
                                                                            </SelectItem>
                                                                        )
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
                                            name='departureDay'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Ngày khởi hành
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={
                                                                            'outline'
                                                                        }
                                                                        className={cn(
                                                                            'w-full pl-3 text-left font-normal',
                                                                            !field.value &&
                                                                                'text-muted-foreground'
                                                                        )}>
                                                                        {field.value ? (
                                                                            format(
                                                                                field.value,
                                                                                'dd-MM-yyyy'
                                                                            )
                                                                        ) : (
                                                                            <span>
                                                                                Chọn
                                                                                ngày
                                                                                xuất
                                                                                phát
                                                                            </span>
                                                                        )}
                                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className='w-auto p-0'
                                                                align='start'>
                                                                <Calendar
                                                                    mode='single'
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    onSelect={e => {
                                                                        field.onChange(
                                                                            e
                                                                        );
                                                                    }}
                                                                    disabled={date =>
                                                                        date <
                                                                        new Date()
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='returnDay'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Ngày về
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={
                                                                            'outline'
                                                                        }
                                                                        className={cn(
                                                                            'w-full pl-3 text-left font-normal',
                                                                            !field.value &&
                                                                                'text-muted-foreground'
                                                                        )}>
                                                                        {field.value ? (
                                                                            format(
                                                                                field.value,
                                                                                'dd-MM-yyyy'
                                                                            )
                                                                        ) : (
                                                                            <span>
                                                                                Chọn
                                                                                ngày
                                                                                xuất
                                                                                phát
                                                                            </span>
                                                                        )}
                                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className='w-auto p-0'
                                                                align='start'>
                                                                <Calendar
                                                                    mode='single'
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    onSelect={e => {
                                                                        field.onChange(
                                                                            e
                                                                        );
                                                                    }}
                                                                    disabled={date =>
                                                                        date <
                                                                        new Date()
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='childPrice'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Giá vé trẻ em
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='0'
                                                            type='number'
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
                                            name='adultPrice'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Giá vé người lớn
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='0'
                                                            type='number'
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
                                            name='maxParticipants'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Số lượng người tối đa
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='0'
                                                            type='number'
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
                                            name='numberOfParticipantsBooked'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Số lượng người đã đặt
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='0'
                                                            type='number'
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
                                            name='status'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Trạng thái
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}>
                                                            <SelectTrigger className='w-full focus:ring-transparent'>
                                                                <SelectValue placeholder='Chọn trạng thái' />
                                                            </SelectTrigger>
                                                            <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Chọn
                                                                        trạng
                                                                        thái
                                                                    </SelectLabel>
                                                                    <SelectItem
                                                                        value={
                                                                            'still'
                                                                        }>
                                                                        Còn chỗ
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            'full'
                                                                        }>
                                                                        Hết
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                            {mode === 'delete' && (
                                <p>Bạn có muốn xóa không ?</p>
                            )}
                            <div className='text-right pt-6'>
                                {!(mode === 'delete') && (
                                    <Button type='submit'>
                                        {mode === 'add' && 'Lưu'}
                                        {mode === 'edit' && 'Lưu'}
                                    </Button>
                                )}
                                {mode === 'delete' && (
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            mutateDelete(idTourSchedule);
                                            closeModal();
                                        }}>
                                        Xóa
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </CustomModal>
        </div>
    );
};

export default TourSchedule;
