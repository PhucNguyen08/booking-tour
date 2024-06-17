import newRequest from '@/utils/axios-utils';

//! Lịch trình tour
const getTourSchedules = async () => {
    try {
        const response = await newRequest.get('/tourSchedule');
        return response.data;
    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};

const getTourSchedule = async id => {
    try {
        const response = await newRequest.get('/tourSchedule/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};

const createTourSchedule = async data => {
    try {
        const response = await newRequest.post('/tourSchedule/create', data);
        return response.data;
    } catch (error) {
        console.error('Error create tour:', error);
        throw error;
    }
};

const updateTourSchedule = async data => {
    try {
        const {
            id,
            tourId,
            departureDay,
            returnDay,
            childPrice,
            adultPrice,
            maxParticipants,
        } = data;
        const response = await newRequest.put('/tourSchedule/' + id, {
            tourId,
            departureDay,
            returnDay,
            childPrice,
            adultPrice,
            maxParticipants,
        });
        return response.data;
    } catch (error) {
        console.error('Update error', error);
        throw error;
    }
};

const deleteTourSchedule = async id => {
    try {
        const response = await newRequest.delete('/tourSchedule/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

//! Tour
const getTours = async () => {
    try {
        const response = await newRequest.get('/tour');
        return response.data;
    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};

const getTour = async id => {
    try {
        const response = await newRequest.get('/tour/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching tour:', error);
        throw error;
    }
};

const createTour = async data => {
    try {
        const response = await newRequest.post('/tour/create', data);
        return response.data;
    } catch (error) {
        console.error('Error create tour:', error);
        throw error;
    }
};

const updateTour = async data => {
    try {
        const {
            id,
            typeId,
            departurePlaceId,
            destinationPlaceId,
            tourName,
            tourProgramDesc,
            shortDesc,
            coverImg,
            numberOfDay,
            numberOfNight,
            vehicle,
            images,
            sites,
        } = data;
        const response = await newRequest.put('/tour/' + id, {
            typeId,
            departurePlaceId,
            destinationPlaceId,
            tourName,
            tourProgramDesc,
            shortDesc,
            coverImg,
            numberOfDay,
            numberOfNight,
            vehicle,
            images,
            sites,
        });
        return response.data;
    } catch (error) {
        console.error('Error update tour:', error);
        throw error;
    }
};

const deleteTour = async id => {
    try {
        const response = await newRequest.delete('/tour/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

// ! Loại tour
const getTypeTours = async () => {
    try {
        const response = await newRequest.get('/typeTour');
        return response.data;
    } catch (error) {
        console.error('Error fetching type tours:', error);
        throw error;
    }
};

const getTypeTour = async id => {
    try {
        const response = await newRequest.get('/typeTour/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching type tour:', error);
        throw error;
    }
};

const createTypeTour = async data => {
    try {
        const response = await newRequest.post('/typeTour/create', data);
        return response.data;
    } catch (error) {
        console.error('Error create type tour:', error);
        throw error;
    }
};

const updateTypeTour = async data => {
    try {
        const { id, typeName, englishName } = data;
        const response = await newRequest.put('/typeTour/' + id, {
            typeName,
            englishName,
        });
        return response.data;
    } catch (error) {
        console.error('Update error', error);
        throw error;
    }
};

const deleteTypeTour = async id => {
    try {
        const response = await newRequest.delete('/typeTour/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

export {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    getTypeTour,
    getTypeTours,
    createTypeTour,
    updateTypeTour,
    deleteTypeTour,
    getTourSchedules,
    getTourSchedule,
    createTourSchedule,
    updateTourSchedule,
    deleteTourSchedule,
};
