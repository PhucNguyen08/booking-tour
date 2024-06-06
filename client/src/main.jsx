import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-tabs/style/react-tabs.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './store/configureStore.js';
import { Provider } from 'react-redux';
import { UserContextProvider } from './context/userContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                </UserContextProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
