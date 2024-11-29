import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Item } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DollarSign, Package, Truck, Users } from "lucide-react";

export function CardTabsList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CardTabsList'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:8080/api/dashboard/get-data-card')
            return data
        }
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
        >
            <TabsContent value='overview' className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 *:transition-all *:duration-300'>
                    <Card className="hover:-translate-y-1 hover:shadow-md">
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Doanh thu
                            </CardTitle>
                            <DollarSign />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{formatCurrency(data.total) || NaN} VNĐ</div>
                        </CardContent>
                    </Card>
                    <Card className="hover:-translate-y-1 hover:shadow-md">
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Đơn hàng
                            </CardTitle>
                            <Truck />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+{data.order || NaN}</div>
                        </CardContent>
                    </Card>
                    <Card className="hover:-translate-y-1 hover:shadow-md">
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Sản phẩm
                            </CardTitle>
                            <Package />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+{data.product || NaN}</div>
                        </CardContent>
                    </Card>
                    <Card className="hover:-translate-y-1 hover:shadow-md">
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Tài khoản
                            </CardTitle>
                            <Users />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+{data.user || NaN}</div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    )
}