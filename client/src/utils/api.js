import newRequest from './axios-utils';

const LoginPost = async data => {
    const response = await newRequest.post('/auth/login', data);
    return response.data;
};

const RegisterPost = async data => {
    const response = await newRequest.post('/auth/register', data);
    return response.data;
};

const LogoutPost = async () => {
    const response = await newRequest.get('/auth/logout');
    return response.data;
};

export { LoginPost, RegisterPost, LogoutPost };
