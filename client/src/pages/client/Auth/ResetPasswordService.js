import newRequest from '@/utils/axios-utils';

const forgotPassword = async data => {
    try {
        const res = await newRequest.post('/auth/forgot-password', data);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Không tìm thấy email!');
        } else {
            throw error;
        }
    }
};

const resetPassword = async data => {
    try {
        const { id, token, password } = data;
        const response = await newRequest.post(
            `/auth/reset-password/${id}/${token}`,
            { password: password }
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { forgotPassword, resetPassword };
