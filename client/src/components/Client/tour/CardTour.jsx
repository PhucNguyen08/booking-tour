/* eslint-disable react/prop-types */
import { Card } from '@/components/ui/card';
import {
    BadgeDollarSign,
    CalendarDays,
    ChevronsRight,
    Clock,
    MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatter';
import { format } from 'date-fns';

const CardTour = ({ tour }) => {
    return (
        <Card className='hover:shadow-xl'>
            <div className='card-zoom'>
                <Link to={'/detail-tour/' + tour.id + '/' + tour.tourName}>
                    <img
                        src={tour.coverImg}
                        alt={tour.tourName}
                        className='card-zoom-image md:w-full xl:h-[190px] object-cover'
                    />
                </Link>
            </div>
            <div className='bg-white p-4 flex flex-col'>
                <div className='flex-1'>
                    <Link
                        to={'/detail-tour/' + tour.id + '/' + tour.tourName}
                        className='text-[#003C71] text-base font-bold h-[80px] line-clamp-3'>
                        {tour.tourName}
                    </Link>
                </div>
                <div className='text-base'>
                    {tour?.schedules.length !== 0 && (
                        <div className='flex gap-2 items-center'>
                            <CalendarDays className='w-4 h-4' />
                            <div className='line-clamp-1'>
                                <span className='font-bold'>Khởi hành: </span>
                                <span>
                                    {tour.schedules
                                        .map(ts =>
                                            format(
                                                ts.departureDay,
                                                'dd/MM/yyyy'
                                            )
                                        )
                                        .join(', ')}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className='flex gap-2 items-center'>
                        <MapPin className='w-4 h-4' />
                        <div>
                            <span className='font-bold'>Xuất phát:</span>
                            <span> {tour.departurePlace.locationName}</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Clock className='w-4 h-4' />
                        <div>
                            <span className='font-bold'>Thời gian:</span>
                            <span>
                                {' '}
                                {tour.numberOfDay} ngày {tour.numberOfNight} đêm
                            </span>
                        </div>
                    </div>
                    {tour?.schedules.length !== 0 && (
                        <div className='flex gap-2 items-center'>
                            <BadgeDollarSign className='w-4 h-4' />
                            <div className='flex gap-1'>
                                <span className='font-bold'>Giá: </span>
                                <span className='text-[#ef1104] font-semibold'>
                                    {formatPrice.format(
                                        tour?.schedules[0]?.adultPrice
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className='pt-2'>
                        <span className='flex justify-end text-[#27822a] items-center'>
                            <ChevronsRight className='w-4 h-4' />{' '}
                            <Link
                                to={
                                    '/detail-tour/' +
                                    tour.id +
                                    '/' +
                                    tour.tourName
                                }
                                className='hover:underline cursor-pointer'>
                                Xem thêm
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CardTour;
