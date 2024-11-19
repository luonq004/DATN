import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { ShoppingCart } from 'lucide-react';

// Cập nhật Dữ liệu Doanh thu
const Revenue = ({ chartData, selectedRange }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-x-2">
                        <ShoppingCart className="text-current" />
                        <span>Doanh thu</span>
                    </div>
                </CardTitle>
                <CardDescription>
                    Hiển thị tổng số hàng được mua trong {selectedRange === 'week' ? 'tuần qua' : 'tháng trước'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AreaChart
                    width={670}
                    height={250}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                    />
                </AreaChart>
            </CardContent>
        </Card>
    );
};

export default Revenue;
