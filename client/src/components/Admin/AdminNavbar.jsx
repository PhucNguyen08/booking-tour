import { Moon, Sun, Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentAdmin } from '@/utils/getCurrentUser';
import { useEffect, useRef, useState } from 'react';
import { NoAvatar } from '@/utils/img';
import { LogoutPost } from '@/utils/api';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { setTheme } = useTheme();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentAdmin = getCurrentAdmin();

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
            localStorage.removeItem('adminUser');
            navigate('/admin/login');
        }
    };

    return (
        <div className='flex py-5 px-8 border-b'>
            <div>
                <Input type='text' placeholder='Tìm kiếm' />
            </div>
            <div className='ml-auto flex flex-row gap-3'>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                                <span className='sr-only'>Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <Button variant='ghost' className='rounded-full p-2'>
                        <Bell />
                    </Button>
                </div>

                <div
                    ref={dropdownRef}
                    className='border-solid border-[#E2E6F2] cursor-pointer'>
                    <div className='relative'>
                        <div
                            onClick={toggleDropdown}
                            className='hover:opacity-60'>
                            <Avatar>
                                <AvatarImage
                                    src={
                                        currentAdmin?.avatar
                                            ? currentAdmin?.avatar
                                            : NoAvatar
                                    }
                                />
                                <AvatarFallback>
                                    {currentAdmin?.fullName}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div
                            className={`${
                                isOpen ? 'visible' : 'hidden'
                            } absolute right-0 top-14 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                                <li>
                                    <Link
                                        to={'/admin/profile'}
                                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/admin/change-password'}
                                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                        Đổi mật khẩu
                                    </Link>
                                </li>
                            </ul>
                            <div className='py-2'>
                                <button
                                    onClick={handleLogout}
                                    className='block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
