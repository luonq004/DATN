import useOrder from "@/common/hooks/order/UseOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DataTableOrder } from "./dataTableOrder";
import { columnsOrder } from "./columnsOrder";

export function OrderList() {
    const { data, isLoading, isError } = useOrder();

    const newData = React.useMemo(() => {
        if (!data || !Array.isArray(data)) return [];
        return data.map((order: any) => ({
            id: order._id,
            orderCode: order.orderCode || "N/A",
            customer: order.addressId.name || "N/A",
            phone: order.addressId.phone || "N/A",
            email: order.userId.email || "N/A",
            imageUrl: order.userId.imageUrl || undefined,
            amount: order.totalPrice || 0,
            payment: order.payment || "N/A",
            status: order.status || "unknown",
            // createdAt: order.createdAt || "",
        }));
    }, [data]);

    console.log(newData);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <Card className='col-span-1 lg:col-span-4'>
            <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Recent Orders</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0 px-6">
                <div className="w-full flex flex-col justify-between rounded-lg">
                    <DataTableOrder columns={columnsOrder} data={newData} />
                </div>
            </CardContent>
        </Card>
    )
}