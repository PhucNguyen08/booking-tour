import Nav from './Nav';

import {
    LayoutDashboard,
    NotebookTabs,
    MapPin,
    ShoppingCart,
    Users,
    ChevronRight,
    MapPinned,
    Minus,
    Pyramid,
    Sheet,
    Newspaper,
} from 'lucide-react';
import { useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { Button } from '../ui/button';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onlyWidth = useWindowWidth();

    const mobileWidth = onlyWidth < 768;

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className='relative min-w-[80px] min-h-screen border-r px-3 pb-10'>
            {!mobileWidth && (
                <div className='absolute -right-5 top-7'>
                    <Button
                        onClick={toggleSidebar}
                        variant='secondary'
                        className='rounded-full p-2'>
                        <ChevronRight />
                    </Button>
                </div>
            )}
            <div className='flex items-center justify-center py-3'>
                {(mobileWidth ? true : isCollapsed) || (
                    <h3 className='font-bold text-2xl'>OH! Travel</h3>
                )}
                {(mobileWidth ? true : isCollapsed) && (
                    <h3 className='font-bold text-xl'>OH</h3>
                )}
            </div>
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: 'Trang chủ',
                        href: '/admin',
                        icon: LayoutDashboard,
                        variant: 'default',
                    },
                    {
                        title: 'Đơn đặt',
                        href: '/admin/order',
                        icon: ShoppingCart,
                        variant: 'ghost',
                    },
                    {
                        title: 'Tour',
                        icon: NotebookTabs,
                        variant: 'ghost',
                        isChildren: true,
                        children: [
                            {
                                title: 'Thêm mới',
                                href: '/admin/tour/create',
                                icon: Minus,
                                variant: 'ghost',
                            },
                            {
                                title: 'Danh sách',
                                href: '/admin/tour/list',
                                icon: Minus,
                                variant: 'ghost',
                            },
                        ],
                    },
                    {
                        title: 'Danh sách khách hàng',
                        href: '/admin/tour/client',
                        icon: Users,
                        variant: 'ghost',
                    },
                    {
                        title: 'Tour ngày',
                        href: '/admin/tour/schedule',
                        icon: Sheet,
                        variant: 'ghost',
                    },
                    {
                        title: 'Loại tour',
                        href: '/admin/type-tour',
                        icon: Pyramid,
                        variant: 'ghost',
                    },
                    {
                        title: 'Địa danh',
                        href: '/admin/site',
                        icon: MapPin,
                        variant: 'ghost',
                    },
                    {
                        title: 'Vị trí',
                        href: '/admin/location',
                        icon: MapPinned,
                        variant: 'ghost',
                    },
                    {
                        title: 'Tin tức',
                        icon: Newspaper,
                        variant: 'ghost',
                        isChildren: true,
                        children: [
                            {
                                title: 'Thêm mới',
                                href: '/admin/news/create',
                                icon: Minus,
                                variant: 'ghost',
                            },
                            {
                                title: 'Danh sách',
                                href: '/admin/news/list',
                                icon: Minus,
                                variant: 'ghost',
                            },
                        ],
                    },
                    {
                        title: 'Người dùng',
                        icon: Users,
                        variant: 'ghost',
                        isChildren: true,
                        children: [
                            {
                                title: 'Danh sách quản trị',
                                href: '/admin/list',
                                icon: Minus,
                                variant: 'ghost',
                            },
                            {
                                title: 'Danh sách khách hàng',
                                href: '/admin/users',
                                icon: Minus,
                                variant: 'ghost',
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default Sidebar;
