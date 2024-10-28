import React from 'react'
import Revenue from './_component/Revenue'
import Order from './_component/Order'
import Customers from './_component/Customers'
import ProductList from './_component/ProductList'
import TopProduct from './_component/TopProduct'
import Map from './_component/Map'

const key = 'yourKey'


const List = () => {
    return (
        <div>
            <div className="flex justify-between gap-[10px] p-[20px]">
                <div className="w-1/3">
                    <Revenue />
                </div>
                <div className="w-1/3">
                    <Order />
                </div>
                <div className="w-1/3">
                    <Customers />
                </div>
            </div>


            <div className="flex justify-between gap-[10px] p-[20px]">
                <div className="w-3/5">
                    <ProductList />
                </div>
                <div className="w-2/5"> {/* Optional: Adjust width for TopProduct */}
                    <TopProduct />
                </div>
            </div>

            <div>
                <Map yourKey={key} />
            </div>
        </div>

    )
}

export default List