//images
import cartEmpty from "@/assets/images/cart-empty.png";

//type
import Icart from "@/common/types/cart";

//other
import PolicyCart from "./PolicyCart";
import SizeColorSelector from "./SizeColorSelect";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CartLeft = ({
  cart,
  attribute,
  setAttribute,
  userAction,
  isLoading,
  isError,
}: {
  cart: Icart;
  attribute: any;
  setAttribute: (idCart: string) => void;
  userAction: (action: { type: string }, payload: any) => void;
  isLoading: Boolean;
  isError: Boolean;
}) => {
  const hanldeOnChangeAttribute = (idCart: string) => {
    // console.log(number)
    setAttribute(idCart);
  };

  if (isLoading) return <div>is Loading</div>;
  if (isError) return <div>is Error</div>;

  return (
    <div className="Your_Cart flex flex-col gap-6">
      {/* Top  */}
      <div className="Top flex justify-between pb-6 border-b border-[#C8C9CB]">
        <p className="font-medium text-[24px] max-sm:text-[16px]">Giỏ hàng</p>
        <p className="text-[#9D9EA2] max-sm:text-[14px] transition-all duration-500">
          ({cart?.products.length})
        </p>
      </div>
      {/* End Top  */}

      {/* Selected All */}
      <div className="w-full grid grid-cols-[auto_37%] justify-between items-center gap-x-4 bg-gray-100 py-1.5">
        <div className="flex gap-x-5 items-center">
          {(cart?.products?.filter((item: any) => item.selected === true).length === cart?.products.length)
            ?
            <div className="flex items-center">
              <div
                className="inline-flex justify-center p-0.5 items-center rounded-sm bg-[#b8cd06] cursor-pointer"
                onClick={() => userAction(
                  { type: "selectedAll" }, {}
                )}
              >
                <Check strokeWidth={'3px'} size={16} color="white" />
              </div>
            </div>
            :
            <div className="flex items-center">
              <div
                className="inline-flex p-[9px] rounded-sm border border-[#0000008a] cursor-pointer"
                onClick={() => userAction(
                  { type: "selectedAll" }, {}
                )}
              >
              </div>
            </div>
          }
          <div>
            <span>Sản phẩm</span>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div>
            <span>Số lượng</span>
          </div>
          <div>
            <span>Giá</span>
          </div>
          <div>
            <span>Xóa</span>
          </div>
        </div>
      </div>

      {/* Mid  */}
      <div className="Mid flex flex-col gap-6">
        {/* Cart__Product */}
        {cart?.products.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <img src={cartEmpty} alt="cart-empty" className="w-1/5" />
            <p className="text-[#9D9EA2] max-sm:text-[14px]">Giỏ hàng trống</p>
          </div>
        )}
        {cart?.products.map((item: any, index: number) => (
          <div
            key={index}
            className="grid transition-all duration-500 grid-cols-[18px_81px_auto] max-sm:grid-cols-[18_px_75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6"
          >
            <div className="inline-flex justify-center items-start select-none">
              {item.selected && item.selected === true
                ?
                (
                  <div
                    className="rounded-sm p-0.5 bg-[#b8cd06] cursor-pointer"
                    onClick={() => userAction(
                      { type: "selectedOne" },
                      {
                        productId: item.productItem._id,
                        variantId: item.variantItem._id,
                      }
                    )}
                  >
                    <Check strokeWidth={'3px'} size={16} color="white" />
                  </div>
                )
                :
                (
                  <div
                    className="p-[9px] rounded-sm border border-[#0000008a] cursor-pointer"
                    onClick={() => userAction(
                      { type: "selectedOne" },
                      {
                        productId: item.productItem._id,
                        variantId: item.variantItem._id,
                      }
                    )}
                  >
                  </div>
                )
              }
            </div>
            {/* Image  */}
            <div className="Image_Product">
              <div className="border border-[#dddcdc] rounded-[6px] p-1">
                <img
                  className="w-full h-full"
                  src={item.productItem.image}
                  alt="img"
                />
              </div>
            </div>
            {/* information */}
            <div className="flex flex-col gap-3">
              <div className="flex max-sm:grid max-sm:grid-cols-[50%_auto] justify-between items-center gap-4">
                <div className="text-[#9D9EA2] flex w-[45%] max-sm:w-full transition-all duration-500 max-sm:text-[14px]">
                  <div className="hover:text-black">
                    <Link to={`/product/${item.productItem._id}`}>{item.productItem.name}</Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-sm:col-start-1">
                  <div className="flex rounded-[6px] *:transition-all duration-500 max-w-[8rem]">
                    <div
                      onClick={() =>
                        userAction(
                          { type: "decreaseItem" },
                          {
                            productId: item.productItem._id,
                            variantId: item.variantItem._id,
                            quantity: item.quantity,
                          }
                        )
                      }
                      className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none"
                    >
                      -
                    </div>
                    <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black flex justify-center items-center">
                      <input
                        onChange={(value) =>
                          userAction(
                            { type: "changeQuality" },
                            {
                              productId: item.productItem._id,
                              variantId: item.variantItem._id,
                              quantity: Number(value.target.value),
                            }
                          )
                        }
                        className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                        style={{ MozAppearance: "textfield" }}
                        type="text"
                        min={1}
                        value={item.quantity}
                        title="Quantity"
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div
                      onClick={() =>
                        userAction(
                          { type: "increaseItem" },
                          {
                            productId: item.productItem._id,
                            variantId: item.variantItem._id,
                          }
                        )
                      }
                      className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none"
                    >
                      +
                    </div>
                  </div>
                </div>

                <div className="">
                  <p>
                    <span>{formatCurrency(item.variantItem.price)} VNĐ</span>
                  </p>
                </div>
                <div
                  className="group transition-all pb-0 hover:pb-1 cursor-pointer max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:justify-end"
                  onClick={() =>
                    userAction(
                      { type: "removeItem" },
                      {
                        productId: item.productItem._id,
                        variantId: item.variantItem._id,
                      }
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    className="stroke-gray-500 transition duration-300 group-hover:stroke-red-500"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"
                    />
                  </svg>
                </div>
              </div>
              {/* Attribute  */}
              <div className="flex items-center gap-4 max-sm:justify-between">
                <p className="text-[#9D9EA2] w-[52%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">
                  Phân loại
                </p>
                <div className="relative">
                  {/* Attribute__Table  */}
                  <SizeColorSelector
                    idProduct={item.productItem._id}
                    idVariant={item.variantItem._id}
                    attribute={attribute}
                    idCart={item._id}
                    onChangeAttribute={hanldeOnChangeAttribute}
                    onChangeVariant={(value: any) =>
                      userAction({ type: "changeVariant" }, value)
                    }
                  />
                  {/* End Attribute__Table  */}
                </div>
              </div>
              {/* End Attribute  */}
              <div>
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Còn {item.variantItem.countOnStock} sản phẩm
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* End Cart__Product */}
      </div>
      {/* End Mid  */}

      {/* Bottom  */}
      <PolicyCart />
      {/* End Bottom  */}
    </div>
  );
};

export default CartLeft;
