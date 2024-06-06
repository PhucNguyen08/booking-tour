import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <section>
            <Breadcrumb label='Thanh toán' />
            <div className='flex justify-center items-center flex-col py-10 gap-3 w-1/2 mx-auto my-0'>
                <h3 className='font-semibold text-blueColor text-2xl'>
                    ĐẶT TOUR THÀNH CÔNG
                </h3>
                <p className='text-center text-base'>
                    Đơn đặt của bạn đã được đặt thành công. Chúng tôi sẽ gọi lại
                    để xác nhận đơn đặt của bạn. Cảm ơn bạn đã tin tưởng và sử
                    dụng dịch vụ của chúng tôi.
                </p>
                <Button
                    onClick={handleClick}
                    variant='ghost'
                    className='bg-blueColor text-white mt-4'>
                    Về trang chủ
                </Button>
            </div>
        </section>
    );
};

export default OrderSuccess;
