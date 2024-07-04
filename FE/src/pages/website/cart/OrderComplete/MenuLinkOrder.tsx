import { Link } from 'react-router-dom'

const MenuLinkOrder = () => {
  return (
    <>
     <div className=" bg-[#f4f4f4] w-full h-auto mx-auto ">
        {/*========================= CHECKOUT =================*/}
        <ul className="min-[1408px]:w-[1408px] min-[1408px]:h-[86px] min-[1408px]:mx-auto min-[1408px]:max-w-[600px] grid grid-cols-[1fr_1fr_103px_1fr_1fr] max-w-[342px] gap-[13px] sm:grid-cols-[146px_75px_103px_75px_153px] lg:grid md:grid-cols-[146px_75px_103px_75px_153px] lg:grid-cols-[146px_72px_108px_73px_153px] h-[62px] md:h-[86px] sm:h-[86px] xl:h-[86px] 2xl:h-[86px] lg:h-[86px] mx-auto  justify-center items-center">
          <Link
            className="flex sm:justify-normal justify-center items-center gap-2 text-[14px] "
            to={`/cart`}
          >
            <span>
              <img
                className="w-[30px] h-[30px]"
                src="/src/assets/Icon_CheckOut.png"
                alt=""
              />
            </span>
            <div className="hidden sm:block font-medium ">Shopping Cart</div>
          </Link>
          <Link to={`/cart`}>
            <div>
              <img src="/src/assets/Line.png" alt="" />
            </div>
          </Link>
          <Link
            className="flex items-center gap-2 text-[14px] justify-center"
            to={`/cart`}
          >
            <span>
              <img
                className="w-[30px] h-[30px]"
                src="/src/assets/Icon_CheckOut.png"
                alt=""
              />
            </span>
            <div className="font-medium ">Checkout</div>
          </Link>
          <Link to={`/cart`}>
            <div>
              <img src="/src/assets/Line_gray.png" alt="" />
            </div>
          </Link>
          <Link
            className="flex items-center gap-2 justify-center sm:justify-normal text-[14px]"
            to={`/cart`}
          >
            <span>
              <img
                className="w-[30px] h-[30px]"
                src="/src/assets/Order_CheckOut.png"
                alt=""
              />
            </span>
            <div className="hidden font-medium  sm:block">Order Complete</div>
          </Link>
        </ul>
        {/*=========================END  CHECKOUT =================*/}
      </div></>
  )
}

export default MenuLinkOrder