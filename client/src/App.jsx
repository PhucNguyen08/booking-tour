import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ? Admin
import Login from './pages/admin/Login/LoginIndex';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard/DashboardIndex';
import Site from './pages/admin/Site/SiteIndex';
import Location from './pages/admin/Location/LocationIndex';
import Order from './pages/admin/Order/OrderIndex';
import Users from './pages/admin/Users/UsersIndex';
import TypeTour from './pages/admin/Tour/TypeTour';
import TourList from './pages/admin/Tour/TourList';
import TourCreate from './pages/admin/Tour/TourDetail';
import TourSchedule from './pages/admin/Tour/TourSchedule';
import NewsAdmin from './pages/admin/News/NewsIndex';
import NewsDetailAdmin from './pages/admin/News/NewsDetail';
import ClientTour from './pages/admin/ClientTour/ClientTourIndex';
import ProfileAdmin from './pages/admin/Profile/ProfileAdmin';
import ChangePasswordAdmin from './pages/admin/Profile/ChangePassword';
// ? Client
import ClientLayout from './components/Client/layout/Layout';
import Home from './pages/client/Home';
import LoginClient from './pages/client/Auth/Login';
import RegisterClient from './pages/client/Auth/Register';
import ListTour from './pages/client/ListTour/ListTourIndex';
import TourDetail from './pages/client/TourDetail';
import Introduce from './pages/client/Introduce';
import Contact from './pages/client/Contact';
import News from './pages/client/News/NewsIndex';
import NewsDetail from './pages/client/News/NewsDetail';
import OrderClient from './pages/client/Order/OrderIndex';
import OrderSuccess from './pages/client/Order/OrderSuccess';
import Profile from './pages/client/Profile/Profile';
import ChangePassword from './pages/client/Profile/ChangePassword';
import ProfileInfo from './pages/client/Profile/ProfileInfo';
import ProfileChangeInfo from './pages/client/Profile/ProfileChangeInfo';
import ProfileBooking from './pages/client/Profile/ProfileBooking';
import ForgotPassword from './pages/client/Auth/ForgotPassword';
import ResetPassword from './pages/client/Auth/ResetPassword';
import NotFound from './pages/NotFound';
import { PrivateAdminRoutes, PrivateClientRoutes } from './utils/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './components/theme-provider';

function App() {
    return (
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ClientLayout />}>
                        <Route index element={<Home />} />
                        <Route path='login' element={<LoginClient />} />
                        <Route path='register' element={<RegisterClient />} />
                        <Route
                            path='forgot-password'
                            element={<ForgotPassword />}
                        />
                        <Route
                            path='reset-password'
                            element={<ResetPassword />}
                        />
                        <Route path='introduce' element={<Introduce />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='order' element={<OrderClient />} />
                        <Route
                            path='order/success'
                            element={<OrderSuccess />}
                        />
                        <Route element={<PrivateClientRoutes />}>
                            <Route path='user' element={<Profile />}>
                                <Route
                                    path='profile'
                                    element={<ProfileInfo />}
                                />
                                <Route
                                    path='change-password'
                                    element={<ChangePassword />}
                                />
                                <Route
                                    path='my-booking'
                                    element={<ProfileBooking />}
                                />
                                <Route
                                    path='change-information'
                                    element={<ProfileChangeInfo />}
                                />
                            </Route>
                        </Route>
                        <Route path='news' element={<News />} />
                        <Route path='news/:id' element={<NewsDetail />} />
                        <Route path='tour/all' element={<ListTour />} />
                        <Route
                            path='detail-tour/:id/:name'
                            element={<TourDetail />}
                        />
                    </Route>
                    <Route element={<PrivateAdminRoutes />}>
                        <Route path='admin' element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path='site' element={<Site />} />
                            <Route path='location' element={<Location />} />
                            <Route
                                path='tour/create'
                                element={<TourCreate />}
                            />
                            <Route
                                path='tour/edit/:tourId'
                                element={<TourCreate />}
                            />
                            <Route
                                path='tour/schedule'
                                element={<TourSchedule />}
                            />
                            <Route path='tour/list' element={<TourList />} />
                            <Route
                                path='tour/client'
                                element={<ClientTour />}
                            />
                            <Route
                                path='tour/client/:id'
                                element={<ClientTour />}
                            />
                            <Route path='type-tour' element={<TypeTour />} />
                            <Route path='news/list' element={<NewsAdmin />} />
                            <Route
                                path='news/create'
                                element={<NewsDetailAdmin />}
                            />
                            <Route
                                path='news/:newsId'
                                element={<NewsDetailAdmin />}
                            />
                            <Route path='order' element={<Order />} />
                            <Route path='users' element={<Users />} />
                            <Route path='profile' element={<ProfileAdmin />} />
                            <Route
                                path='change-password'
                                element={<ChangePasswordAdmin />}
                            />
                        </Route>
                    </Route>
                    <Route path='admin/login' element={<Login />} exact />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default App;
