import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

// const chartData = [
//     { browser: "chrome", visitors: 275, fill: "#2a9d90" },
//     { browser: "safari", visitors: 200, fill: "#e76e50" },
//     { browser: "firefox", visitors: 187, fill: "#274754" },
//     { browser: "edge", visitors: 173, fill: "#e8c468" },
//     { browser: "other", visitors: 90, fill: "#f4a462" },
// ]
// const chartConfig = {
//     totalQuantity: {
//         label: "Số lượng bán ra",
//     },
//     chrome: {
//         label: "Chrome",
//         color: "hsl(var(--chart-1))",
//     },
//     safari: {
//         label: "Safari",
//         color: "hsl(var(--chart-2))",
//     },
//     firefox: {
//         label: "Firefox",
//         color: "hsl(var(--chart-3))",
//     },
//     edge: {
//         label: "Edge",
//         color: "hsl(var(--chart-4))",
//     },
//     other: {
//         label: "Other",
//         color: "hsl(var(--chart-5))",
//     },
// } satisfies ChartConfig
export function CircleCategory() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CircleCategory'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:8080/api/dashboard/get-data-category')
            return data
        }
    })

    const colors = ['#2a9d90', '#e76e50', '#274754', '#e8c468', '#f4a462']
    const chartData = data?.map((item: any, index: number) => {
        return {
            ...item,
            fill: colors[index % colors.length] // Gán màu theo index, lặp lại nếu hết màu
        };
    });
    const chartConfig = data?.reduce((acc: any, item: any, index: number) => {
        // Gán từng danh mục vào đối tượng chartConfig
        acc[item?._id?.slug] = {
            label: item?._id?.name, // Lấy tên danh mục
            color: colors[index % colors.length], // Lấy màu theo thứ tự hoặc lặp lại
        };
        return acc;
    }, {
        totalQuantity: {
            label: "Số lượng bán",
        },
    })

    // console.log(chartConfig)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Biểu đồ doanh mục</CardTitle>
                <CardDescription>Những danh mục được mua nhiều nhất</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="slug"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <XAxis dataKey="totalQuantity" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="totalQuantity" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}
