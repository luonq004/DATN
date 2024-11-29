import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, BarChart4 } from 'lucide-react'
import React from 'react'

const TopProduct = () => {
    return (
        <div>
            <div className='border border-gray-300 rounded-md'>
                <div className='bg-gray-200 h-[50px] flex items-center'>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-x-2">
                                <BarChart4 className="text-current" />
                                <span>Sản phẩm thịnh hành</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </div>
                <div className='ml-[15px] mt-[10px]'>
                    <div className="relative flex items-center">
                        <img
                            src="https://bizweb.dktcdn.net/100/415/697/products/nta101-wvs9s70f-1-97bx-hinh-mat-truoc-0.jpg?v=1701332415287"
                            className="w-[150px] mr-4"
                        />
                        <div className="absolute top-2 left-2">
                            <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">1</span>
                            </div>
                        </div>
                        <div className='ml-[10px] mt-[20px]'>
                            <p className='font-bold text-xl mb-[10px]'>Áo phông Teelab</p>
                            <p className='text-gray-500 mb-[10px]'>250.000đ</p>
                            <p className='text-gray-500 mb-[10px]'>Đã bán <strong className='text-black'>1900</strong> lần</p>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <img
                            src="https://bizweb.dktcdn.net/100/415/697/products/mc1-0224920e-c953-4129-a4b3-d79b600e15fa.jpg?v=1637916532137"
                            className="w-[150px] mr-4"
                        />
                        <div className="absolute top-2 left-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">2</span>
                            </div>
                        </div>
                        <div className='ml-[10px] mt-[20px]'>
                            <p className='font-bold text-xl mb-[10px]'>Áo phông loang Teelab</p>
                            <p className='text-gray-500 mb-[10px]'>250.000đ</p>
                            <p className='text-gray-500 mb-[10px]'>Đã bán <strong className='text-black'>1760</strong> lần</p>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <img
                            src="https://bizweb.dktcdn.net/100/415/697/products/mc1-0224920e-c953-4129-a4b3-d79b600e15fa.jpg?v=1637916532137"
                            className="w-[150px] mr-4"
                        />
                        <div className="absolute top-2 left-2">
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">3</span>
                            </div>
                        </div>
                        <div className='ml-[10px] mt-[20px]'>
                            <p className='font-bold text-xl mb-[10px]'>Áo phông loang Teelab</p>
                            <p className='text-gray-500 mb-[10px]'>250.000đ</p>
                            <p className='text-gray-500 mb-[10px]'>Đã bán <strong className='text-black'>1250</strong> lần</p>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <img
                            src="https://bizweb.dktcdn.net/100/415/697/products/nta101-wvs9s70f-1-97bx-hinh-mat-truoc-0.jpg?v=1701332415287"
                            className="w-[150px] mr-4"
                        />
                        <div className="absolute top-2 left-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">4</span>
                            </div>
                        </div>
                        <div className='ml-[10px] mt-[20px]'>
                            <p className='font-bold text-xl mb-[10px]'>Áo phông loang Teelab</p>
                            <p className='text-gray-500 mb-[10px]'>250.000đ</p>
                            <p className='text-gray-500 mb-[10px]'>Đã bán <strong className='text-black'>1130</strong> lần</p>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <img
                            src="https://bizweb.dktcdn.net/100/415/697/products/nta101-wvs9s70f-1-97bx-hinh-mat-truoc-0.jpg?v=1701332415287"
                            className="w-[150px] mr-4"
                        />
                        <div className="absolute top-2 left-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">5</span>
                            </div>
                        </div>
                        <div className='ml-[10px] mt-[20px]'>
                            <p className='font-bold text-xl mb-[10px]'>Áo phông loang Teelab</p>
                            <p className='text-gray-500 mb-[10px]'>250.000đ</p>
                            <p className='text-gray-500 mb-[10px]'>Đã bán <strong className='text-black'>993</strong> lần</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopProduct