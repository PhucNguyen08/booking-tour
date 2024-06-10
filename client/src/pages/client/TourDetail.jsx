/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import {
    Bus,
    CalendarClock,
    Mail,
    MapPin,
    Phone,
    Plane,
    Printer,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { useRef, useState } from 'react';
import '@/assets/css/TourDetail.scss';
import '@/assets/css/Tab.scss';
import { Button } from '@/components/ui/button';
import TableSchedule from '@/components/Client/Schedule/TableSchedule';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PolicyTour from '@/components/Client/tour/PolicyTour';
import { useParams } from 'react-router-dom';
import { getTour } from '../admin/Tour/TourService';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '@/components/ui/separator';
import Comment from '@/components/Client/comment';
import { useReactToPrint } from 'react-to-print';

const TourDetail = props => {
    const { id, name } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const componentRef = useRef();

    const query = useQuery({
        queryKey: ['tour', id],
        queryFn: () => getTour(id),
    });

    console.log(query.data);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'chương trình tour ' + name,
    });

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <Breadcrumb label={name} />
            <Wrapper className='py-6'>
                <h3 className='font-medium text-[28px] mb-6'>{name}</h3>
                <div className='flex flex-col xl:flex-row gap-4'>
                    <div className='flex items-center gap-2'>
                        <div className='text-blueColor w-[45px] h-[45px] rounded-2xl flex items-center justify-center bg-[#e6f4ff]'>
                            <MapPin />
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span className='text-[#76809B] font-normal'>
                                Khởi hành từ
                            </span>
                            <span className='text-blueColor'>
                                {query.data.departurePlace.locationName}
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='text-blueColor w-[45px] h-[45px] rounded-2xl flex items-center justify-center bg-[#e6f4ff]'>
                            <MapPin />
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span className='text-[#76809B] font-normal'>
                                Điểm đến
                            </span>
                            <span className='text-blueColor'>
                                {query.data.destinationPlace.locationName}
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='text-blueColor w-[45px] h-[45px] rounded-2xl flex items-center justify-center bg-[#e6f4ff]'>
                            <CalendarClock />
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span className='text-[#76809B] font-normal'>
                                Thời gian
                            </span>
                            <span className='text-blueColor'>
                                {query.data.numberOfDay} ngày{' '}
                                {query.data.numberOfNight} đêm
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='text-blueColor w-[45px] h-[45px] rounded-2xl flex items-center justify-center bg-[#e6f4ff]'>
                            {query.data.vehicle === 'car' ? <Bus /> : <Plane />}
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span className='text-[#76809B] font-normal'>
                                Di chuyển bằng
                            </span>
                            <span className='text-blueColor'>
                                {query.data.vehicle === 'car'
                                    ? 'Ô tô'
                                    : 'Máy bay'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='pt-3'>
                    <h3 className='font-semibold text-base'>
                        Tour này có gì hay
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: query.data.shortDesc,
                        }}></div>
                    <Button
                        onClick={() => handlePrint()}
                        className='bg-blueColor mt-3'>
                        In chương trình tour
                        <Printer className='ml-2 h-4 w-4' />
                    </Button>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-12 gap-3'>
                    <div className='xl:col-span-8'>
                        <div className='mt-8'>
                            <Swiper
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{
                                    swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                            ? thumbsSwiper
                                            : null,
                                }}
                                modules={[Navigation, Thumbs]}
                                grabCursor={true}
                                className='tour-images-slider h-[200px] xl:h-[450px] mb-3'>
                                {query.data.images.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={item.url} alt={item.url} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={false}
                                spaceBetween={10}
                                slidesPerView={5}
                                modules={[Navigation, Thumbs]}
                                className='tour-images-slider'>
                                {query.data.images.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='tour-img-thumbs-wrapper'>
                                            <img
                                                src={item.url}
                                                alt={item.url}
                                                className='h-[89px] object-cover'
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {query.data?.schedules.length > 0 && (
                            <div>
                                <TableSchedule data={query.data.schedules} />
                            </div>
                        )}
                        <div className='mt-3'>
                            <Tabs>
                                <TabList>
                                    <Tab
                                        className={
                                            'react-tabs__tab bg-[#e6f4ff] rounded-t-md text-black hover:bg-blueColor hover:text-white'
                                        }
                                        selectedClassName='tab-selected'>
                                        Chương trình Tour
                                    </Tab>
                                    <Tab
                                        className={
                                            'react-tabs__tab bg-[#e6f4ff] rounded-t-md text-black hover:bg-blueColor hover:text-white'
                                        }
                                        selectedClassName='tab-selected'>
                                        Chính sách Tour
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <div
                                        ref={componentRef}
                                        className='tour-detail'
                                        dangerouslySetInnerHTML={{
                                            __html: query.data.tourProgramDesc,
                                        }}></div>
                                </TabPanel>
                                <TabPanel>
                                    <PolicyTour />
                                </TabPanel>
                            </Tabs>
                        </div>
                        <Separator className='mt-4' />
                        <div className='mt-3'>
                            <Comment tourId={id} />
                        </div>
                    </div>
                    <div className='xl:col-span-4'>
                        <div className='sticky top-[10px]'>
                            <div className='border border-solid border-[#ccc] p-6 mb-6 mt-8'>
                                <h3 className='text-blueColor text-sm font-semibold mb-2'>
                                    Hỗ trợ khách hàng
                                </h3>
                                <div className='mb-5'>
                                    <div className='flex gap-1 items-center'>
                                        <Phone className='w-4 h-4' />
                                        <span>Hotline: 1900 6750</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <Mail className='w-4 h-4' />
                                        <span>Email: support@ohtravel.vn</span>
                                    </div>
                                </div>
                                <div>
                                    <Button className='bg-blueColor text-white text-sm w-full'>
                                        <Phone className='w-4 h-4' />
                                        <span className='pl-1'>
                                            Bạn muốn được gọi lại?
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <div className='border border-solid border-[#ccc] p-6 mb-6 mt-8'>
                                <h3 className='text-blueColor text-sm font-semibold mb-2'>
                                    Vì sao nên mua tour online?
                                </h3>
                                <ul className='flex flex-col gap-1'>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            An toàn - Bảo mật
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Tiện lợi, tiết kiệm thời gian
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Không tính phí giao dịch
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Giao dịch bảo đảm
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Nhận thêm ưu đãi
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className='border border-solid border-[#ccc] p-6 mb-6 mt-8'>
                                <h3 className='text-blueColor text-sm font-semibold mb-2'>
                                    Thương hiệu uy tín
                                </h3>
                                <ul className='flex flex-col gap-1'>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Thành lập từ năm 1975
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Thương hiệu lữ hành hàng đầu
                                        </span>
                                    </li>
                                    <li>
                                        <span className='text-[#333] text-sm'>
                                            Thương hiệu quốc gia
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default TourDetail;
