/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { dataListSort, dataSelectPrice } from '@/utils/mockData';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectLabel,
    SelectValue,
} from '@/components/ui/select';
import CardTour from '@/components/Client/tour/CardTour';
import CardTourSkeleton from '@/components/Client/tour/CardTourSkeleton';
import { useForm } from 'react-hook-form';
import PaginationSection from '@/components/paginationSection/PaginationSection';
import { searchTour } from './ListTourService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormField, Form } from '@/components/ui/form';
import { useGetLocations } from '@/hooks/useFetch';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

const ListTour = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const form = useForm();
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const queryLocation = useGetLocations();
    const query = useQuery({
        queryKey: [
            'list-tour',
            currentPage,
            search.get('sort'),
            search.get('type'),
            search.get('departure'),
            search.get('destination'),
            search.get('departureDay'),
            search.get('priceRange'),
        ],
        queryFn: () =>
            searchTour(
                {
                    typeId: search.get('type') || null,
                    departurePlaceId: search.get('departure') || null,
                    destinationPlaceId: search.get('destination') || null,
                    departureDay: search.get('departureDay') || null,
                    sort: search.get('sort') || null,
                    priceRange: search.get('priceRange') || null,
                },
                currentPage,
                6
            ),
    });

    if (queryLocation.isLoading) {
        return <div className='hidden'>Loading...</div>;
    }

    const onSubmit = data => {
        if (
            !(
                data.departurePlace ||
                data.destinationPlace ||
                data.typeTour ||
                data.priceRange
            )
        ) {
            navigate('/tour/all');
            return;
        }

        if (data.priceRange === 'default') {
            search.delete('priceRange');
        } else if (data.priceRange) {
            search.set('priceRange', data.priceRange);
        }

        data.departurePlace && search.set('departure', data.departurePlace);
        data.typeTour && search.set('type', data.typeTour);
        data.destinationPlace &&
            search.set('destination', data.destinationPlace);

        setSearch(search, {
            replace: false,
        });
    };

    const handleSort = value => {
        if (value === 'default') {
            search.delete('sort');
        } else {
            search.set('sort', value);
        }
        setSearch(search, {
            replace: false,
        });
    };

    return (
        <div>
            <Breadcrumb label='Tour' />
            <Wrapper className='my-5'>
                <div className='grid grid-cols-12 gap-5'>
                    <div className='lg:col-span-3 max-lg:hidden'>
                        <div className='p-4 sticky top-[10px]'>
                            <h3 className='font-bold text-sm py-2 px-4 mb-4 uppercase bg-blueColor text-white'>
                                Lọc tour theo
                            </h3>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-3'>
                                            <label>Nơi khởi hành</label>
                                            <FormField
                                                control={form.control}
                                                name='departurePlace'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }>
                                                        <SelectTrigger className='w-full focus:ring-transparent'>
                                                            <SelectValue placeholder='Chọn nơi khởi hành' />
                                                        </SelectTrigger>
                                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Chọn nơi
                                                                    khởi hành
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
                                        <div className='flex flex-col gap-3'>
                                            <label>Tuyến</label>
                                            <FormField
                                                control={form.control}
                                                name='typeTour'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }>
                                                        <SelectTrigger className='w-full focus:ring-transparent'>
                                                            <SelectValue placeholder='Chọn tuyến' />
                                                        </SelectTrigger>
                                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Chọn tuyến
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
                                        <div className='flex flex-col gap-3'>
                                            <label>Nơi đến</label>
                                            <FormField
                                                control={form.control}
                                                name='destinationPlace'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}>
                                                        <SelectTrigger className='w-full focus:ring-transparent'>
                                                            <SelectValue placeholder='Chọn điểm đến' />
                                                        </SelectTrigger>
                                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Chọn điểm
                                                                    đến
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
                                        <div className='flex flex-col gap-3'>
                                            <label>Khoảng giá</label>
                                            <FormField
                                                control={form.control}
                                                name='priceRange'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}>
                                                        <SelectTrigger className='w-full focus:ring-transparent'>
                                                            <SelectValue placeholder='Chọn khoảng giá' />
                                                        </SelectTrigger>
                                                        <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Chọn khoảng
                                                                    giá
                                                                </SelectLabel>
                                                                {dataSelectPrice.map(
                                                                    item => (
                                                                        <SelectItem
                                                                            value={
                                                                                item.value
                                                                            }
                                                                            key={
                                                                                item.value
                                                                            }>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        <Button
                                            type='submit'
                                            variant='ghost'
                                            className='bg-blueColor text-white mt-3'>
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <div className='lg:col-span-9 col-span-full'>
                        <div className='mb-4'>
                            <h2 className='text-[32px] font-bold mb-2'>
                                Tất cả tour
                            </h2>
                            <p className='text-[#99A2BC] text-base'>
                                Tour du lịch tại OH!Travel. Du lịch 5 châu -
                                Trải nghiệm sắc xuân thế giới
                            </p>
                        </div>
                        <div className='flex justify-end items-center border-t border-solid border-[#E2E6F2] py-4'>
                            <span className='pr-2'>Sắp xếp theo</span>
                            <Select
                                onValueChange={handleSort}
                                defaultValue={'default'}>
                                <SelectTrigger className='w-full xl:w-[150px] focus:ring-transparent'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                    <SelectGroup>
                                        {dataListSort.map(item => (
                                            <SelectItem
                                                value={item.value}
                                                key={item.value}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                            {!query.isLoading ? (
                                query.data.tours.length === 0 ? (
                                    <p className='text-center col-span-3'>
                                        Không có kết quả tìm kiếm !
                                    </p>
                                ) : (
                                    query.data.tours.map(item => (
                                        <CardTour tour={item} key={item.id} />
                                    ))
                                )
                            ) : (
                                Array.from({ length: 6 }, (v, i) => (
                                    <CardTourSkeleton key={i} />
                                ))
                            )}
                        </div>
                        <div className='py-4'>
                            <PaginationSection
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={query.data?.totalTours}
                                itemPerPage={6}
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default ListTour;
