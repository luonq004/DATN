import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import useVoucher from "@/common/hooks/useVouher"
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, addMonths, subMonths } from "date-fns"
import { Calendar as CalendarIcon, CircleX, PencilLine, Trash } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SheetClose } from '@/components/ui/sheet';


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

const VoucherForm = ({ id }: any) => {
    const { getVoucher, updateVoucher, deleteVoucher } = useVoucher();
    const { data, isLoading, isError } = getVoucher('get-one', id)
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: joiResolver(voucherSchema),
    })

    const [date, setDate] = React.useState<DateRange | undefined>()
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        if (data) {
            reset({
                code: data.code,
                category: data.category,
                discount: data.discount,
                countOnStock: data.countOnStock,
                type: data.type
            })
            setDate({ from: new Date(data.startDate), to: new Date(data.endDate) })
            setStatus(data.status)
        } else return
    }, [data, reset])

    useEffect(() => {
        if (date?.from || date?.to) {
            setValue('dob', { from: date.from || undefined, to: date.to || undefined });
        } else {
            setValue('dob', undefined)
        }

    }, [date, setValue, data]);

    const [openDate, setOpenDate] = useState(null)
    const [openEdit, setOpenEdit] = useState(null)

    function handleOpenDate(id: any) {
        if (openDate === id) {
            setOpenDate(null)
        } else {
            setOpenDate(id)
        }
    }

    function handleOpenEdit(id: any) {
        if (openEdit === id) {
            setOpenEdit(null)
        } else {
            setOpenEdit(id)
        }
    }

    function handleDelete() {
        const item = {
            _id: id
        }
        deleteVoucher.mutate(item, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Xóa thành công'
                })
            }
        })
    }

    function onSubmit(data: any) {
        const info = {
            ...data,
            _id: id,
            status: status,
            startDate: new Date(new Date(data.dob.from).getTime() + 7 * 60 * 60 * 1000),
            endDate: new Date(new Date(data.dob.to).getTime() + 7 * 60 * 60 * 1000)
        }
        const { dob, ...item } = info
        updateVoucher.mutate(item, {
            onSuccess: () => {
                toast({
                    title: 'Sucsess',
                    description: 'Cập nhật thành công'
                })
            }
        })
    }

    if (isLoading) <div>Is Loading...</div>
    if (isError) <div>Is Error....</div>

    return (
        <div className='mt-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    {errors?.code?.message ? <Label htmlFor="code" className='text-red-500'>Code</Label> : <Label htmlFor="code" >Code</Label>}
                    <Input
                        disabled={openEdit === id ? false : true}
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
                            <Select disabled={openEdit === id ? false : true} onValueChange={field.onChange} value={field.value}>
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
                        disabled={openEdit === id ? false : true}
                        placeholder='discount...'
                        {...register('discount', { required: true, minLength: 3, maxLength: 255 })}
                    />
                    {errors?.discount?.message && <span className='text-red-500'>{errors?.discount?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    {errors?.countOnStock?.message ? <Label htmlFor="countOnStock" className='text-red-500'>CountOnStock</Label> : <Label htmlFor="countOnStock" >CountOnStock</Label>}
                    <Input
                        disabled={openEdit === id ? false : true}
                        placeholder='countOnStock...'
                        {...register('countOnStock', { required: true, minLength: 3, maxLength: 255 })}
                    />
                    {errors?.countOnStock?.message && <span className='text-red-500'>{errors?.countOnStock?.message.toString()}</span>}
                </div>

                <div className='flex flex-col gap-2 *:w-full'>
                    {errors?.type?.message ? <Label htmlFor="type" className='text-red-500'>Type</Label> : <Label htmlFor="type" >Type</Label>}
                    <Controller
                        control={control}
                        name="type"
                        defaultValue=""
                        render={({ field }) => (
                            <Select disabled={openEdit === id ? false : true} onValueChange={field.onChange} value={field.value}>
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

                <div className='relative select-none z-50'>
                    {errors?.dob ? <Label htmlFor="dob" className='text-red-500'>Date</Label> : <Label htmlFor="dob" >Date</Label>}
                    <div onClick={() => openEdit === id && handleOpenDate(id)} className={`flex items-center border rounded-md px-4 py-2 ${openEdit === id ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
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
                    <div className={`flex absolute bg-white top-[70px] transition-all duration-200 ${openDate === id ? '' : 'opacity-0 z-[-1] scale-75 hidden'}`}>
                        <div className='border rounded-md'>
                            <Calendar
                                disabled={openEdit === id ? false : true}
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
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
                    <Label htmlFor="status" >Status</Label>
                    <div className={`select-none rounded-md bg-[#F4F4F5] p-1 ${openEdit === id ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                        <div className='grid grid-cols-[50%_50%] relative w-full rounded-sm *:text-sm *:py-1.5 *:font-medium *:text-center *:rounded-sm'>
                            <div className={`bg-white w-1/2 absolute h-full z-10 transition-all duration-200 ${status === 'active' ? 'left-0' : 'left-1/2'}`}></div>
                            <div onClick={() => openEdit === id && setStatus('active')} className={`z-20 ${status === 'active' ? ' text-black shadow-sm' : 'text-[#71717A]'}`}>Active</div>
                            <div onClick={() => openEdit === id && setStatus('inactive')} className={`z-20 ${status === 'inactive' ? ' text-black shadow-sm' : 'text-[#71717A]'}`}>Inactive</div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between select-none'>
                    {openEdit === id ?
                        <>
                            <Button type='submit'>Save</Button>
                            <div
                                onClick={() => handleOpenEdit(id)}
                                className='flex text-red-500 transition-all duration-200 hover:bg-red-50 rounded-md px-2 py-1 items-center gap-1 cursor-pointer select-none'
                            >
                                <CircleX size={16} />
                                <span>Cancel</span>
                            </div>
                        </>
                        :
                        <>
                            <div
                                className='flex text-red-500 transition-all duration-200 hover:bg-red-50 rounded-md px-2 py-1 items-center gap-1 cursor-pointer select-none'
                            >
                                {/* <Trash size={16} className='mb-1' />
                                <span>Delete</span> */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div
                                            className='flex text-red-500 transition-all duration-200 hover:bg-red-50 rounded-md px-2 py-1 items-center gap-1 cursor-pointer select-none'
                                        >
                                            <Trash size={16} className='mb-1' />
                                            <span>Delete</span>
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Voucher sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <SheetClose asChild>
                                                <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
                                            </SheetClose>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <div
                                onClick={() => handleOpenEdit(id)}
                                className='flex items-center gap-2 px-2 py-1 border transition-all duration-200 rounded-md shadow-sm hover:border-black cursor-pointer'
                            >
                                <PencilLine size={16} />
                                <span>Edit</span>
                            </div>
                        </>
                    }

                </div>
            </form >
        </div >
    )
}

export default VoucherForm