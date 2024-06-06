/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { dataListSort } from '@/utils/mockData';
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
import { useForm } from 'react-hook-form';
import PaginationSection from '@/components/paginationSection/PaginationSection';
import { searchTour } from './ListTourService';
import { useSearchParams } from 'react-router-dom';
import { FormField, Form } from '@/components/ui/form';
import { useGetLocations } from '@/hooks/useFetch';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

const ListTour = () => {
    const [sortType, setSortType] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const form = useForm();
    const [searchParams] = useSearchParams();
    const queryLocation = useGetLocations();
    const query = useQuery({
        queryKey: ['list-tour', currentPage],
        queryFn: () =>
            searchTour(
                {
                    typeId: searchParams.get('type') || null,
                    departurePlaceId: searchParams.get('departure') || null,
                    destinationPlaceId: searchParams.get('destination') || null,
                    departureDay: searchParams.get('departureDay') || null,
                },
                currentPage,
                6
            ),
    });

    if (queryLocation.isLoading || query.isLoading) {
        return <div>Loading...</div>;
    }

    const onSubmit = data => {
        console.log(data);
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
                                                                <SelectItem value='6'>
                                                                    Hà Nội
                                                                </SelectItem>
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
                                onValueChange={setSortType}
                                defaultValue={sortType}>
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
                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
                            {query.data.tours.map(item => (
                                <CardTour tour={item} key={item.id} />
                            ))}
                        </div>
                        <div className='py-4'>
                            <PaginationSection
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={query.data.totalTours}
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
