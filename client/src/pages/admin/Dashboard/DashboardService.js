import newRequest from '@/utils/axios-utils';

const getReportOrdersDay = async () => {
    try {
        const response = await newRequest.get('/report/detail/order');
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

const getReportSumPrice = async () => {
    try {
        const response = await newRequest.get('/report/detail/total-money');
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

const getReportSumPriceByMonth = async () => {
    try {
        const response = await newRequest.get(
            '/report/detail/total-amount-month'
        );
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

const getReportTotalUsers = async () => {
    try {
        const response = await newRequest.get('/report/detail/total-users');
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

export {
    getReportOrdersDay,
    getReportSumPrice,
    getReportSumPriceByMonth,
    getReportTotalUsers,
};
