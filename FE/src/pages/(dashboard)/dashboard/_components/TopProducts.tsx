import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { columnsProducts } from "./columnsProducts"
import { DataTableProducts } from "./dataTableProducts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function TopProducts() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['TopProducts'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:8080/api/dashboard/get-data-top-products')
            return data
        }
    })

    const fakeData = [
        {
            id: 1,
            productName: "Áo thun nam",
            image: "https://product.hstatic.net/1000026602/product/dsc03170_2dfd2355eeec459b8d7d634b0214d5ca.jpg",
            price: 200000,
            quantity: 100,
            total: 20000000,
        },
        {
            id: 2,
            productName: "Áo thun nữ",
            image: "https://mapi.pt2000.vn/uploads/AP-2951N-0DE00-00.jpg",
            price: 150000,
            quantity: 90,
            total: 13500000,
        },
        {
            id: 3,
            productName: "Quần jean nam",
            image: "https://vulcano.sgp1.digitaloceanspaces.com/media/9178/quan_jean_2006A-%281%29.jpg",
            price: 300000,
            quantity: 80,
            total: 24000000,
        },
        {
            id: 4,
            productName: "Quần jean nữ",
            image: "https://product.hstatic.net/1000402464/product/fwjn22fh19c_l.blue__1__copy_451e7631b71949d5b62f8537a57a57ff_master.jpg",
            price: 250000,
            quantity: 70,
            total: 17500000,
        },
        // {
        //     id: 5,
        //     productName: "Áo khoác nam",
        //     image: "https://product.hstatic.net/1000369857/product/akd903_1_tui_1200x1200_0002_layer_21_c8306b98e3604f5890c8446b99cf2a9b.jpg",
        //     price: 400000,
        //     quantity: 60,
        //     total: 24000000,
        // }
    ]

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <Card className='col-span-1 lg:col-span-4'>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Sản phẩm bán chạy</CardTitle>
                    <CardDescription>
                        Những sản phẩm có lượt mua nhiều nhất
                    </CardDescription>
                </div>
                {/* <Select>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select> */}
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full flex flex-col justify-between min-h-[419px]">
                    <DataTableProducts columns={columnsProducts} data={fakeData} />
                </div>
            </CardContent>
        </Card>
    )
}
