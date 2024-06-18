/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setTour } from '@/store/tourSlice';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';

const TableSchedule = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useContext(UserContext);

    const isObjectEmpty = objectName => {
        return (
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    const handleOrder = item => {
        if (isObjectEmpty(user)) {
            toast.error('Bạn phải đăng nhập tài khoản', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            dispatch(setTour(item));
            navigate('/order');
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ngày khởi hành</TableHead>
                    <TableHead className='w-[300px]'>Mã Tour</TableHead>
                    <TableHead>Số chỗ còn</TableHead>
                    <TableHead>Giá người lớn</TableHead>
                    <TableHead>Giá trẻ em</TableHead>
                    <TableHead className='text-right'></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props?.data?.map(item => (
                    <TableRow key={item.id}>
                        <TableCell className='font-medium'>
                            {format(item.departureDay, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                            {item.maxParticipants -
                                item.numberOfParticipantsBooked}
                        </TableCell>
                        <TableCell>
                            {formatPrice.format(item.adultPrice)}
                        </TableCell>
                        <TableCell>
                            {formatPrice.format(item.childPrice)}
                        </TableCell>
                        <TableCell className='text-right'>
                            <Button
                                className='bg-blueColor'
                                onClick={() =>
                                    handleOrder({
                                        tourName: item.tourSchedule.tourName,
                                        tourScheduleId: item.id,
                                        numberOfDay:
                                            item.tourSchedule.numberOfDay,
                                        numberOfNight:
                                            item.tourSchedule.numberOfNight,
                                        departureDay: format(
                                            item.departureDay,
                                            'dd/MM/yyyy'
                                        ),
                                        childPrice: item.childPrice,
                                        adultPrice: item.adultPrice,
                                    })
                                }
                                disabled={item.status === 'full'}>
                                {item.status === 'full'
                                    ? 'Hết chỗ'
                                    : 'Đặt tour'}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableSchedule;
