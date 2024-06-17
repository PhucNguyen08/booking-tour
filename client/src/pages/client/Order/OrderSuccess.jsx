/* eslint-disable react-hooks/exhaustive-deps */
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Email from '@/components/email';
import { Button } from '@/components/ui/button';
import { confirmOrder, getOrder } from '@/pages/admin/Order/OrderSevice';
import { render } from '@react-email/render';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const resultCode = searchParams.get('resultCode');
    const orderId = searchParams.get('orderId');

    const queryDetail = useQuery({
        queryKey: ['orderDetail', orderId],
        queryFn: () => getOrder(orderId),
    });

    const handleConfirm = async () => {
        try {
            const email = render(<Email detail={queryDetail.data} />);
            await confirmOrder(orderId, email);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (resultCode === '0' && queryDetail.data) {
            handleConfirm();
        }
    }, [queryDetail.data]);

    const handleClick = () => {
        navigate('/');
    };

    if (queryDetail.isLoading) {
        return <div className='hidden'>Loading...</div>;
    }

    return (
        <section>
            <Breadcrumb label='Thanh toán' />
            <div className='flex justify-center items-center flex-col py-10 gap-3 w-1/2 mx-auto my-0'>
                {resultCode === '0' || resultCode === null ? (
                    <>
                        <h3 className='font-semibold text-blueColor text-2xl'>
                            ĐẶT TOUR THÀNH CÔNG
                        </h3>
                        <p className='text-center text-base'>
                            Đơn đặt của bạn đã được đặt thành công. Chúng tôi sẽ
                            gọi lại để xác nhận đơn đặt của bạn. Cảm ơn bạn đã
                            tin tưởng và sử dụng dịch vụ của chúng tôi.
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className='font-semibold text-blueColor text-2xl'>
                            ĐẶT CHỖ THẤT BẠI
                        </h3>
                        <p className='text-center text-base'>
                            Thanh toán online không thành công. Booking của bạn
                            đã được lưu lại. Chúng tôi sẽ liên hệ lại trong thời
                            gian sớm nhất có thể, xin cảm ơn.
                        </p>
                    </>
                )}
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
