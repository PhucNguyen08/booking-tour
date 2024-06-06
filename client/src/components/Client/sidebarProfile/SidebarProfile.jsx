/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const SidebarProfile = props => {
    const location = useLocation();

    const { links } = props;

    return (
        <>
            <nav className='grid gap-1'>
                {links.map((link, item) => (
                    <Link
                        key={item}
                        to={link.href}
                        className={cn(
                            buttonVariants({
                                variant:
                                    link.href === location.pathname
                                        ? 'secondary'
                                        : 'ghost',
                                size: 'sm',
                            }),
                            'justify-start w-full'
                        )}>
                        <link.icon className='mr-2 h-5 w-5' />
                        <span className='text-base'>{link.title}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
};

export default SidebarProfile;
