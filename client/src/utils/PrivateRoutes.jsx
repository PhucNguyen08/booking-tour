/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentAdmin } from './getCurrentUser';

export const PrivateClientRoutes = () => {
    const { user } = useContext(UserContext);

    return user?.fullName ? <Outlet /> : <Navigate to='/login' />;
};

export const PrivateAdminRoutes = () => {
    const admin = getCurrentAdmin();

    return admin ? <Outlet /> : <Navigate to='/admin/login' />;
};
