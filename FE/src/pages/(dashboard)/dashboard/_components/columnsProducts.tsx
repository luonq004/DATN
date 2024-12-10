import { formatCurrency } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    _id: string,
    image: string,
    productName: string,
    slug: string,
    price: number,
    quantity: number,
    total: number,
}

export const columnsProducts: ColumnDef<Payment>[] = [
    // {
    //     header: "Xếp hạng",
    //     cell: ({ row }) => (
    //         <div className="flex items-center">
    //             <span className="text-sm font-medium">{row.index + 1}</span>
    //         </div>
    //     )
    // },
    {
        accessorKey: "image",
        header: "Ảnh sản phẩm",
        cell: ({ row }) => (
            <img src={row.getValue('image')} alt={row.getValue('productName')} className="w-12 h-14 rounded-lg" />
        )
    },
    {
        accessorKey: "productName",
        header: "Tên sản phẩm",
    },
    {
        accessorKey: "quantity",
        header: "Số lượng bán",
    },
    {
        accessorKey: "total",
        header: "Tổng tiền",
        cell: ({ row }) => (
            <span className="text-sm font-medium">{formatCurrency(row.getValue('total'))} VNĐ</span>
        )
    },
]
