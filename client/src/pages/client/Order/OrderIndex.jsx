/* eslint-disable react-hooks/exhaustive-deps */
import Breadcrumb from '@/components/Client/breadcrumb/Breadcrumb';
import Wrapper from '@/components/Client/wrapper/Wrapper';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '@/utils/formatter';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from './OrderService';
import { UserContext } from '@/context/userContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    fullName: yup.string().required(),
    phoneNumber: yup
        .string()
        .required()
        .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            'Số điện thoại không hợp lệ'
        ),
    email: yup.string().email(),
    clients: yup.array(),
});

const Order = () => {
    const tour = useSelector(state => state.tour.detail);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const defaultValues = {
        fullName: '',
        phoneNumber: '',
        email: '',
        clients: [
            {
                fullName: user.fullName,
                birthDate: user.birthDate,
                email: user.email,
                phoneNumber: user.account,
                type: 'adult',
                price: tour.adultPrice,
            },
        ],
    };

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const { mutate } = useMutation({
        mutationFn: createOrder,
        onSuccess: data => {
            if (data?.url) {
                window.location.href = data.url;
            }
            if (data?.message === 'Success') {
                navigate('/order/success');
            }
        },
    });

    const { control, setValue } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'clients',
    });

    useEffect(() => {
        setValue('fullName', user.fullName);
        setValue('phoneNumber', user.account);
        setValue('email', user.email);
    }, []);

    const onSubmit = data => {
        const newData = { ...data, tourScheduleId: tour.tourScheduleId };
        delete newData.fullName;
        delete newData.phoneNumber;
        delete newData.email;

        const result = data.clients.reduce(
            (summary, client) => {
                if (client.type === 'adult') {
                    summary.numberOfAdult += 1;
                } else if (client.type === 'child') {
                    summary.numberOfChild += 1;
                }
                summary.totalPrice += parseInt(client.price);
                return summary;
            },
            { numberOfAdult: 0, numberOfChild: 0, totalPrice: 0 }
        );

        mutate({ ...newData, ...result });
    };

    const handleAddClient = () => {
        append({
            fullName: '',
            birthDate: '',
            email: '',
            phoneNumber: '',
            type: 'adult',
            price: tour.adultPrice,
        });
    };

    return (
        <section>
            <Breadcrumb label='Đặt tour' />
            <Wrapper>
                <div className='py-4'>
                    <h3 className='font-medium text-lg'>Thông tin tour</h3>
                    <Separator className='my-2' />
                    <div className='text-sm flex flex-col gap-2'>
                        <h4 className='font-medium'>{tour.tourName}</h4>
                        <p>Mã tour: {tour.tourScheduleId}</p>
                        <p>
                            Thời gian: {tour.numberOfDay} ngày{' '}
                            {tour.numberOfNight} đêm
                        </p>
                        <p>Ngày khởi hành: {tour.departureDay}</p>
                    </div>
                    <h3 className='font-medium text-lg mt-2'>Giá tour</h3>
                    <Separator className='my-2' />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='px-0'>
                                    Loại khách
                                </TableHead>
                                <TableHead>Giá</TableHead>
                                <TableHead>Phụ thu phòng đơn</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className='px-0'>
                                    Người lớn
                                </TableCell>
                                <TableCell>
                                    {formatPrice.format(tour.adultPrice)}
                                </TableCell>
                                <TableCell>N/A</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='px-0'>
                                    Trẻ em (10 tuổi trở lên)
                                </TableCell>
                                <TableCell>
                                    {formatPrice.format(tour.childPrice)}
                                </TableCell>
                                <TableCell>N/A</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-3'>
                            <h3 className='font-medium text-lg mt-2'>
                                Thông tin liên lạc
                            </h3>
                            <Separator className='my-2' />
                            <FormField
                                control={form.control}
                                name='fullName'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-12 place-items-center'>
                                        <FormLabel>Họ và tên *</FormLabel>
                                        <FormControl className='col-start-2 col-end-13'>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-12 place-items-center'>
                                        <FormLabel>Điện thoại *</FormLabel>
                                        <FormControl className='col-start-2 col-end-13'>
                                            <Input disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-12 place-items-center'>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl className='col-start-2 col-end-13'>
                                            <Input disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h3 className='font-medium text-lg mt-2'>
                                Danh sách khách hàng đi tour
                            </h3>
                            <Separator className='my-2' />
                            <Table className='ml-2'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='px-0'>
                                            Họ tên *
                                        </TableHead>
                                        <TableHead>Ngày sinh *</TableHead>
                                        <TableHead>Số điện thoại</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Khách hàng</TableHead>
                                        <TableHead>Giá</TableHead>
                                        <TableHead>Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className='px-0'>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.fullName`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder='Tên'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.birthDate`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            {/* <Popover>
                                                                <PopoverTrigger
                                                                    asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={
                                                                                'outline'
                                                                            }
                                                                            className={cn(
                                                                                'w-[240px] pl-3 text-left font-normal',
                                                                                !field.value &&
                                                                                    'text-muted-foreground'
                                                                            )}>
                                                                            {field.value ? (
                                                                                format(
                                                                                    field.value,
                                                                                    'dd-MM-yyyy'
                                                                                )
                                                                            ) : (
                                                                                <span>
                                                                                    Chọn
                                                                                    ngày
                                                                                    sinh
                                                                                </span>
                                                                            )}
                                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className='w-auto p-0'
                                                                    align='start'>
                                                                    <Calendar
                                                                        mode='single'
                                                                        selected={
                                                                            field.value
                                                                        }
                                                                        onSelect={
                                                                            field.onChange
                                                                        }
                                                                        disabled={date =>
                                                                            date >
                                                                                new Date() ||
                                                                            date <
                                                                                new Date(
                                                                                    '1900-01-01'
                                                                                )
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover> */}
                                                            <FormControl>
                                                                <Input
                                                                    placeholder='1990-12-01'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.phoneNumber`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder='0987654321'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.email`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder='abc@gmail.com'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.type`}
                                                    render={({ field }) => (
                                                        <Select
                                                            onValueChange={value => {
                                                                field.onChange(
                                                                    value
                                                                );
                                                                setValue(
                                                                    `clients.${index}.price`,
                                                                    value ==
                                                                        'adult'
                                                                        ? tour.adultPrice
                                                                        : tour.childPrice
                                                                );
                                                            }}
                                                            value={field.value}>
                                                            <SelectTrigger className='w-full xl:w-[180px] focus:ring-transparent'>
                                                                <SelectValue placeholder='Chọn' />
                                                            </SelectTrigger>
                                                            <SelectContent className='overflow-y-auto max-h-[10rem]'>
                                                                <SelectGroup>
                                                                    <SelectItem
                                                                        value={
                                                                            'adult'
                                                                        }>
                                                                        Người
                                                                        lớn
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            'child'
                                                                        }>
                                                                        Trẻ em
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`clients.${index}.price`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    disabled
                                                                    value={formatPrice.format(
                                                                        field.value
                                                                    )}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant='secondary'
                                                    onClick={() =>
                                                        remove(index)
                                                    }>
                                                    X
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className='flex flex-row-reverse'>
                                <Button
                                    type='button'
                                    variant='secondary'
                                    onClick={handleAddClient}>
                                    Thêm <Plus className='ml-2 h-4 w-4' />
                                </Button>
                            </div>
                            <FormField
                                control={form.control}
                                name='paymentMethod'
                                render={({ field }) => (
                                    <FormItem className='space-y-3'>
                                        <FormLabel className='font-medium text-lg mt-2'>
                                            Phương thức thanh toán
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className='flex flex-col space-y-1'>
                                                <FormItem className='flex items-center space-x-3 space-y-0'>
                                                    <FormControl>
                                                        <RadioGroupItem value='direct' />
                                                    </FormControl>
                                                    <FormLabel className='font-normal'>
                                                        Thanh toán trực tiếp
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className='flex items-center space-x-3 space-y-0'>
                                                    <FormControl>
                                                        <RadioGroupItem value='mentions' />
                                                    </FormControl>
                                                    <FormLabel className='font-normal'>
                                                        Thanh toán qua MOMO
                                                        {/* <span className='text-red-600 font-semibold'>
                                                            (Hạn mức tối đa là
                                                            20.000.000 VND)
                                                        </span> */}
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='bg-blueColor'>
                                Đặt tour
                            </Button>
                        </form>
                    </Form>
                </div>
            </Wrapper>
        </section>
    );
};

export default Order;
