import { Link } from 'react-router-dom';
import Logo from '/img/logo.jpg';
import { Headphones, Menu } from 'lucide-react';
import Wrapper from '../wrapper/Wrapper';
import { dataNav } from '@/utils/mockData';
import { NoAvatar } from '@/utils/img';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRef, useState, useEffect, useContext } from 'react';
import { LogoutPost } from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/userContext';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Ava from '/ava.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = event => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const res = await LogoutPost();
        if (res.Status === 'Success') {
            setUser({});
            navigate('/');
        }
    };

    return (
        <header className='shadow-lg bg-white h-20'>
            <Wrapper className='py-3 flex justify-between items-center h-full'>
                <div>
                    <Link to={'/'}>
                        <img
                            src={Logo}
                            alt='Logo'
                            className='w-[166px] h-[40px] object-cover cursor-pointer'
                        />
                    </Link>
                </div>
                <ul className='hidden lg:flex gap-4'>
                    {dataNav.map(item => (
                        <li key={item.title} className='p-2'>
                            <Link className='hover:text-blue-500' to={item.to}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex gap-4 items-center'>
                    <div
                        ref={dropdownRef}
                        className='pr-4 border-r border-solid border-[#E2E6F2] cursor-pointer'>
                        {user?.fullName ? (
                            <>
                                <div className='relative'>
                                    <div
                                        onClick={toggleDropdown}
                                        className='hover:opacity-60'>
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    user?.avatar
                                                        ? user?.avatar
                                                        : NoAvatar
                                                }
                                                className='w-[40px] h-[40px] object-cover'
                                            />
                                            <AvatarFallback>
                                                {user?.fullName}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div
                                        className={`${
                                            isOpen ? 'visible' : 'hidden'
                                        } absolute right-0 top-14 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                        <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                                            <li>
                                                <Button
                                                    variant='ghost'
                                                    className='block w-full text-left font-normal'
                                                    asChild>
                                                    <Link
                                                        to={'/user/my-booking'}>
                                                        Lịch sử đặt tour
                                                    </Link>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button
                                                    variant='ghost'
                                                    className='block w-full text-left font-normal'
                                                    asChild>
                                                    <Link to={'/user/profile'}>
                                                        Thông tin cá nhân
                                                    </Link>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button
                                                    variant='ghost'
                                                    className='block w-full text-left font-normal'
                                                    asChild>
                                                    <Link
                                                        to={
                                                            '/user/change-password'
                                                        }>
                                                        Đổi mật khẩu
                                                    </Link>
                                                </Button>
                                            </li>
                                        </ul>
                                        <div className='py-2'>
                                            <Button
                                                onClick={handleLogout}
                                                variant='ghost'
                                                className='block w-full text-left font-normal'>
                                                Đăng xuất
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link
                                to={'/login'}
                                className='flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg group'>
                                <img
                                    src={Ava}
                                    className='brightness-50 w-[40px] h-[40px] object-cover'
                                />
                                <span className='hidden lg:block'>
                                    Tài khoản
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className='flex items-center gap-1'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Headphones className='cursor-pointer' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>1900 6750</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className='hidden lg:flex flex-col gap-1 text-sm'>
                            <span>Hotline</span>
                            <span className='text-blueColor cursor-pointer'>
                                1900 6750
                            </span>
                        </div>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='lg:hidden'>
                                <Menu className='h-6 w-6' />
                                <span className='sr-only'>
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='right'>
                            <div className='grid w-[200px] p-4'>
                                <ul>
                                    {dataNav.map(item => (
                                        <li key={item.title} className='p-2'>
                                            <Link
                                                className='hover:text-blue-500'
                                                to={item.to}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Wrapper>
        </header>
    );
};

export default Navbar;
