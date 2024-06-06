/* eslint-disable react/prop-types */
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';
import AdminWrapper from './AdminWrapper';

const AdminLayout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <AdminNavbar />
                <main>
                    <AdminWrapper>
                        <Outlet />
                    </AdminWrapper>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
