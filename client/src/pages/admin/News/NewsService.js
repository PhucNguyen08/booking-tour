import newRequest from '@/utils/axios-utils';

const getNews = async () => {
    try {
        const response = await newRequest.get('/news');
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const getOneNews = async id => {
    try {
        const response = await newRequest.get('/news/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching', error);
        throw error;
    }
};

const createNews = async data => {
    try {
        const response = await newRequest.post('/news/create', data);
        return response.data;
    } catch (error) {
        console.error('Create error', error);
        throw error;
    }
};

const updateNews = async data => {
    try {
        const { id, title, coverImg, content } = data;
        const response = await newRequest.put('/news/' + id, {
            title,
            coverImg,
            content,
        });
        return response.data;
    } catch (error) {
        console.error('Update error', error);
        throw error;
    }
};

const deleteNews = async id => {
    try {
        const response = await newRequest.delete('/news/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

export { createNews, updateNews, deleteNews, getNews, getOneNews };
