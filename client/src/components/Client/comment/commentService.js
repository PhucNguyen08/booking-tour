import newRequest from '@/utils/axios-utils';

const getListCommentsTour = async (id, page, pageSize) => {
    try {
        const response = await newRequest.get(
            `/comment/${id}?page=${page}&pageSize=${pageSize}`
        );
        return response.data;
    } catch (error) {
        console.error('Get error', error);
        throw error;
    }
};

const createCommentTour = async data => {
    try {
        const response = await newRequest.post('/comment/create', data);
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

export { getListCommentsTour, createCommentTour };
