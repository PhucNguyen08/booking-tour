import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import DashboardCard from '@/components/Admin/DashboardCard';
import { Card } from '@/components/ui/card';
import BarChart from '@/components/Admin/BarChart';
import {
    getReportOrdersDay,
    getReportSumPrice,
    getReportSumPriceByMonth,
    getReportTotalUsers,
} from './DashboardService';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/utils/formatter';

const Dashboard = () => {
    const queryReportOrder = useQuery({
        queryKey: ['report-order-day'],
        queryFn: getReportOrdersDay,
    });

    const queryTotalMoney = useQuery({
        queryKey: ['report-total-money'],
        queryFn: getReportSumPrice,
    });

    const queryTotalMoneyByMonth = useQuery({
        queryKey: ['reportTotalAmountByMonth'],
        queryFn: getReportSumPriceByMonth,
    });

    const queryTotalUsers = useQuery({
        queryKey: ['reportTotalUsers'],
        queryFn: getReportTotalUsers,
    });

    if (
        queryReportOrder.isLoading ||
        queryTotalMoney.isLoading ||
        queryTotalMoneyByMonth.isLoading ||
        queryTotalUsers.isLoading
    ) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3'>
                <DashboardCard
                    label={'Đơn đặt'}
                    icon={ShoppingCart}
                    amount={queryReportOrder.data.count}
                />
                <DashboardCard
                    label={'Doanh thu trong ngày'}
                    icon={DollarSign}
                    amount={formatPrice.format(queryTotalMoney.data.sum)}
                />
                <DashboardCard
                    label={'Tổng khách hàng'}
                    icon={Users}
                    amount={queryTotalUsers.data}
                />
            </section>
            <section>
                <Card className='px-7'>
                    <p className='p-4 font-semibold'>Doanh thu theo tháng</p>
                    <BarChart list={queryTotalMoneyByMonth.data} />
                </Card>
            </section>
        </>
    );
};

export default Dashboard;
