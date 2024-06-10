import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import SidebarProfile from '@/components/Client/sidebarProfile/SidebarProfile';
import { ShoppingCart, User, Settings, ShieldCheck } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const Profile = () => {
    return (
        <section>
            <Breadcrumb label='Thông tin cá nhân' />
            <Wrapper>
                <div className='py-4'>
                    <div className='flex lg:flex-row flex-col gap-8'>
                        <div>
                            <SidebarProfile
                                links={[
                                    {
                                        title: 'Hồ sơ',
                                        href: '/user/profile',
                                        icon: User,
                                        variant: 'ghost',
                                    },
                                    {
                                        title: 'Đặt chỗ của tôi',
                                        href: '/user/my-booking',
                                        icon: ShoppingCart,
                                        variant: 'ghost',
                                    },
                                    {
                                        title: 'Thay đổi thông tin',
                                        href: '/user/change-information',
                                        icon: Settings,
                                        variant: 'ghost',
                                    },
                                    {
                                        title: 'Đổi mật khẩu',
                                        href: '/user/change-password',
                                        icon: ShieldCheck,
                                        variant: 'ghost',
                                    },
                                ]}
                            />
                        </div>
                        <div className='flex-1'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Profile;
