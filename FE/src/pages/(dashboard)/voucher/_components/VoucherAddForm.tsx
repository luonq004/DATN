import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import useVoucher from "@/common/hooks/useVouher"
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, addMonths, subMonths, addDays } from "date-fns"
import { Calendar as CalendarIcon, CircleX } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DialogClose } from '@/components/ui/dialog';


const voucherSchema = Joi.object({
    code: Joi.string().min(2).max(255).required(),
    category: Joi.string().valid('product', 'ship').required(),
    discount: Joi.number().min(1).required(),
    countOnStock: Joi.number().min(1).required(),
    dob: Joi.object({
        from: Joi.date()
            .min(subMonths(new Date(), 1))
            .max(addMonths(new Date(), 1))
            .required().messages({
                'any.required': 'Start date is required',
                'date.base': 'Start date must be a valid date',
            }),
        to: Joi.date()
            .min(subMonths(new Date(), 1))
            .max(addMonths(new Date(), 1))
            .required().messages({
                'any.required': 'End date is required',
                'date.base': 'End date must be a valid date',
            }),
    }).required().messages({
        'any.required': 'Date is required'
    }),
    type: Joi.string().valid("percent", "fixed").required(),
})

const VoucherAddForm = () => {
    const { createVoucher } = useVoucher();
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: joiResolver(voucherSchema),
    })

    const [date, setDate] = React.useState<DateRange | undefined>()
    const [status, setStatus] = useState<string>('')

    const [openDate, setOpenDate] = useState(null)

    useEffect(() => {
        reset({
            code: '',
            category: '',
            discount: '',
            countOnStock: '',
            dob: {
                from: undefined,
                to: undefined
            },
            type: ''
        })
        setStatus('inactive')
    }, [])

    useEffect(() => {
        if (date?.from || date?.to) {
            setValue('dob', { from: date.from || undefined, to: date.to || undefined });
        } else {
            setValue('dob', undefined)
        }

    }, [date, setValue]);

    function handleOpenDate(id: any) {
        if (openDate === id) {
            setOpenDate(null)
        } else {
            setOpenDate(id)
        }
    }

    function onSubmit(data: any) {
        const info = {
            ...data,
            status: status,
            startDate: data.dob.from,
            endDate: data.dob.to
        }
        const { dob, ...item } = info
        console.log(item)
        createVoucher.mutate(item, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Tạo thành công",
                })
                // reset()
            }
        })
    }

    return (
        <div className='mt-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    {errors?.code?.message ? <Label htmlFor="code" className='text-red-500'>Code</Label> : <Label htmlFor="code" >Code</Label>}
                    <Input
                        placeholder='Code...'
                        {...register('code', { required: true, minLength: 3, maxLength: 255 })}
                    />
                    {errors?.code?.message && <span className='text-red-500'>{errors?.code?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2 *:w-full'>
                    {errors?.category?.message ? <Label htmlFor="category" className='text-red-500'>Category</Label> : <Label htmlFor="category" >Category</Label>}
                    <Controller
                        control={control}
                        name="category"
                        defaultValue=""
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="product">Product</SelectItem>
                                        <SelectItem value="ship">Ship</SelectItem>
                                        <SelectItem value="test">Test</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors?.category?.message && <span className='text-red-500'>{errors?.category?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    {errors?.discount?.message ? <Label htmlFor="discount" className='text-red-500'>Discount</Label> : <Label htmlFor="discount" >Discount</Label>}
                    <Input
                        placeholder='discount...'
                        {...register('discount', { required: true })}
                    />
                    {errors?.discount?.message && <span className='text-red-500'>{errors?.discount?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    {errors?.countOnStock?.message ? <Label htmlFor="countOnStock" className='text-red-500'>CountOnStock</Label> : <Label htmlFor="countOnStock" >CountOnStock</Label>}
                    <Input
                        placeholder='countOnStock...'
                        {...register('countOnStock', { required: true })}
                    />
                    {errors?.countOnStock?.message && <span className='text-red-500'>{errors?.countOnStock?.message.toString()}</span>}
                </div>

                <div className='relative select-none z-50'>
                    {errors?.dob ? <Label htmlFor="dob" className='text-red-500'>Date</Label> : <Label htmlFor="dob" >Date</Label>}
                    <div onClick={() => handleOpenDate(1)} className={`flex items-center border rounded-md px-4 py-2 cursor-pointer`}>
                        <CalendarIcon size={20} className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </div >
                    <div className={`flex absolute bg-white top-[70px] transition-all duration-200 ${openDate === 1 ? '' : 'opacity-0 z-[-1] scale-75 hidden'}`}>
                        <div className='border rounded-md'>
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={new Date()}
                                selected={date}
                                onSelect={setDate}
                            />
                        </div>
                    </div>
                    {errors?.dob?.message && <span className='text-red-500'>{errors?.dob?.message.toString()}</span>}
                    {errors?.dob?.to?.message && <span className='text-red-500'>{errors?.dob?.to?.message.toString()}</span>}
                    {errors?.dob?.from?.message && <span className='text-red-500'>{errors?.dob?.from?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2 *:w-full'>
                    {errors?.type?.message ? <Label htmlFor="type" className='text-red-500'>Type</Label> : <Label htmlFor="type" >Type</Label>}
                    <Controller
                        control={control}
                        name="type"
                        defaultValue=""
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="percent">Percent</SelectItem>
                                        <SelectItem value="fixed">Fixed</SelectItem>
                                        {/* <SelectItem value="test">Test</SelectItem> */}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors?.type?.message && <span className='text-red-500'>{errors?.type?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2 *:w-full'>
                    <Label htmlFor="status" >Status</Label>
                    <div className={`select-none rounded-md bg-[#F4F4F5] p-1 cursor-pointer`}>
                        <div className='grid grid-cols-[50%_50%] relative w-full rounded-sm *:text-sm *:py-1.5 *:font-medium *:text-center *:rounded-sm'>
                            <div className={`bg-white w-1/2 absolute h-full z-10 transition-all duration-200 ${status === 'active' ? 'left-0' : 'left-1/2'}`}></div>
                            <div onClick={() => setStatus('active')} className={`z-20 ${status === 'active' ? ' text-black shadow-sm' : 'text-[#71717A]'}`}>Active</div>
                            <div onClick={() => setStatus('inactive')} className={`z-20 ${status === 'inactive' ? ' text-black shadow-sm' : 'text-[#71717A]'}`}>Inactive</div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between select-none'>
                    <Button type='submit'>Save</Button>
                    <DialogClose asChild>
                        <div
                            className='flex text-red-500 transition-all duration-200 hover:bg-red-50 rounded-md px-2 py-1 items-center gap-1 cursor-pointer select-none'
                        >
                            <CircleX size={16} />
                            <span>Cancel</span>
                        </div>
                    </DialogClose>
                </div>
            </form >
        </div >
    )
}

export default VoucherAddForm