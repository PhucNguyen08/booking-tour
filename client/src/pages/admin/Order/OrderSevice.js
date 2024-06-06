import newRequest from '@/utils/axios-utils';

const getOrders = async () => {
    const res = await newRequest.get('/order');
    return res.data;
};

const getOrder = async id => {
    const res = await newRequest.get('/order/' + id);
    return res.data;
};

const confirmOrder = async (id, detail) => {
    const res = await newRequest.put('/order/' + id, {
        status: 'confirm',
        detail,
    });
    return res.data;
};

export { getOrders, getOrder, confirmOrder };
