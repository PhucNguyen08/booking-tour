/* eslint-disable react/prop-types */
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { formatPrice } from '@/utils/formatter';
import { Html } from '@react-email/html';

const Email = props => {
    const {
        id,
        tourScheduleId,
        bookingDate,
        userOrder,
        numberOfAdult,
        numberOfChild,
        totalPrice,
        users,
    } = props.detail;
    return (
        <Html lang='en'>
            <section className='px-10'>
                <div className='p-4'>
                    <h1 className='text-2xl font-bold'>Hóa đơn #{id}</h1>
                    <p className='text-xs'>
                        {bookingDate && format(bookingDate, 'dd-MM-yyyy')}
                    </p>
                </div>

                <div className='text-right p-4'>
                    <p className='p-0 mb-1'>
                        <b>Công ty OH Travel</b>
                    </p>
                    <p className='p-0 mb-1'>
                        Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội
                    </p>
                    <p className='p-0 mb-1'>ohtravel@gmail.com</p>
                    <p className='p-0 mb-1'>0964521762</p>
                </div>
                <Separator className='my-2' />
                <div className='p-4'>
                    <p>Người đặt: {userOrder.fullName}</p>
                    <p>Điện thoại: {userOrder.account}</p>
                    <p>Địa chỉ: {userOrder.address}</p>
                </div>
                <Separator className='my-2' />
                <div className='flex flex-col gap-2 px-4'>
                    <p>Mã lịch trình tour: {tourScheduleId}</p>
                    <p>Số lượng người lớn: {numberOfAdult}</p>
                    <p>Số lượng trẻ em: {numberOfChild}</p>
                </div>
                <Separator className='my-2' />
                <h3 className='px-4 font-bold'>Thông tin khách hàng</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>STT</TableHead>
                            <TableHead>Tên khách hàng</TableHead>
                            <TableHead>Ngày sinh</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Số điện thoại</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((item, i) => (
                            <TableRow key={item.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>
                                    {format(item.birthDate, 'dd-MM-yyyy')}
                                </TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.account}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <p className='text-right p-4'>
                    Tổng tiền : {formatPrice.format(totalPrice)}
                </p>
            </section>
        </Html>
    );
};

export default Email;
