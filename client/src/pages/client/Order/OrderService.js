import newRequest from '@/utils/axios-utils';

const createOrder = async data => {
    try {
        const response = await newRequest.post('/order/create', data);
        return response.data;
    } catch (error) {
        console.error('Error create order:', error);
        throw error;
    }
};

export { createOrder };
