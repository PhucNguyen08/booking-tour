import { SunMoon, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentAdmin } from '@/utils/getCurrentUser';
import { useEffect, useRef, useState } from 'react';
import { NoAvatar } from '@/utils/img';
import { LogoutPost } from '@/utils/api';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                    <Button variant='ghost' className='rounded-full p-2'>
                        <SunMoon />
                    </Button>
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
                                        currentAdmin?.image
                                            ? currentAdmin?.image
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
                                    <a
                                        href='#'
                                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                        Thông tin cá nhân
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                        Cài đặt
                                    </a>
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
