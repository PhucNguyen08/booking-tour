import newRequest from '@/utils/axios-utils';

const searchTour = async (data, page, pageSize) => {
    try {
        const response = await newRequest.post(
            `/tour/search/all?page=${page}&pageSize=${pageSize}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error('Error search tour:', error);
        throw error;
    }
};

export { searchTour };
