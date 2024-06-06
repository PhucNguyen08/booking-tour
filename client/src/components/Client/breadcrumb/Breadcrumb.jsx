/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import { BgBreadcrumb } from '@/utils/img';

const Breadcrumb = ({ label }) => {
    return (
        <div
            className='bg-center bg-no-repeat bg-cover bg-[#076ab1] min-h-[150px] flex items-center'
            style={{ backgroundImage: `url(${BgBreadcrumb})` }}>
            <Wrapper className='w-full'>
                <nav className='bg-grey-light w-full rounded-md text-white'>
                    <ol className='list-reset flex'>
                        <li>
                            <Link to='/'>
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li>
                            <span className='mx-2'>{'>'}</span>
                        </li>
                        <li>
                            <span className='font-semibold'>{label}</span>
                        </li>
                    </ol>
                </nav>
            </Wrapper>
        </div>
    );
};

export default Breadcrumb;
