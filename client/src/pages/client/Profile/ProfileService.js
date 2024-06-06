import newRequest from '@/utils/axios-utils';

const getBookingsByUser = async id => {
    try {
        const response = await newRequest.get('/order/list/' + id);
        return response.data;
    } catch (error) {
        console.error('Error get booking:', error);
        throw error;
    }
};

const updateProfile = async (id, data) => {
    try {
        console.log(data);
        const response = await newRequest.put('/users/' + id, data);
        return response.data;
    } catch (error) {
        console.error('Error update profile:', error);
        throw error;
    }
};

const changePassword = async data => {
    try {
        console.log(data);
        const response = await newRequest.put('/users/change/c-password', data);
        return response.data;
    } catch (error) {
        console.error('Error update password:', error);
        throw error;
    }
};

export { getBookingsByUser, updateProfile, changePassword };
