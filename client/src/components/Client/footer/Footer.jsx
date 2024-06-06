import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import { dataNav } from '@/utils/mockData';
import { Facebook, Youtube, Twitter, Instagram, Twitch } from 'lucide-react';
import {
    AppStore,
    GooglePlay,
    MasterCard,
    VnPay,
    Jcb,
    Visa,
} from '@/utils/img';

const Footer = () => {
    return (
        <footer className='border-t border-solid border-[#99A2BC]'>
            <Wrapper className='py-8'>
                <section className='grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2'>
                    <div>
                        <h3 className='uppercase font-bold text-base'>
                            thông tin liên hệ
                        </h3>
                        <ul className='py-3 flex flex-col gap-3'>
                            <li>
                                <p className='text-[13px]'>
                                    <strong className='block text-sm'>
                                        Địa chỉ
                                    </strong>
                                    Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px]'>
                                    <strong className='block text-sm'>
                                        Email
                                    </strong>
                                    support@ohtravel.vn
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px]'>
                                    <strong className='block text-sm'>
                                        Hotline
                                    </strong>
                                    1900 6750
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px]'>
                                    <strong className='block text-sm'>
                                        Thời gian hỗ trợ
                                    </strong>
                                    08:30 - 21:30 các ngày trong tuần
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='uppercase font-bold text-base'>
                            hướng dẫn
                        </h3>
                        <ul className='py-3 flex flex-col gap-3'>
                            {dataNav.map(item => (
                                <li key={item.title}>
                                    <Link
                                        to={item.to}
                                        className='text-[13px] hover:text-blueColor cursor-pointer'>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className='uppercase font-bold text-base'>
                            thông tin cần biết
                        </h3>
                        <ul className='py-3 flex flex-col gap-3'>
                            <li>
                                <p className='text-[13px] hover:text-blueColor cursor-pointer'>
                                    Về chúng tôi
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px] hover:text-blueColor cursor-pointer'>
                                    Câu hỏi thường gặp
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px] hover:text-blueColor cursor-pointer'>
                                    Điều kiện , điều khoản
                                </p>
                            </li>
                            <li>
                                <p className='text-[13px] hover:text-blueColor cursor-pointer'>
                                    Quy chế hoạt động
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h3 className='uppercase font-bold text-base'>
                            kết nối
                        </h3>
                        <div className='flex gap-2'>
                            <span>
                                <Facebook className='w-7 h-7' />
                            </span>
                            <span>
                                <Youtube className='w-7 h-7' />
                            </span>
                            <span>
                                <Twitter className='w-7 h-7' />
                            </span>
                            <span>
                                <Instagram className='w-7 h-7' />
                            </span>
                            <span>
                                <Twitch className='w-7 h-7' />
                            </span>
                        </div>
                        <h3 className='uppercase font-bold text-base'>
                            tải ứng dụng oh travel
                        </h3>
                        <div className='flex gap-1'>
                            <div>
                                <img src={AppStore} alt='AppStore' />
                            </div>
                            <div>
                                <img src={GooglePlay} alt='GooglePlay' />
                            </div>
                        </div>
                        <h3 className='uppercase font-bold text-base'>
                            phương thức thanh toán
                        </h3>
                        <div className='flex gap-2'>
                            <div>
                                <img src={VnPay} alt='VnPay' />
                            </div>
                            <div>
                                <img src={MasterCard} alt='MasterCard' />
                            </div>
                            <div>
                                <img src={Jcb} alt='Jcb' />
                            </div>
                            <div>
                                <img src={Visa} alt='Visa' />
                            </div>
                        </div>
                    </div>
                </section>
            </Wrapper>
        </footer>
    );
};

export default Footer;
