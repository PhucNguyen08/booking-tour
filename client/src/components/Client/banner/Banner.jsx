import { BannerImg } from '@/utils/img';
import { Button } from '@/components/ui/button';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useGetLocations } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            departureDay: new Date(),
        },
    });
    const queryLocation = useGetLocations();

    if (queryLocation.isLoading) {
        return <div className='hidden'>Loading...</div>;
    }

    const onSubmit = data => {
        let queryParams = '';

        if (data.typeId) {
            queryParams += `type=${data.typeId}&`;
        }

        if (data.departurePlaceId) {
            queryParams += `departure=${data.departurePlaceId}&`;
        }

        if (data.destinationPlaceId) {
            queryParams += `destination=${data.destinationPlaceId}&`;
        }

        queryParams += `departureDay=${format(
            data.departureDay,
            'yyyy-MM-dd'
        )}`;

        navigate(`/tour/all?${queryParams}`);
    };
    return (
        <section
            className='bg-no-repeat bg-cover h-[500px] relative'
            style={{ backgroundImage: `url(${BannerImg})` }}>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[1300px]'>
                <div className='grid place-items-center gap-5'>
                    <h3 className='text-white text-2xl font-bold xl:text-6xl'>
                        Chào mừng đến với OH Travel
                    </h3>
                    <p className='text-white text-lg font-normal'>
                        Du lịch theo cá tính trải nghiệm giá cả phải chăng
                    </p>
                    <div className='bg-white xl:rounded-full rounded-2xl p-7 w-96 xl:w-[1000px]'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='grid xl:grid-cols-5 gap-3 grid-cols-1'>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='typeId'
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}>
                                                    <SelectTrigger className='w-full xl:w-[180px] focus:ring-transparent'>
                                                        <SelectValue placeholder='Chọn loại tour' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn loại tour
                                                            </SelectLabel>
                                                            <SelectItem value='1'>
                                                                Tour nội địa
                                                            </SelectItem>
                                                            <SelectItem value='2'>
                                                                Tour quốc tế
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='departurePlaceId'
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full xl:w-[180px] focus:ring-transparent'>
                                                        <SelectValue placeholder='Chọn điểm khởi hành' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn điểm khởi
                                                                hành
                                                            </SelectLabel>
                                                            {queryLocation.data?.map(
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
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='destinationPlaceId'
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}>
                                                    <SelectTrigger className='w-full xl:w-[180px] focus:ring-transparent'>
                                                        <SelectValue placeholder='Chọn điểm đến' />
                                                    </SelectTrigger>
                                                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Chọn điểm đến
                                                            </SelectLabel>
                                                            {queryLocation.data?.map(
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
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='departureDay'
                                            render={({ field }) => (
                                                <Popover
                                                    open={isCalendarOpen}
                                                    onOpenChange={
                                                        setIsCalendarOpen
                                                    }>
                                                    <PopoverTrigger asChild>
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
                                                                setIsCalendarOpen(
                                                                    false
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
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type='submit'
                                            className='bg-slate-500 hover:bg-gray-600 w-full'>
                                            <Search className='mr-2 h-4 w-4' />
                                            Tìm tour
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
