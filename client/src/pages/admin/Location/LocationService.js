import newRequest from '@/utils/axios-utils';

const getLocations = async () => {
    try {
        const response = await newRequest.get('/location');
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

const getLocation = async id => {
    try {
        const response = await newRequest.get('/location/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching location', error);
        throw error;
    }
};

const getParentLocations = async () => {
    try {
        const response = await newRequest.get('/location/parent/v1');
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

const createLocation = async data => {
    try {
        const response = await newRequest.post('/location/create', data);
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

const updateLocation = async data => {
    try {
        const { id, locationName, parentId } = data;
        const response = await newRequest.put('/location/' + id, {
            locationName,
            parentId,
        });
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

const deleteLocation = async id => {
    try {
        const response = await newRequest.delete('/location/' + id);
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

export {
    getLocation,
    getLocations,
    getParentLocations,
    createLocation,
    updateLocation,
    deleteLocation,
};
