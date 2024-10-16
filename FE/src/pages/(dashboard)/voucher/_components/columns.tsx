import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import VoucherForm from "./VoucherForm"
import { Button } from "@/components/ui/button"


export type Payment = {
    _id?: string;
    code: string;
    category: string;
    discount: number;
    countOnStock: number;
    type: string;
    status?: string;
    startDate: Date;
    endDate: Date;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            if (row.getValue('status') === 'inactive') {
                return <Badge className="capitalize" variant="destructive">{row.getValue('status')}</Badge>
            }
            return <Badge className="capitalize">{row.getValue('status')}</Badge>
        }
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => {
            if (row.original.type === 'percent') {
                return <>{row.getValue('discount')}%</>
            } else
                return <>{row.getValue('discount')}$</>
        }
    },
    {
        accessorKey: "countOnStock",
        header: "Count On Stock",
    },

    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {


            return (
                <div className="text-center">
                    <Sheet>
                        <SheetTrigger className="border rounded-md p-1 transition-all duration-300 hover:border-orange-400 hover:text-orange-400"><Eye size={20} /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Voucher Infomation</SheetTitle>
                                <SheetDescription>
                                    Voucher code: {row.original.code}
                                </SheetDescription>
                            </SheetHeader>
                            <VoucherForm id={row.original._id} />
                            {/* <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter> */}
                        </SheetContent>
                    </Sheet>
                </div>
            )
        },
    },
]