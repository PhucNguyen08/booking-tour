import PageTitle from '@/components/pageTitle/PageTitle';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useGetTours } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const TourList = () => {
    const query = useGetTours();
    const navigate = useNavigate();

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'tourName',
            header: 'Tên tour',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        {row.getValue('tourName')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'coverImg',
            header: 'Hình ảnh',
            cell: ({ row }) => {
                return (
                    <div className='truncate w-[200px]'>
                        <img
                            src={row.getValue('coverImg')}
                            alt={row.getValue('tourName')}
                        />
                    </div>
                );
            },
        },
        {
            header: 'Thao tác',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-1'>
                        <Button
                            variant='secondary'
                            onClick={() => handleEdit(row.getValue('id'))}>
                            Sửa
                        </Button>
                        <Button variant='secondary'>Xóa</Button>
                    </div>
                );
            },
        },
    ];

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    const handleEdit = id => {
        navigate('/admin/tour/edit/' + id);
    };

    const handleAdd = () => {
        navigate('/admin/tour/create');
    };

    return (
        <div>
            <PageTitle title='Tour' />
            <div className='py-8'>
                <DataTable
                    columns={columns}
                    data={query?.data || []}
                    placeholderFilter={'tour'}
                    filter={'tourName'}
                    onClick={handleAdd}
                />
            </div>
        </div>
    );
};

export default TourList;
