import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='px-40 py-20 bg-white rounded-md'>
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-blue-600 text-9xl'>404</h1>

                    <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
                        <span className='text-red-500'>Oops!</span> Page not
                        found
                    </h6>

                    <p className='mb-8 text-center text-gray-500 md:text-lg'>
                        The page you’re looking for doesn’t exist.
                    </p>
                    <div className='animate-bounce'>
                        <svg
                            className='mx-auto h-16 w-16 text-red-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'></path>
                        </svg>
                    </div>
                    <Link
                        to={'/'}
                        className='px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100'>
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
