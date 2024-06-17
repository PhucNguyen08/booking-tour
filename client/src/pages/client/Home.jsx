import Banner from '@/components/Client/banner/Banner';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import {
    ImgWhyChoose1,
    ImgWhyChoose2,
    ImgWhyChoose3,
    ImgStep1,
    ImgStep2,
    ImgStep3,
    ImgSectionAbout,
} from '@/utils/img';
import { Check } from 'lucide-react';
import CardTour from '@/components/Client/tour/CardTour';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetTours } from '@/hooks/useFetch';

const Home = () => {
    const query = useGetTours();

    if (query.isLoading) {
        return <div className='hidden'>Loading</div>;
    }

    return (
        <div>
            <Banner />
            <section className='bg-[#f2faff] border-b border-blueColor'>
                <Wrapper className='py-9'>
                    <h1 className='text-center text-3xl font-bold text-black'>
                        Vì sao bạn nên chọn OH Travel
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-[60px]'>
                        <div className='flex items-center gap-4'>
                            <img src={ImgWhyChoose1} alt='image' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-bold text-xl'>
                                    Giá tốt nhất cho bạn
                                </h3>
                                <p className='text-[#76809B] text-sm'>
                                    Có nhiều mức giá đa dạng phù hợp với ngân
                                    sách và nhu cầu của bạn
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <img src={ImgWhyChoose2} alt='image' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-bold text-xl'>
                                    Booking dễ dàng
                                </h3>
                                <p className='text-[#76809B] text-sm'>
                                    Các bước booking và chăm sóc khách hàng
                                    nhanh chóng và thuận tiện
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <img src={ImgWhyChoose3} alt='image' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-bold text-xl'>
                                    Tour du lịch tối ưu
                                </h3>
                                <p className='text-[#76809B] text-sm'>
                                    Đa dạng các loại hình tour du lịch với nhiều
                                    mức giá khác nhau
                                </p>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className='pt-9 mb-20'>
                <Wrapper>
                    <div className='text-center mb-10'>
                        <h3 className='text-3xl font-bold text-black mb-[5px]'>
                            Booking cùng OH Travel
                        </h3>
                        <p className='text-[#76809B] text-base'>
                            Chỉ với 3 bước đơn giản và dễ dàng có ngay trải
                            nghiệm tuyệt vời!
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-16 xl:gap-28'>
                        <div className='flex flex-col items-center'>
                            <div className="w-[50px] h-[50px] relative bg-[#e6f4ff] text-2xl flex items-center justify-center mb-5 rounded-[50px] text-blueColor font-bold md:before:content-[''] md:before:w-[2px] md:before:bg-[#81CAFF] md:before:h-[33px] md:before:absolute md:before:top-full">
                                1
                            </div>
                            <img src={ImgStep1} alt={'image'} />
                            <div className='text-center mt-[25px]'>
                                <h3 className='text-xl font-semibold text-black'>
                                    Tìm nơi muốn đến
                                </h3>
                                <p className='text-sm text-[#76809B]'>
                                    Bất cứ nơi đâu bạn muốn đến, chúng tôi có
                                    tất cả những gì bạn cần
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className="w-[50px] h-[50px] relative bg-[#e6f4ff] text-2xl flex items-center justify-center mb-5 rounded-[50px] text-blueColor font-bold md:before:content-[''] md:before:w-[2px] md:before:bg-[#81CAFF] md:before:h-[33px] md:before:absolute md:before:top-full">
                                2
                            </div>
                            <img
                                src={ImgStep2}
                                alt={'image'}
                                className='h-[100px]'
                            />
                            <div className='text-center mt-[25px]'>
                                <h3 className='text-xl font-semibold text-black'>
                                    Đặt vé
                                </h3>
                                <p className='text-sm text-[#76809B]'>
                                    OH Travel sẽ hỗ trợ bạn đặt vé trực tiếp
                                    nhanh chóng và thuận tiện
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className="w-[50px] h-[50px] relative bg-[#e6f4ff] text-2xl flex items-center justify-center mb-5 rounded-[50px] text-blueColor font-bold md:before:content-[''] md:before:w-[2px] md:before:bg-[#81CAFF] md:before:h-[33px] md:before:absolute md:before:top-full">
                                3
                            </div>
                            <img src={ImgStep3} alt={'image'} />
                            <div className='text-center mt-[25px]'>
                                <h3 className='text-xl font-semibold text-black'>
                                    Thanh toán
                                </h3>
                                <p className='text-sm text-[#76809B]'>
                                    Hoàn thành bước thanh toán và sẵn sàng cho
                                    chuyến đi ngay thôi
                                </p>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className='pb-9 mb-20'>
                <Wrapper>
                    <div className='grid grid-cols-12 gap-3 items-center'>
                        <div className='col-span-12 md:col-span-5'>
                            <h4 className='text-xl mb-[5px] font-bold text-blueColor'>
                                Hiểu hơn về chúng tôi
                            </h4>
                            <h2 className='text-3xl font-bold text-black mb-5'>
                                Lên kế hoạch cho chuyến đi của bạn cùng OH
                                Travel
                            </h2>
                            <p className='text-[#76809B] text-base mb-8 font-normal'>
                                Vinh hạnh của chúng tôi là mang đến cho bạn
                                những chuyến đi đáng nhớ. Mang đến cho bạn những
                                chuyến đi đầy cảm hứng. Khám phá những vùng đất
                                mới. Tự do khám phá cùng chúng tôi.
                            </p>
                            <div>
                                <h4 className='text-xl mb-7 font-bold text-blueColor'>
                                    Cơ hội tuyệt vời để gửi gắm niềm tin cùng OH
                                    Travel. Tại sao không?
                                </h4>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex gap-2 items-center'>
                                        <div className='rounded-full bg-[#E6F4FF] w-[40px] h-[40px] flex items-center justify-center'>
                                            <Check className='text-blueColor' />
                                        </div>
                                        <p>
                                            Hơn 10.000 khách hàng trên khắp cả
                                            nước đã đồng hành cùng chúng tôi
                                        </p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <div className='rounded-full bg-[#E6F4FF] w-[40px] h-[40px] flex items-center justify-center'>
                                            <Check className='text-blueColor' />
                                        </div>
                                        <p>
                                            Bao phủ hơn 1.000 tour trong và
                                            ngoài nước
                                        </p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <div className='rounded-full bg-[#E6F4FF] w-[40px] h-[40px] flex items-center justify-center'>
                                            <Check className='text-blueColor' />
                                        </div>
                                        <p>Tour và giá cả đa dạng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 md:col-span-7'>
                            <img src={ImgSectionAbout} alt='about' />
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className='pt-9 pb-16 bg-[#f6f8fA]'>
                <Wrapper>
                    <h3 className='text-3xl text-black font-bold mb-2'>
                        Du lịch trong nước
                    </h3>
                    <p className='text-base text-[#717484] mb-3'>
                        Cùng OH!Travel nhanh tay đặt ngay tour ngay hôm nay!
                    </p>
                    <div>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            navigation={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                992: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                            modules={[Navigation]}>
                            {query.data.map(item => (
                                <SwiperSlide key={item.id}>
                                    <CardTour tour={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Wrapper>
            </section>
        </div>
    );
};

export default Home;
