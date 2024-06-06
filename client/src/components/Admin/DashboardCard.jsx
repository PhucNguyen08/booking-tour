/* eslint-disable react/prop-types */
import { Card } from '@/components/ui/card';
const DashboardCard = props => {
    const { label, amount } = props;
    return (
        <Card>
            <div className='p-4'>
                <section className='flex justify-between gap-2 items-center'>
                    <p className='tracking-tight text-sm font-medium'>
                        {label}
                    </p>
                    <props.icon className='h-4 w-4 text-gray-400' />
                </section>
                <h2 className='text-2xl font-bold py-2'>{amount}</h2>
            </div>
        </Card>
    );
};

export default DashboardCard;
