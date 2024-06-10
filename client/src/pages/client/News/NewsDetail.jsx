import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { useParams } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getOneNews } from '@/pages/admin/News/NewsService';
import { useQuery } from '@tanstack/react-query';
import { Clock5 } from 'lucide-react';
import { format } from 'date-fns';

const NewsDetail = () => {
    const { id } = useParams();

    const query = useQuery({
        queryKey: ['news-detail', id],
        queryFn: () => getOneNews(id),
    });

    console.log(query.data);

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <Breadcrumb label='Tin tức' />
            <Wrapper>
                <section className='py-5'>
                    <h3 className='mb-[10px] font-semibold text-[25px]'>
                        {query.data.title}
                    </h3>
                    <span className='flex gap-2 items-center text-[#acacac] text-sm'>
                        <Clock5 className='w-4 h-4' />
                        {format(query.data.createdAt, 'dd/MM/yyyy')}
                    </span>
                    <Separator className='my-4' />
                    <div
                        className='content-news'
                        dangerouslySetInnerHTML={{
                            __html: query.data.content,
                        }}></div>
                </section>
            </Wrapper>
        </section>
    );
};

export default NewsDetail;
