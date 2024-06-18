/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NoAvatar } from '@/utils/img';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getListCommentsTour, createCommentTour } from './commentService';
import CardComment from './cardComment';
import { Separator } from '@/components/ui/separator';
import PaginationSection from '@/components/paginationSection/PaginationSection';
import { socket } from '@/utils/socket';
import { UserContext } from '@/context/userContext';

const Comment = props => {
    const { tourId } = props;
    const queryClient = useQueryClient();
    const [isFocused, setIsFocused] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [contentComment, setContentComment] = useState('');
    const textareaRef = useRef(null);
    const { user } = useContext(UserContext);

    const query = useQuery({
        queryKey: ['list-comments', tourId, currentPage],
        queryFn: () => getListCommentsTour(tourId, currentPage, 5),
    });

    const { mutate } = useMutation({
        mutationFn: createCommentTour,
    });

    useEffect(() => {
        socket.on('comment-response', () => {
            queryClient.invalidateQueries({
                queryKey: ['list-comments', tourId, currentPage],
                exact: true,
            });
        });
    }, [socket]);

    const handleClickOutside = event => {
        if (
            textareaRef.current &&
            !textareaRef.current.contains(event.target)
        ) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleComment = () => {
        if (contentComment === '') {
            return;
        }
        mutate({
            tourId: tourId,
            content: contentComment,
        });
        setContentComment('');
        setIsFocused(false);
    };

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h3 className='font-medium text-2xl'>Đánh giá tour</h3>
            <div className='mt-4'>
                <div className='flex gap-3'>
                    <Avatar>
                        <AvatarImage
                            src={user?.avatar ? user?.avatar : NoAvatar}
                            className='w-[40px] h-[40px]'
                        />
                        <AvatarFallback>{user?.fullName}</AvatarFallback>
                    </Avatar>
                    <div
                        className='w-full flex flex-col gap-2'
                        ref={textareaRef}>
                        <Textarea
                            value={contentComment}
                            className='focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 min-h-[50px]'
                            placeholder='Đánh giá ...'
                            onFocus={handleFocus}
                            onChange={e => setContentComment(e.target.value)}
                        />
                        {isFocused && (
                            <Button
                                onClick={handleComment}
                                variant='outline'
                                className='bg-blueColor text-white'>
                                Bình luận
                            </Button>
                        )}
                    </div>
                </div>
                <div className='mt-4 flex flex-col gap-3'>
                    {query.data.comments.map(comment => (
                        <div key={comment.id}>
                            <CardComment
                                content={comment.content}
                                fullName={comment.userComment.fullName}
                                image={comment.userComment.avatar}
                                createdAt={comment.createdAt}
                            />
                            <Separator className='mt-4' />
                        </div>
                    ))}
                </div>
                <div className='py-4'>
                    <PaginationSection
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={query.data.totalComments}
                        itemPerPage={5}
                    />
                </div>
            </div>
        </>
    );
};

export default Comment;
