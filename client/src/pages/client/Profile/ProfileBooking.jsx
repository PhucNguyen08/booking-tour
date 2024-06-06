import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getBookingsByUser } from './ProfileService';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';
import { format } from 'date-fns';
import { formatPrice } from '@/utils/formatter';

const ProfileBooking = () => {
    const { user } = useContext(UserContext);

    const queryBooking = useQuery({
        queryKey: ['bookings-user', user.id],
        queryFn: () => getBookingsByUser(user.id),
    });

    if (queryBooking.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h3 className='text-2xl font-semibold mb-3'>Đặt chỗ của tôi</h3>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã đặt chỗ</TableHead>
                            <TableHead>Ngày đặt</TableHead>
                            <TableHead>Tổng số người</TableHead>
                            <TableHead>Tổng tiền</TableHead>
                            <TableHead>Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {queryBooking.data?.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    {format(item.createdAt, 'dd-MM-yyyy')}
                                </TableCell>
                                <TableCell>
                                    {item.numberOfChild + item.numberOfAdult}
                                </TableCell>
                                <TableCell>
                                    {formatPrice.format(item.totalPrice)}
                                </TableCell>
                                <TableCell>
                                    {item.status === 'confirm' ? (
                                        <span>Đã xác nhận</span>
                                    ) : (
                                        <span>Chờ xác nhận</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default ProfileBooking;
