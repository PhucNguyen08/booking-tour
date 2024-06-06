/* eslint-disable react/prop-types */
import {
    BarChart as BarGraph,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { formatPrice } from '@/utils/formatter';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white p-4'>
                <p className='text-sm text-black'>{`Doanh thu: ${formatPrice.format(
                    payload[0].value
                )}`}</p>
            </div>
        );
    }

    return null;
};

const BarChart = props => {
    const { list } = props;

    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <BarGraph data={list} barSize={20}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    dataKey={'month'}
                    tickLine={false}
                    axisLine={false}
                    stroke='#888888'
                    fontSize={12}
                    tickFormatter={value => `Tháng ${value}`}
                />
                <YAxis
                    width={100}
                    tickLine={false}
                    axisLine={false}
                    stroke='#888888'
                    fontSize={12}
                    tickFormatter={value => formatPrice.format(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey={'revenue'}
                    radius={[4, 4, 0, 0]}
                    fill='#8884d8'
                    background={{ fill: '#eee' }}
                />
            </BarGraph>
        </ResponsiveContainer>
    );
};

export default BarChart;
