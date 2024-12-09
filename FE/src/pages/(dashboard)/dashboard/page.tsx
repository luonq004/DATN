import { AreaChartList } from "./_components/AreaChartList";
import { CardTabsList } from "./_components/CardTabsList";
import { UserList } from "./_components/UserList";
import { TopProducts } from "./_components/TopProducts";
import { CircleCategory } from "./_components/CircleCategory";
import { OrderList } from "./_components/OrderList";

export default function DashBoardPage() {
  return (
    <div className="bg-white grid gap-y-4">
      <CardTabsList />
      {/* <AreaChartList /> */}
      <div className='grid grid-cols-1 gap-4'>
        <OrderList />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <AreaChartList />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* <CircleTotal /> */}
        {/* <CircleCategory /> */}
        <UserList />
        <TopProducts />
      </div>
    </div>
  )
}
