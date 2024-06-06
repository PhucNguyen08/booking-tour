/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { UserContext } from '@/context/userContext';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const isObjectEmpty = objectName => {
        return (
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    useEffect(() => {
        if (isObjectEmpty(user)) {
            navigate('/');
        }
    }, [user]);
};

export default PrivateRoutes;
