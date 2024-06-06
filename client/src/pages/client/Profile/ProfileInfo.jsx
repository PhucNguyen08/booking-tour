import { UserContext } from '@/context/userContext';
import { useContext } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { NoAvatar } from '@/utils/img';

const ProfileInfo = () => {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/user/change-information');
    };

    return (
        <section className='flex gap-9 pr-8'>
            <div>
                <img
                    src={user?.avatar ? user?.avatar : NoAvatar}
                    alt='avatar'
                    className='w-28 h-28 object-cover rounded-full'
                />
            </div>
            <div>
                <ul className='text-base'>
                    <li className='relative pl-[150px] pt-3'>
                        <span className='absolute left-0 text-[#999999]'>
                            Họ tên
                        </span>
                        <span>{user?.fullName}</span>
                    </li>
                    <li className='relative pl-[150px] pt-3'>
                        <span className='absolute left-0 text-[#999999]'>
                            Email
                        </span>
                        <span>{user?.email}</span>
                    </li>
                    <li className='relative pl-[150px] pt-3'>
                        <span className='absolute left-0 text-[#999999]'>
                            Số ĐT
                        </span>
                        <span>{user?.account}</span>
                    </li>
                    <li className='relative pl-[150px] pt-3'>
                        <span className='absolute left-0 text-[#999999]'>
                            Ngày sinh
                        </span>
                        <span>
                            {user?.birthDate &&
                                format(user?.birthDate, 'dd-MM-yyyy')}
                        </span>
                    </li>
                    <li className='relative pl-[150px] pt-3'>
                        <span className='absolute left-0 text-[#999999]'>
                            Địa chỉ
                        </span>
                        <span>{user?.address}</span>
                    </li>
                </ul>
                <Button onClick={handleEdit} className='bg-blueColor mt-10'>
                    Chỉnh sửa hồ sơ
                </Button>
            </div>
        </section>
    );
};

export default ProfileInfo;
