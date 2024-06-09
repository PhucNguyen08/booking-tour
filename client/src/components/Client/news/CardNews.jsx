/* eslint-disable react/prop-types */
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CardNews = props => {
    const { title, coverImg, createdAt, content, userNews, id } = props.data;
    return (
        <div>
            <div className='mb-[10px] card-zoom'>
                <Link to={'/news/' + id}>
                    <img src={coverImg} alt='img' className='card-zoom-image' />
                </Link>
            </div>
            <div>
                <div className='mb-[10px]'>
                    <Link
                        to={'/news/' + id}
                        className='font-semibold text-lg text-black hover:text-blueColor'>
                        {title}
                    </Link>
                </div>
                <div className='flex gap-3 mb-[10px] items-center text-xs'>
                    <div className='flex gap-2 items-center'>
                        <CalendarDays className='w-4 h-4' />
                        <span>{format(createdAt, 'dd-MM-yyyy')}</span>
                    </div>
                </div>
                <div>
                    <p
                        className='text-justify line-clamp-3 font-extralight'
                        dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
            </div>
        </div>
    );
};

export default CardNews;
