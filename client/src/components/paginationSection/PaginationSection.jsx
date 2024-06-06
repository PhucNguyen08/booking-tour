/* eslint-disable react/prop-types */
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationSection = ({
    totalItems,
    itemPerPage,
    currentPage,
    setCurrentPage,
}) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pages.push(i);
    }

    const maxPageNum = 5; // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

    let activePages = pages.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pages.length)
    );

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem
                key={idx}
                className={
                    currentPage === page ? 'bg-neutral-100 rounded-md' : ''
                }>
                <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));

        // Add ellipsis at the start if necessary
        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key='ellipsis-start'
                    onClick={() => setCurrentPage(activePages[0] - 1)}
                />
            );
        }

        // Add ellipsis at the end if necessary
        if (activePages[activePages.length - 1] < pages.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key='ellipsis-end'
                    onClick={() =>
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }
                />
            );
        }

        return renderedPages;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button variant='ghost' onClick={handlePrevPage}>
                        <ChevronLeft className='mr-2 h-4 w-4' /> Trước
                    </Button>
                </PaginationItem>
                {renderPages()}
                <PaginationItem>
                    <Button variant='ghost' onClick={handleNextPage}>
                        Sau <ChevronRight className='ml-2 h-4 w-4' />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSection;
