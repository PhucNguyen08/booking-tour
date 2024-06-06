/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NoAvatar } from '@/utils/img';
import { format } from 'date-fns';

const CardComment = props => {
    const { image, fullName, content, createdAt } = props;
    return (
        <div className='flex gap-3'>
            <Avatar>
                <AvatarImage
                    src={image ? image : NoAvatar}
                    className='w-9 h-9'
                />
                <AvatarFallback>{fullName}</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <h4 className='font-medium'>{fullName}</h4>
                    <span className='text-xs'>
                        {format(createdAt, 'dd-MM-yyyy')}
                    </span>
                </div>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default CardComment;
