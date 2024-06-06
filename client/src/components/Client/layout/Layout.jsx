/* eslint-disable react/prop-types */
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div>
            <Navbar />
            <main className='bg-white'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ClientLayout;
