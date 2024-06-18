/* eslint-disable react-hooks/rules-of-hooks */
import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { getOrders, getOrder, confirmOrder } from './OrderSevice';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/utils/formatter';
import { render } from '@react-email/render';
import Email from '@/components/email';
import { BeatLoader } from 'react-spinners';
import useModal from '@/hooks/useModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '1000px',
        maxHeight: '500px',
        overflowY: 'scroll',
    },
    overlay: {
        backgroundColor: 'rgba(49,49,49,0.8)',
    },
};

const Order = () => {
    const queryClient = useQueryClient();
    const [idOrder, setIdOrder] = useState();
    const query = useQuery({ queryKey: ['orders'], queryFn: getOrders });
    const [isLoading, setIsLoading] = useState(false);

    const { closeModal, openModal, modalIsOpen } = useModal();

    const queryDetail = useQuery({
        queryKey: ['orderDetail', idOrder],
        queryFn: () => getOrder(idOrder),
    });

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            const email = render(<Email detail={queryDetail.data} />);

            await confirmOrder(idOrder, email);

            toast.success('Bạn đã xác nhận thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });

            queryClient.invalidateQueries({
                queryKey: ['orders'],
                exact: true,
            });

            closeModal();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            accessorKey: 'index',
            header: 'STT',
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'id',
            header: 'Mã đơn đặt',
        },
        {
            accessorKey: 'tourScheduleId',
            header: 'Mã lịch trình tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[300px]'>
                        {row.getValue('tourScheduleId')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'userOrder',
            header: 'Người đặt',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[300px]'>
                        {row?.original.userOrder.fullName}
                    </div>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Ngày đặt',
            cell: ({ row }) => {
                return (
                    <div className='truncate'>
                        {format(row.getValue('createdAt'), 'dd-MM-yyyy')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                return (
                    <div
                        className={`truncate p-2 text-center rounded text-white ${
                            row.getValue('status') === 'waiting'
                                ? 'bg-black dark:bg-slate-600'
                                : 'bg-blueColor'
                        }`}>
                        {row.getValue('status') === 'waiting'
                            ? 'Chờ xác nhận'
                            : 'Đã xác nhận'}
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
                            onClick={() => handleDetail(row.getValue('id'))}>
                            Xem
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (query.isLoading || queryDetail.isLoading) {
        return <div className='hidden'>Loading...</div>;
    }

    const handleDetail = async id => {
        setIdOrder(id);
        openModal();
    };

    return (
        <div>
            <PageTitle title='Đơn đặt' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'mã đơn đặt'}
                    filter={'id'}
                />
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                        Thông tin chi tiết
                    </h2>
                    <Button onClick={closeModal} variant='ghost'>
                        <X className='w-4 h-4' />
                    </Button>
                </div>
                <div className='py-4'>
                    <div className='grid grid-cols-3 gap-3'>
                        <div>
                            <Label>Mã đơn đặt</Label>
                            <Input
                                disabled
                                value={queryDetail.data?.id || ''}
                            />
                        </div>
                        <div>
                            <Label>Mã lịch trình tour</Label>
                            <Input
                                disabled
                                value={queryDetail.data?.tourScheduleId || ''}
                            />
                        </div>
                        <div>
                            <Label>Ngày đặt</Label>
                            <Input
                                disabled
                                value={
                                    (queryDetail.data?.createdAt &&
                                        format(
                                            queryDetail.data?.createdAt,
                                            'dd-MM-yyyy'
                                        )) ||
                                    ''
                                }
                            />
                        </div>
                        <div>
                            <Label>Người đặt</Label>
                            <Input
                                disabled
                                value={
                                    queryDetail.data?.userOrder?.fullName || ''
                                }
                            />
                        </div>
                        <div>
                            <Label>Số lượng người lớn</Label>
                            <Input
                                disabled
                                value={queryDetail.data?.numberOfAdult}
                            />
                        </div>
                        <div>
                            <Label>Số lượng trẻ em</Label>
                            <Input
                                disabled
                                value={queryDetail.data?.numberOfChild}
                            />
                        </div>
                        <div>
                            <Label>Tổng tiền</Label>
                            <Input
                                disabled
                                value={
                                    (queryDetail.data?.totalPrice &&
                                        formatPrice.format(
                                            queryDetail.data?.totalPrice
                                        )) ||
                                    ''
                                }
                            />
                        </div>
                        <div>
                            <Label>Trạng thái</Label>
                            <Input
                                disabled
                                value={
                                    (queryDetail.data?.status === 'waiting'
                                        ? 'Chưa xác nhận'
                                        : 'Đã xác nhận') || ''
                                }
                            />
                        </div>
                        <div className='col-start-1 col-end-4 py-4'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>STT</TableHead>
                                        <TableHead className='w-[200px]'>
                                            Tên khách hàng
                                        </TableHead>
                                        <TableHead>Ngày sinh</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Số điện thoại</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {queryDetail.data?.users?.map((item, i) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>
                                                {item.fullName}
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    item.birthDate,
                                                    'dd-MM-yyyy'
                                                )}
                                            </TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>
                                                {item.account}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className='text-right pt-6'>
                        {queryDetail.data?.status === 'waiting' ? (
                            <Button onClick={handleConfirm}>
                                {isLoading ? (
                                    <BeatLoader
                                        color='#fff'
                                        loading={isLoading}
                                        size={10}
                                    />
                                ) : (
                                    'Xác nhận'
                                )}
                            </Button>
                        ) : (
                            <Button onClick={closeModal}>Đóng</Button>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Order;
