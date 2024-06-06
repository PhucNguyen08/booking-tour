import createLazyComponent from './lazyComponent';

const Home = createLazyComponent(import('@/pages/client/Home'));
const ClientLayout = createLazyComponent(
    import('@/components/Client/layout/Layout')
);
const AdminLayout = createLazyComponent(
    import('@/components/Admin/AdminLayout')
);
const Dashboard = createLazyComponent(
    import('@/pages/admin/Dashboard/DashboardIndex')
);
const Site = createLazyComponent(import('@/pages/admin/Site/SiteIndex'));
const Location = createLazyComponent(
    import('@/pages/admin/Location/LocationIndex')
);
const Order = createLazyComponent(import('@/pages/admin/Order/OrderIndex'));
const Users = createLazyComponent(import('@/pages/admin/Users/UsersIndex'));
const TypeTour = createLazyComponent(import('@/pages/admin/Tour/TypeTour'));
const TourList = createLazyComponent(import('@/pages/admin/Tour/TourList'));
const TourCreate = createLazyComponent(import('@/pages/admin/Tour/TourDetail'));
const TourSchedule = createLazyComponent(
    import('@/pages/admin/Tour/TourSchedule')
);
const NewsAdmin = createLazyComponent(import('@/pages/admin/News/NewsIndex'));
const NewsDetailAdmin = createLazyComponent(
    import('@/pages/admin/News/NewsDetail')
);
const ClientTour = createLazyComponent(
    import('@/pages/admin/ClientTour/ClientTourIndex')
);
const LoginClient = createLazyComponent(import('@/pages/client/Login'));
const RegisterClient = createLazyComponent(import('@/pages/client/Register'));
const ListTour = createLazyComponent(
    import('@/pages/client/ListTour/ListTourIndex')
);
const TourDetail = createLazyComponent(import('@/pages/client/TourDetail'));
const Introduce = createLazyComponent(import('@/pages/client/Introduce'));
const Contact = createLazyComponent(import('@/pages/client/Contact'));
const News = createLazyComponent(import('@/pages/client/News/NewsIndex'));
const NewsDetail = createLazyComponent(
    import('@/pages/client/News/NewsDetail')
);
const OrderClient = createLazyComponent(
    import('@/pages/client/Order/OrderIndex')
);
const OrderSuccess = createLazyComponent(
    import('@/pages/client/Order/OrderSuccess')
);
const Profile = createLazyComponent(import('@/pages/client/Profile/Profile'));
const ChangePassword = createLazyComponent(
    import('@/pages/client/Profile/ChangePassword')
);
const ProfileInfo = createLazyComponent(
    import('@/pages/client/Profile/ProfileInfo')
);
const ProfileChangeInfo = createLazyComponent(
    import('@/pages/client/Profile/ProfileChangeInfo')
);
const ProfileBooking = createLazyComponent(
    import('@/pages/client/Profile/ProfileBooking')
);

const routes = {
    '/': {
        element: <ClientLayout />,
        indexRoute: { element: <Home /> },
        childRoutes: [
            { path: 'auth/login', element: <LoginClient /> },
            { path: 'auth/register', element: <RegisterClient /> },
            { path: 'introduce', element: <Introduce /> },
            { path: 'contact', element: <Contact /> },
            { path: 'order', element: <OrderClient /> },
            { path: 'success', element: <OrderSuccess /> },
            {
                path: 'user',
                element: <Profile />,
                childRoutes: [
                    { path: 'profile', element: <ProfileInfo /> },
                    { path: 'change-password', element: <ChangePassword /> },
                    { path: 'my-booking', element: <ProfileBooking /> },
                    {
                        path: 'change-information',
                        element: <ProfileChangeInfo />,
                    },
                ],
            },
            { path: 'news', element: <News /> },
            { path: 'news/:id', element: <NewsDetail /> },
            { path: 'tour/all', element: <ListTour /> },
            { path: 'detail-tour/:id/:name', element: <TourDetail /> },
        ],
    },
    '/admin': {
        element: <AdminLayout />,
        indexRoute: { element: <Dashboard /> },
        childRoutes: [
            { path: 'site', element: <Site /> },
            { path: 'location', element: <Location /> },
            { path: 'tour/create', element: <TourCreate /> },
            { path: 'tour/edit/:tourId', element: <TourCreate /> },
            { path: 'tour/schedule', element: <TourSchedule /> },
            { path: 'tour/list', element: <TourList /> },
            { path: 'tour/client', element: <ClientTour /> },
            { path: 'tour/client/:id', element: <ClientTour /> },
            { path: 'type-tour', element: <TypeTour /> },
            { path: 'news/list', element: <NewsAdmin /> },
            { path: 'news/create', element: <NewsDetailAdmin /> },
            { path: 'news/:newsId', element: <NewsDetailAdmin /> },
            { path: 'order', element: <Order /> },
            { path: 'users', element: <Users /> },
        ],
    },
};
