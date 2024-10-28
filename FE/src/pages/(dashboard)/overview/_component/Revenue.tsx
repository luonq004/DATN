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
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ShoppingCart, TrendingUp } from 'lucide-react'
export const description = "A stacked area chart"
const chartData = [
    { week: "Sunday", revenue: 8400 },
    { week: "Monday", revenue: 9000 },
    { week: "Tuesday", revenue: 7900 },
    { week: "Wednesday", revenue: 5450 },
    { week: "Thursday", revenue: 8002 },
    { week: "Friday", revenue: 12200 },
    { week: "Saturday", revenue: 13050 },
]
const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

const Revenue = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-x-2">
                        <ShoppingCart className="text-current" />
                        <span>Doanh thu hàng ngày</span>
                    </div>
                </CardTitle>
                <CardDescription>
                    Hiển thị tổng doanh thu trong tuần qua
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="revenue"
                            type="natural"
                            fill="var(--color-revenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}

export default Revenue