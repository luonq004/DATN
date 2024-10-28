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
import { TrendingUp, User } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

export const description = "A bar chart"
const chartData = [
    { week: "Monday", user: 186 },
    { week: "Tuesday", user: 305 },
    { week: "Wednesday", user: 237 },
    { week: "Thursday", user: 73 },
    { week: "Friday", user: 109 },
    { week: "Saturday", user: 194 },
    { week: "Sunday", user: 184 }
]
const chartConfig = {
    user: {
        label: "User",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const Customers = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-x-2">
                        <User className="text-current" />
                        <span>Khách hàng mới</span>
                    </div>
                </CardTitle>
                <CardDescription>
                    Hiển thị tổng số khách hàng mới trong tuần qua</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
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
                        <Bar dataKey="user" fill="var(--color-user)" radius={8} />
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

export default Customers