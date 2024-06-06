/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

const Nav = ({ isCollapsed, links }) => {
    const location = useLocation();

    return (
        <TooltipProvider>
            <div
                data-collapsed={isCollapsed}
                className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
                <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                    {links.map((link, index) =>
                        isCollapsed ? (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={link.href}
                                        className={cn(
                                            buttonVariants({
                                                variant:
                                                    link.href ===
                                                    location.pathname
                                                        ? 'default'
                                                        : 'ghost',
                                                size: 'icon',
                                            }),
                                            'h-9 w-9',
                                            link.variant === 'default' &&
                                                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                        )}>
                                        <link.icon className='h-4 w-4' />
                                        <span className='sr-only'>
                                            {link.title}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side='right'
                                    className='flex items-center gap-4'>
                                    {link.title}
                                </TooltipContent>
                            </Tooltip>
                        ) : link.isChildren ? (
                            <Accordion
                                type='single'
                                collapsible
                                key={link.title}>
                                <AccordionItem
                                    value={link.title}
                                    className='border-none'>
                                    <AccordionTrigger
                                        className={cn(
                                            buttonVariants({
                                                variant: 'ghost',
                                            }),
                                            'group relative flex h-12 justify-between px-3 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
                                        )}>
                                        <div>
                                            <link.icon
                                                className={cn('h-4 w-4')}
                                            />
                                        </div>
                                        <div
                                            className={cn(
                                                'absolute left-9 text-sm duration-200'
                                            )}>
                                            {link.title}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='mt-2 space-y-1 pb-1'>
                                        {link.children?.map(child => (
                                            <Link
                                                key={child.title}
                                                to={child.href}
                                                className={cn(
                                                    buttonVariants({
                                                        variant:
                                                            child.href ===
                                                            location.pathname
                                                                ? 'default'
                                                                : 'ghost',
                                                    }),
                                                    'group relative flex h-12 justify-start gap-x-3 px-3 items-center'
                                                )}>
                                                <child.icon
                                                    className={cn('h-4 w-4')}
                                                />
                                                <div
                                                    className={cn(
                                                        'absolute left-9 text-sm duration-200'
                                                    )}>
                                                    {child.title}
                                                </div>
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ) : (
                            <Link
                                key={index}
                                to={link.href}
                                className={cn(
                                    buttonVariants({
                                        variant:
                                            link.href === location.pathname
                                                ? 'default'
                                                : 'ghost',
                                        size: 'sm',
                                    }),
                                    link.variant === 'default' &&
                                        'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                                    'justify-start'
                                )}>
                                <link.icon className='mr-2 h-4 w-4' />
                                {link.title}
                            </Link>
                        )
                    )}
                </nav>
            </div>
        </TooltipProvider>
    );
};

export default Nav;
