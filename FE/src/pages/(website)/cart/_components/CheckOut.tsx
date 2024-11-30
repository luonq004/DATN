import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cartEmpty from "@/assets/images/cart-empty.png";
import idk from "@/assets/icons/idk.svg";
import visa from "@/assets/icons/Visa.svg";
import bitcoin from "@/assets/icons/Bitcoin.svg";
import interac from "@/assets/icons/Interac.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAddress from "@/common/hooks/address/useAddress";
import { useUserContext } from "@/common/context/UserProvider";
import useCart from "@/common/hooks/useCart";
import { Cart, FormOut } from "@/common/types/formCheckOut";
import { Address } from "../../address/ListAddress";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import CheckOutVoucher from "./CheckOutVoucher";
import CreateAddress from "../../address/CreatAddress";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import AddressDialog from "./AddressDialog ";
import sendOrderConfirmationEmail from "./sendEmail";
import { useUser } from "@clerk/clerk-react";
// import { useQueryClient } from "@tanstack/react-query";
interface ErrorResponse {
  message: string;
}
/// thông tin thanh toán
// số thẻ 9704198526191432198
// tên : 	NGUYEN VAN A
// ngày 07/15
const CheckOut = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const form = useForm<FormOut>({
    defaultValues: {
      addressId: "",
      note: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { user } = useUser();
  const { _id } = useUserContext() ?? {};
  const Gmail = user?.primaryEmailAddress?.emailAddress;
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    isError: adressError,
  } = useAddress(_id);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  // lấy dữ liệu giỏ hàng
  const { cart: carts, isLoading: isLoadingCart, isError } = useCart(_id ?? "");
  const onSubmit = async (data: FormOut) => {
    const selectedProducts = carts?.products?.filter((product: Cart) => product.selected) || [];
    const orderData = {
      addressId: data.addressId,
      products: selectedProducts,
      userId: _id,
      note: data.note,
      payment: data.paymentMethod,
      totalPrice: carts?.total ?? 0,
    };
    try {
      // Gửi yêu cầu tạo đơn hàng đến backend
      const response = await axios.post(
        "http://localhost:8080/api/create-order",
        orderData
      );
      const createOrder = response.data;
      const orderCode = createOrder?.order?.orderCode;
      if (data.paymentMethod === "Vnpay") {
        const response = await axios.post(
          "http://localhost:8080/api/create_payment_url",
          {
            amount: carts?.total ?? 0,
            orderCode: orderCode,
            bankCode: "VNB",
          }
        );
        const paymentUrl = response.data.redirectUrl;
        console.log("paymentUrl", paymentUrl);
        window.location.href = paymentUrl;
      }
      if (data.paymentMethod === "COD" && response.status === 201) {
        // Đơn hàng đã được tạo thành công
        toast({
          title: "Thành công!",
          description: "Đặt hàng thành công.",
          variant: "default",
        });
        // queryClient.invalidateQueries(["CART", _id]);
        navigate("/cart/order"); // Điều hướng đến trang đơn hàng
        // Gửi email xác nhận đơn hàng
        await sendOrderConfirmationEmail(Gmail, orderCode);

      }
    } catch (error: unknown) {
      console.error("Lỗi khi tạo đơn hàng: ", error);

      if (axios.isAxiosError(error)) {
        // Kiểm tra nếu error là một AxiosError
        const errResponse: ErrorResponse = error.response?.data;
        const message = errResponse?.message || "Đã có lỗi xảy ra";

        // Hiển thị thông báo lỗi từ backend
        toast({
          title: "Thất bại!",
          description: message,
          variant: "default",
        });
      } else {
        // Các lỗi khác như không thể kết nối hoặc lỗi cấu hình yêu cầu
        toast({
          title: "Lỗi hệ thống",
          description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
          variant: "default",
        });
      }
    }
  };
  if (adressError) {
    return <div className="text-red-500">Lỗi khi tải địa chỉ.</div>;
  }
  if (isError) {
    return <div className="text-red-500">Lỗi khi tải giỏ hàng.</div>;
  }

  const defaultAddress = addresses?.find(
    (address: Address) => address.isDefault
  );
  if (defaultAddress) {
    form.setValue("addressId", defaultAddress._id); // Đặt giá trị vào form state
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 2xl:w-[1408px] xl:w-[1200px] py-8 px-4 lg:w-[900px] mx-auto"
      >
        {/* địa chỉ */}

        <div>
          <div className="xBNaac"></div>
          <div className="px-4 py-8 border">
            <div className="flex gap-4 mb-4 items-center">
              <svg
                height={16}
                viewBox="0 0 12 16"
                width={12}
                className="shopee-svg-icon icon-location-marker"
              >
                <path
                  d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="text-[20px]">Địa chỉ nhận hàng</span>
            </div>
            <div className="flex flex-wrap items-center">
              {isLoadingAddresses ? (
                <Skeleton className="h-[27px] w-full" />
              ) : (
                <>
                  {addresses?.length === 0 ? (
                    <CreateAddress />
                  ) : (
                    <>
                      {addresses &&
                        addresses.length > 0 &&
                        addresses
                          .filter((address: Address) => address.isDefault)
                          .map((address: Address) => (
                            <div
                              key={address._id}
                              className="flex gap-5 text-[18px]"
                            >
                              <p className="font-semibold">
                                {address.name} {address.phone}
                              </p>
                              <p>
                                {address.addressDetail}, {address.districtId},
                                {address.cityId}, {address.country}
                              </p>
                              <Controller
                                name="addressId" // Trường này sẽ chứa _id của địa chỉ
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="hidden"
                                    {...field}
                                    value={defaultAddress?._id || ""}
                                  />
                                )}
                              />
                            </div>
                          ))}
                          <div className="ml-[2%] px-4  text-[#b8cd06]"
                          style={{ border: "1px solid #b8cd06"}}>
                            Mặc Định
                          </div>
                      <div className="ml-[2.5%] text-blue-600 cursor-pointer flex-shrink-0 flex-1"
                      onClick={() => setDialogOpen(true)}
                      >
                        Thay đổi
                      </div>
                      {/* Dialog */}
                      <AddressDialog
                        isOpen={isDialogOpen}
                        onClose={handleDialogClose}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* end địa chỉ */}
        <div className=" 2xl:w-[1408px] xl:w-[1200px] py-8 px-4 lg:w-[900px] max-[830px]:flex-col max-[830px]:flex grid  xl:grid lg:grid-cols-[60%_40%] xl:grid-cols-[57%_auto] 2xl:grid-cols-[57%_auto] gap-x-16 mx-auto">
          <div className="">
            <div className="Top flex justify-between pb-6 border-b border-[#C8C9CB]">
              <p className="font-medium text-[24px] max-sm:text-[16px]">
                Giao hàng
              </p>
              {isLoadingCart ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : (
                <p className="text-[#9D9EA2] max-sm:text-[14px] transition-all duration-500">
                  ({carts?.products.length})
                </p>
              )}
            </div>
            <div className="Mid flex flex-col p-6 gap-6">
              {/* Cart__Product */}
              {carts?.products.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <img src={cartEmpty} alt="cart-empty" className="w-1/5" />
                  <p className="text-[#9D9EA2] max-sm:text-[14px]">
                    Your cart is empty
                  </p>
                </div>
              )}
              {isLoadingCart ? (
                <div className="grid grid-cols-2 space-y-3">
                  <Skeleton className="h-[50px] w-[71px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ) : (
                <>
                  {carts?.products.filter((item) => item.selected).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="grid transition-all duration-500 grid-cols-[81px_auto] max-sm:grid-cols-[75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6"
                    >
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
                              <Link to={`#`}>{item.productItem.name}</Link>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 max-sm:col-start-1">
                            <div className="flex rounded-[6px] *:transition-all duration-500 max-w-[8rem]">
                              <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black flex justify-center items-center">
                                <input
                                  className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                                  style={{ MozAppearance: "textfield" }}
                                  type="text"
                                  min={1}
                                  value={item.quantity}
                                  title="Quantity"
                                  placeholder="Enter quantity"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="">
                            <p>
                              $<span>{item.variantItem.price}.00</span>
                            </p>
                          </div>
                        </div>
                        {/* Attribute  */}
                        <div className="flex items-center gap-4 justify-between">
                          <p className="text-[#9D9EA2] w-[52%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">
                            Phân loại
                          </p>
                          <div className="relative">
                            {/* Attribute__Table  */}
                            <div className="flex items-center gap-1 px-2 py-1 border rounded-md cursor-pointer max-sm:text-[14px] select-none">
                              {item.variantItem.values.map(
                                (value: any, index: number) => (
                                  <div key={value._id}>
                                    {value.type}: {value.name}
                                    {index < item.variantItem.values.length - 1
                                      ? ","
                                      : ""}
                                  </div>
                                )
                              )}
                            </div>
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
                </>
              )}
              {/* End Cart__Product */}
              <FormField
                control={control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">LỜI NHẮN*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lưu ý cho người bán..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.note?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6 border border-[#F4F4F4] rounded-[16px] p-6">
              <CheckOutVoucher />
              <hr />
              <div className="flex gap-5 ">
                <Checkbox className="w-[22px] h-[22px]" id="terms" />
                <span className="text-[#717378] text-[14px]">
                  Tôi xác nhận rằng địa chỉ của tôi là chính xác 100% và SẼ
                  KHÔNG bắt Top Shelf BC phải chịu trách nhiệm nếu lô hàng này
                  được gửi đến địa chỉ không chính xác. *
                </span>
              </div>
              <div className="flex gap-5 ">
                <Checkbox className="w-[22px] h-[22px]" id="emailUpdates" />
                <span className="text-[#717378] text-[14px]">
                  Đăng ký để nhận email cập nhật và tin tức (tùy chọn)
                </span>
              </div>
              {/* ============= PAYMENTMEDTHOD=============== */}
              <div className="w-full mx-auto">
                <FormField
                  control={control}
                  name="paymentMethod"
                  rules={{ required: "VUI LÒNG CHỌN PHƯƠNG THỨC THANH TOÁN!" }}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // Cập nhật giá trị trong form
                          // Ngăn ngừa submit nếu có sự kiện submit ngoài mong muốn
                          // (ví dụ nếu bạn có một sự kiện submit trigger do việc thay đổi select)
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phương thức thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vnpay">Vnpay</SelectItem>
                          <SelectItem value="COD">COD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage>{errors.paymentMethod?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              {/* ============= PAYMENTMEDTHOD=============== */}

              <button
                type="submit"
                className="bg-[#C8C9CB] hover:bg-light-400 transition-all duration-300 flex justify-center items-center w-full py-4 gap-4 rounded-full text-white font-medium cursor-pointer select-none"
              >
                <div>ĐẶT HÀNG</div>
                <div className="">|</div>
                <div>${carts?.total}.00</div>
              </button>
              <div className="Payments flex flex-col gap-4">
                <p className="text-[#717378] uppercase text-[14px] tracking-[2px] max-sm:tracking-[1px]">
                  THANH TOÁN ĐƯỢC CUNG CẤP BỞI
                </p>
                <div className="flex gap-3">
                  <div className="border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]">
                    <img src={idk} alt="" />
                  </div>
                  <div className="border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]">
                    <img src={visa} alt="" />
                  </div>
                  <div className="border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]">
                    <img src={bitcoin} alt="" />
                  </div>
                  <div className="border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]">
                    <img src={interac} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckOut;
