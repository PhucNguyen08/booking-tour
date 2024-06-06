import { dataQuestionsAndAnswers } from '@/utils/mockData';
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const form = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    return (
        <div>
            <Breadcrumb label='Liên hệ' />
            <Wrapper>
                <div className='py-14'>
                    <div className='text-center mb-10'>
                        <h3 className='text-black text-3xl font-bold mb-[5px]'>
                            Thông tin liên hệ
                        </h3>
                        <p className='text-base font-normal text-[#76809B]'>
                            Chúng tôi vinh hạnh vì đã có cơ hội đồng hành với
                            hơn 10.000 khách hàng trên khắp thế giới
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-3 mb-7'>
                        <div className='text-center bg-[#fdfdfd] border border-solid border-[#f1f1f1] rounded-2xl py-[35px] px-[15px]'>
                            <div className='flex items-center justify-center'>
                                <MapPin className='text-blueColor w-10 h-14' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-black text-[28px] mb-[5px]'>
                                    Địa chỉ
                                </h3>
                                <p className='text-[#777] text-base'>
                                    Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội
                                </p>
                            </div>
                        </div>
                        <div className='text-center bg-[#fdfdfd] border border-solid border-[#f1f1f1] rounded-2xl py-[35px] px-[15px]'>
                            <div className='flex items-center justify-center'>
                                <Mail className='text-blueColor w-10 h-14' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-black text-[28px] mb-[5px]'>
                                    Email
                                </h3>
                                <p className='text-[#777] text-base'>
                                    support@ohtravel.vn
                                </p>
                            </div>
                        </div>
                        <div className='text-center bg-[#fdfdfd] border border-solid border-[#f1f1f1] rounded-2xl py-[35px] px-[15px]'>
                            <div className='flex items-center justify-center'>
                                <Phone className='text-blueColor w-10 h-14' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-black text-[28px] mb-[5px]'>
                                    Hotline
                                </h3>
                                <p className='text-[#777] text-base'>
                                    1900 6750
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-3'>
                        <div className='p-[15px] border border-solid border-[#E2E6F2] rounded-2xl md:h-[420px] lg:col-span-7 relative'>
                            <h3 className='text-black text-[18px] font-bold mb-[5px]'>
                                Câu hỏi & Giải đáp
                            </h3>
                            <Accordion
                                type='single'
                                collapsible
                                className='w-[calc(100%_-_2rem)] h-[calc(100%_-_70px)] absolute overflow-y-auto scrollbar pr-3'>
                                {dataQuestionsAndAnswers.map((item, i) => (
                                    <AccordionItem key={i} value={i + 1}>
                                        <AccordionTrigger>
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        <div className='p-[15px] border border-solid border-[#E2E6F2] rounded-2xl lg:col-span-5'>
                            <h3 className='text-black text-[18px] font-bold mb-5'>
                                Liên hệ chúng tôi
                            </h3>
                            <div>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-4'>
                                        <FormField
                                            control={form.control}
                                            name='fullName'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Họ tên'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Email'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='phoneNumber'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Điện thoại'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='content'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder='Nội dung'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type='submit'
                                            className='bg-blueColor text-white'>
                                            Gửi thông tin
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Contact;
