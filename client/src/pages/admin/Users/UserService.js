import newRequest from '@/utils/axios-utils';

const getUsers = async () => {
    try {
        const response = await newRequest.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUser = async id => {
    try {
        const response = await newRequest.get('/users/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const createUser = async data => {
    try {
        const response = await newRequest.post('/users/create', data);
        return response.data;
    } catch (error) {
        console.error('Error create user:', error);
        throw error;
    }
};

const deleteUser = async id => {
    try {
        const response = await newRequest.delete('/users/' + id);
        return response.data;
    } catch (error) {
        console.error('Delete error', error);
        throw error;
    }
};

export { getUsers, getUser, deleteUser, createUser };
