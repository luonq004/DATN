import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    ToastProvider,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastViewport,
} from '@radix-ui/react-toast';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Delete, ShoppingBasket } from 'lucide-react'

const ProductList = () => {

    return (
        <div className='border border-gray-300 rounded-md'>
            <div className='bg-gray-200 h-[50px] flex items-center'>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-x-2">
                            <ShoppingBasket className="text-current" />
                            <span>Đơn hàng gần đây</span>
                        </div>
                    </CardTitle>
                </CardHeader>
            </div>
            <Table className='mt-[10px]'>
                {/* <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader> */}
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>
                            Quang Anh
                            <p className='text-gray-500'>Số 98/89 ngõ 70 Kiều Mai</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]' >Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>
                            Quang Anh
                            <p className='text-gray-500'>Số 98/89 ngõ 70 Kiều Mai</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]' >Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>
                            Trần Tuấn Minh
                            <p className='text-gray-500'>Cầu Giấy, Hà Nội</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]'>Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">INV003</TableCell>
                        <TableCell>
                            Trần Tuấn Minh
                            <p className='text-gray-500'>Cầu Giấy, Hà Nội</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]'>Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">INV004</TableCell>
                        <TableCell>
                            Trần Tuấn Minh
                            <p className='text-gray-500'>Mỹ Đình, Hà Nội</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]'>Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">INV005</TableCell>
                        <TableCell>
                            Trần Tuấn Minh
                            <p className='text-gray-500'>Phan Bá Vành, Thái Bình</p>
                        </TableCell>
                        <TableCell>
                            <p className='mt-[5px]'>Áo phông Teelab x 1</p>
                            <p className='mt-[5px]'>Áo phông Teelab loang x 2</p>
                            <p className='mt-[5px]'>Mũ thêu logo Teelab x 1</p>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        <TableCell className="flex justify-center">
                            <Select>
                                <SelectTrigger className="w-[50px]">
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="more"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                    </svg>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="false">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="vòng tròn khép kín"
                                                className="anticon anticon-close-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(238, 42, 30)', fontSize: 17 }}
                                            >
                                                <svg
                                                    fillRule="evenodd"
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="close-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Từ chối</p>
                                        </div>
                                    </SelectItem>


                                    <SelectItem value="true">
                                        <div className="flex items-center">
                                            <span
                                                role="img"
                                                aria-label="kiểm tra vòng tròn"
                                                className="anticon anticon-check-circle ant-dropdown-menu-item-icon"
                                                style={{ color: 'rgb(82, 196, 26)', fontSize: 17 }}
                                            >
                                                <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="check-circle"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                                                </svg>
                                            </span>
                                            <p className="ml-2">Chấp nhận</p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>


                </TableBody>
            </Table>
        </div>
    )
}

export default ProductList