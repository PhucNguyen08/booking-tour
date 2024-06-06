import newRequest from '@/utils/axios-utils';

const getClientTourSchedule = async id => {
    try {
        const response = await newRequest.get(
            '/tourSchedule/detail/client/' + id
        );
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

export { getClientTourSchedule };
