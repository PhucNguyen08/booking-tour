/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';

const Wrapper = ({ className, children }) => {
    return <div className={cn('mx-3 xl:mx-32', className)}>{children}</div>;
};

export default Wrapper;
