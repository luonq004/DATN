import { useUserContext } from "@/common/context/UserProvider";
import { useGetWishList } from "./action/useGetWishList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import useWishList from "./action/useWishList";

import { IoMdTrash } from "react-icons/io";
import { IoBagHandleSharp } from "react-icons/io5";

import { formatCurrency } from "@/lib/utils";
import SizeColorSelector from "./components/SizeColorSelect";
import { useAddToCart } from "../shop/actions/useAddToCart";

const WishListPage = () => {
  const { _id } = useUserContext();
  const [attribute, setAttribute] = useState<string | 1>("1");

  const { wishList, isLoading, isError } = useGetWishList(_id);

  const { addCart, isAdding } = useAddToCart();

  const {
    // isLoading,
    // isError,
    updateQuantity,
    removeItem,
    increaseItem,
    decreaseItem,
    changeVariant,
  } = useWishList(_id);

  if (isLoading || isError) {
    return (
      <div className="container">
        <div className="h-[30px] md:h-[60px]"></div>
        <h1 className="uppercase font-raleway text-4xl text-center text-[#333]">
          Loading...
        </h1>
      </div>
    );
  }

  function userAction(action: any, value: any) {
    const item = {
      userId: _id,
      ...value,
    };

    switch (action.type) {
      case "changeQuality":
        if (value.quantity < 0) {
          return;
        }
        if (isNaN(value.quantity)) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Vui lòng nhập số!`,
          });
          return;
        }
        updateQuantity.mutate(item);
        break;

      case "decreaseItem":
        if (value.quantity === 1) {
          const confirm = window.confirm("Sản phẩm sẽ bị xóa, bạn chắc chứ?");
          if (!confirm) return;
          decreaseItem.mutate(item);
        }
        decreaseItem.mutate(item);
        break;

      case "increaseItem":
        increaseItem.mutate(item);
        break;

      case "removeItem":
        const confirm = window.confirm("Bạn chắc chứ?");
        if (!confirm) return;
        removeItem.mutate(item);
        break;

      case "removeItemAfterAddCart":
        removeItem.mutate(item);
        break;

      case "changeVariant":
        changeVariant.mutate(item, {
          onSuccess: () => {
            toast({
              title: "Sucsess",
              description: "Đổi thành công!",
            });
            setAttribute("1");
          },
        });
        break;
    }
  }

  const hanldeOnChangeAttribute = (idCart: string) => {
    setAttribute(idCart);
  };

  return (
    <div className="container h-screen">
      <div className="h-[30px] md:h-[60px]"></div>

      <h1 className="uppercase font-raleway text-4xl text-center text-[#333]">
        danh mục yêu thích của bạn
      </h1>

      <div className="h-[30px] md:h-[50px]"></div>

      <div className="border-t border-black py-8">
        <div className="Mid flex flex-col gap-6">
          {wishList?.products.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              {/* <img src={cartEmpty} alt="cart-empty" className="w-1/5" /> */}
              <p className="text-[#9D9EA2] max-sm:text-[14px]">
                Danh sách trống
              </p>
            </div>
          )}
          {wishList?.products.map((item: any, index: number) => (
            <div
              className="flex gap-5 pb-8 border-b last:border-none border-dashed"
              key={item.productItem._id}
            >
              <img
                className="w-24 h-24 object-cover"
                src={item.productItem.image}
                alt={item.productItem.name}
              />

              <div className="w-full">
                <div className="flex justify-between">
                  <Link to={`/product/${item.productItem._id}`}>
                    <h3 className="text-lg">{item.productItem.name}</h3>
                  </Link>

                  <IoMdTrash
                    className="text-3xl cursor-pointer"
                    onClick={() =>
                      userAction(
                        { type: "removeItem" },
                        {
                          productId: item.productItem._id,
                          variantId: item.variantItem._id,
                        }
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between mt-2 flex-wrap">
                  <h3 className="text-lg">
                    Giá {formatCurrency(item.productItem.price)} VNĐ
                  </h3>

                  <p className="text-[#9D9EA2] transition-all duration-500">
                    Còn {item.variantItem.countOnStock} sản phẩm
                  </p>
                </div>

                <div className="flex mt-2 justify-between">
                  <span className="text-lg">Phân loại</span>

                  <div className="relative">
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
                  </div>
                </div>

                <div className="flex mt-2 justify-between">
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

                  <IoBagHandleSharp
                    className="text-3xl cursor-pointer"
                    title="Thêm vào giỏ hàng"
                    onClick={() => {
                      addCart({
                        productId: item.productItem._id,
                        variantId: item.variantItem._id,
                        quantity: item.quantity,
                        userId: _id,
                      });
                      userAction(
                        { type: "removeItemAfterAddCart" },
                        {
                          productId: item.productItem._id,
                          variantId: item.variantItem._id,
                        }
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {/* End Cart__Product */}
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
