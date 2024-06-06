/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useGetTourSchedules } from '@/hooks/useFetch';
import { getClientTourSchedule } from './ClientTourService';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '/img/logo.jpg';
import { format } from 'date-fns';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '800px',
        maxHeight: '500px',
        overflowY: 'scroll',
    },
    overlay: {
        backgroundColor: 'rgba(49,49,49,0.8)',
    },
};

const TourSchedule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const componentRef = useRef();
    const [schedule, setSchedule] = useState({
        name: '',
        departureDay: new Date(),
    });

    const query = useGetTourSchedules();
    const queryDetail = useQuery({
        queryKey: ['clientTour', id],
        queryFn: () => getClientTourSchedule(id),
    });

    function closeModal() {
        setIsOpen(false);
        navigate('/admin/tour/client');
    }

    function openModal() {
        setIsOpen(true);
    }

    const columns = [
        {
            accessorKey: 'id',
            header: 'Mã lịch trình tour',
        },
        {
            accessorKey: 'tourId',
            header: 'Tên tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {row.original.tourSchedule?.tourName}
                    </div>
                );
            },
        },
        {
            accessorKey: 'departureDay',
            header: 'Ngày khởi hành',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {format(row.getValue('departureDay'), 'dd-MM-yyyy')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'returnDay',
            header: 'Ngày về',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {format(row.getValue('returnDay'), 'dd-MM-yyyy')}
                    </div>
                );
            },
        },
        {
            header: 'Thao tác',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-1'>
                        <Button
                            variant='secondary'
                            onClick={() =>
                                handleDetail(
                                    row.getValue('id'),
                                    row.original.tourSchedule?.tourName,
                                    row.getValue('departureDay')
                                )
                            }>
                            Xem
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handleDetail = async (id, name, departureDay) => {
        setSchedule({ ...schedule, name: name, departureDay: departureDay });
        openModal();
        navigate(id, { replace: true });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'list-client-' + id,
        onAfterPrint: () => alert('print success'),
    });

    if (queryDetail.isLoading) {
        <div>Loading...</div>;
    }

    return (
        <div>
            <PageTitle title='Danh sách khách hàng tour' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'mã lịch trình tour'}
                    filter={'id'}
                />
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold px-4'>
                        Danh sách khách hàng
                    </h2>
                    <Button onClick={closeModal} variant='ghost'>
                        <X className='w-4 h-4' />
                    </Button>
                </div>
                <div className='p-4' ref={componentRef}>
                    <div>
                        <img
                            src={Logo}
                            alt='Logo'
                            className='w-[120px] h-[50px] object-cover'
                        />
                        <div className='my-3'>
                            <h3>Công ty OH Travel</h3>
                            <h3>
                                Địa chỉ : Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình,
                                Hà Nội
                            </h3>
                            <h3>Email : ohtravel@gmail.com</h3>
                            <h3>Số điện thoại : 0964521762</h3>
                        </div>
                        <Separator className='my-2' />
                        <div className='my-3'>
                            <h3>Mã lịch trình tour: {id}</h3>
                            <h3>Tên tour: {schedule.name}</h3>
                            <h3>
                                Ngày khởi hành:{' '}
                                {format(schedule?.departureDay, 'dd-MM-yyyy')}
                            </h3>
                        </div>
                        <Separator className='my-2' />
                        <h3 className='font-bold text-lg'>
                            Thông tin khách hàng
                        </h3>
                    </div>
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
                            {queryDetail.data?.map((item, i) => (
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
                </div>
                <div className='flex justify-end gap-2'>
                    <Button onClick={closeModal}>Đóng</Button>
                    <Button variant='secondary' onClick={handlePrint}>
                        In
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default TourSchedule;
