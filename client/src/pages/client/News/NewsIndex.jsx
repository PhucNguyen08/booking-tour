import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import { Separator } from '@/components/ui/separator';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import CardNews from '@/components/Client/news/CardNews';
import { useGetNews } from '@/hooks/useFetch';

const News = () => {
    const query = useGetNews();

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <Breadcrumb label='Tin Tức' />
            <Wrapper>
                <div className='py-6'>
                    <h3 className='text-[25px] text-black font-medium'>
                        Tin tức
                    </h3>
                    <p className='my-2 text-base text-[#333]'>
                        <strong>Tin tức Du lịch</strong> - Tin tức Du lịch 2024
                        cung cấp các{' '}
                        <strong className='italic'>
                            {' '}
                            thông tin Du lịch Việt Nam, Thông tin Du lịch Thế
                            Giới
                        </strong>
                        , các Sự kiện Du lịch diễn ra trong ngày. Thông qua các
                        bài viết được cập nhật liên tục, du khách có thể nắm bắt
                        thêm được nhiều thông tin hữu ích về du lịch.
                    </p>
                    <Separator className='my-4' />
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {query.data?.map(item => (
                            <CardNews key={item.id} data={item} />
                        ))}

                        {/* <CardNews />
                        <CardNews />
                        <CardNews />
                        <CardNews />
                        <CardNews />
                        <CardNews /> */}
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default News;
