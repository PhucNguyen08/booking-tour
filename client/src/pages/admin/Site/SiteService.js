import newRequest from '@/utils/axios-utils';

const getSites = async () => {
    try {
        const response = await newRequest.get('/site');
        return response.data;
    } catch (error) {
        console.error('Error fetching sites:', error);
        throw error;
    }
};

const getSite = async id => {
    try {
        const response = await newRequest.get('/site/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching sites:', error);
        throw error;
    }
};

const createSite = async data => {
    try {
        const response = await newRequest.post('/site/create', data);
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

const updateSite = async data => {
    try {
        const { id, siteName, siteDescription } = data;
        const response = await newRequest.put('/site/' + id, {
            siteName,
            siteDescription,
        });
        return response.data;
    } catch (error) {
        console.error('Update error', error);
        throw error;
    }
};

const deleteSite = async id => {
    try {
        const response = await newRequest.delete('/site/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

export { getSites, getSite, createSite, updateSite, deleteSite };
