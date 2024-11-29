import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ShoppingBasket, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

export const description = "A bar chart"
// const chartData = [
//     { week: "Monday", order: 186 },
//     { week: "Tuesday", order: 305 },
//     { week: "Wednesday", order: 237 },
//     { week: "Thursday", order: 73 },
//     { week: "Friday", order: 209 },
//     { week: "Saturday", order: 214 },
//     { week: "Sunday", order: 214 }
// ]
const chartConfig = {
    order: {
        label: "Order",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const Order = ({ chartData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-x-2">
                        <ShoppingBasket className="text-current" />
                        <span>Tổng đơn hàng</span>
                    </div>
                </CardTitle>
                <CardDescription>
                    Hiển thị tổng số hàng được mua trong thang qua
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart width={300} height={200} accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="order" fill="var(--color-order)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Có xu hướng tăng 5,2% trong tháng này<TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Tháng 1 - tháng 6 năm 2024
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}

export default Order