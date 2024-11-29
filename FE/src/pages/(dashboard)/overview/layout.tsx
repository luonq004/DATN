import React, { useState } from 'react';
import Revenue from './_component/Revenue';
import Order from './_component/Order';
import Customers from './_component/Customers';
import TopProduct from './_component/TopProduct';
import OrderList from './_component/OrderList';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Dữ liệu tổng đơn hàng
const dataSets = {
    week: {
        revenue: [
            { week: "Monday", revenue: 8400 },
            { week: "Tuesday", revenue: 9000 },
            { week: "Wednesday", revenue: 7900 },
            { week: "Thursday", revenue: 5450 },
            { week: "Friday", revenue: 8002 },
            { week: "Saturday", revenue: 12200 },
            { week: "Sunday", revenue: 13050 },
        ],
        order: [
            { week: "Monday", order: 186 },
            { week: "Tuesday", order: 305 },
            { week: "Wednesday", order: 237 },
            { week: "Thursday", order: 73 },
            { week: "Friday", order: 209 },
            { week: "Saturday", order: 214 },
            { week: "Sunday", order: 214 },
        ],
    },
    month: {
        revenue: [
            { week: "January", revenue: 12340 },
            { week: "February", revenue: 14560 },
            { week: "March", revenue: 13450 },
            { week: "April", revenue: 15670 },
            { week: "May", revenue: 34520 },
            { week: "June", revenue: 23740 },
        ],
        order: [
            { week: "January", order: 1234 },
            { week: "February", order: 1456 },
            { week: "March", order: 1345 },
            { week: "April", order: 1567 },
            { week: "May", order: 3452 },
            { week: "June", order: 2374 },
        ],
    },
};

const Layout = () => {
    const [chartDataRevenue, setChartDataRevenue] = useState(dataSets.week.revenue); // Dữ liệu doanh thu
    const [chartDataOrder, setChartDataOrder] = useState(dataSets.week.order); // Dữ liệu đơn hàng
    const [selectedRange, setSelectedRange] = useState('week');

    // Xử lý thay đổi thời gian
    const handleTimeRangeChange = (range: any) => {
        setSelectedRange(range);
        setChartDataRevenue(dataSets[range].revenue);
        setChartDataOrder(dataSets[range].order); // Dữ liệu đơn hàng không thay đổi
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold" aria-label="Overview Dashboard">
                    Tổng quan
                </h1>
                {/* Nút chọn thời gian */}
                <Select onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="w-[135px]">
                        <SelectValue placeholder="Chọn thời gian" value={selectedRange} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">Tuần trước</SelectItem>
                        <SelectItem value="month">Tháng trước</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tổng quan  */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div className="w-full md:w-[58%]">
                    <Revenue chartData={chartDataRevenue} />
                </div>
                <div className="w-full md:w-[40%]">
                    <Order chartData={chartDataOrder} selectedRange={selectedRange} />
                </div>
            </div>

            {/* Products and Top Product */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex-grow sm:w-2/3">
                    <OrderList />
                </div>
                <div className="flex-shrink sm:w-1/3">
                    <TopProduct />
                </div>
            </div>
        </div>
    );
};

export default Layout;
