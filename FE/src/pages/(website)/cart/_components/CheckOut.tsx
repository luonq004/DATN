import { Cart, FormOut } from "@/common/types/formCheckOut";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Country from "./Country";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import idk from "@/assets/icons/idk.svg";
import visa from "@/assets/icons/Visa.svg";
import bitcoin from "@/assets/icons/Bitcoin.svg";
import interac from "@/assets/icons/Interac.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAddress from "@/common/hooks/address/useAddress";
import { useUserContext } from "@/common/context/UserProvider";
import { Alert } from "@/components/ui/alert";

const CheckOut = () => {
  const navigate = useNavigate();

  const form = useForm<FormOut>({
    defaultValues: {
      name: "",
      country: "",
      phone: "",
      email: "",
      paymentMethod: "",
      addressDetail: "",
      note: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
  const [selectedWardId, setSelectedWardId] = useState<string>("");
  const [ carts, setcarts ] = useState<Cart | null>(null);
  const { _id } = useUserContext() ?? {};
  const { data: addresses, } = useAddress(_id);
  console.log("addresses", addresses)
  // lấy dữ liệu giỏ hàng
    useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cart/${_id}`
        );
        setcarts(response.data); // Cập nhật dữ liệu vào state
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchCartData();
  }, [_id]);
  
  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
  };

  const handleWardChange = (wardId: string) => {
    setSelectedWardId(wardId);
  };

  const onSubmit = async(data: FormOut) => {
    if (!selectedCityId || !selectedDistrictId || !selectedWardId) {
      alert("Bạn phải chọn đầy đủ thông tin địa chỉ!");
      return;
    }
    const orderData = {
      ...data,
      cityId: selectedCityId,
      districtId: selectedDistrictId,
      wardId: selectedWardId,
      products: carts,
      userId: _id,
      payment: data.paymentMethod,
      totalPrice: carts?.total ?? 0,
    };
    try {
      // Gửi yêu cầu tạo đơn hàng đến backend
      const response = await axios.post(
        'http://localhost:8080/api/create-order',
        orderData
      );
      if (response.status === 201) {
        // Đơn hàng đã được tạo thành công
        <Alert variant="default">Tạo địa chỉ thành công!</Alert> 
        navigate("/cart/order");  // Điều hướng đến trang đơn hàng
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng: ", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 2xl:w-[1408px] xl:w-[1200px] py-8 px-4 lg:w-[900px] max-[830px]:flex-col max-[830px]:flex grid grid-cols-2 xl:grid lg:grid-cols-2 xl:grid-cols-[57%_auto] 2xl:grid-cols-[57%_auto] gap-x-16 mx-auto"
      >
        <div>
          <div className="flex justify-between pb-6 mb-4 border-b border-b-[#C8C9CB]">
            <h3 className="text-[24px] font-medium">GIAO HÀNG</h3>
            <span className="text-[#9D9EA2]">(3)</span>
          </div>

          <FormField
            control={control}
            name="name"
            rules={{ required: "HỌ VÀ TÊN KHÔNG ĐƯỢC ĐỂ TRỐNG!" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">HỌ VÀ TÊN*</FormLabel>
                <FormControl>
                  <Input placeholder="NHẬP TÊN ĐẦY ĐỦ CỦA BẠN!" {...field} />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* ==================  tỉnh thành ================ */}

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">ĐỊA CHỈ*</FormLabel>
                <FormControl>
                  <Country
                    {...field}
                    onCityChange={handleCityChange}
                    onDistrictChange={handleDistrictChange}
                    onWardChange={handleWardChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* ================== end tỉnh thành ================ */}

          <FormField
            control={control}
            name="phone"
            rules={{
              required: "SỐ ĐIỆN THOẠI KHÔNG ĐƯỢC ĐỂ TRỐNG!",
              minLength: {
                value: 10,
                message: "SÔ ĐIỆN THOẠI PHẢI CÓ ÍT NHẤT 10 CHỮ SỐ",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "SỐ ĐIỆN THOẠI KHÔNG HỢP LỆ",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">SỐ ĐIỆN THOẠI*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage>{errors.phone?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            rules={{
              required: "ĐỊA CHỈ EMAIL LÀ BẮT BUỘC!",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "ĐỊA CHỈ EMAIL KHÔNG HỢP LỆ",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">ĐỊA CHỈ EMAIL *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="addressDetail"
            rules={{ required: "ĐỊA CHỈ CHI TIẾT KHÔNG ĐƯỢC ĐỂ TRỐNG" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">ĐỊA CHỈ CHI TIẾT*</FormLabel>
                <FormControl>
                  <Textarea placeholder="NHẬP ĐỊA CHỈ CHI TIẾT CỦA BẠN VÀO ĐÂY!" {...field} />
                </FormControl>
                <FormMessage>{errors.note?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="note"
            rules={{ required: "GHI CHÚ KHÔNG ĐƯỢC ĐỂ TRỐNG" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">GHI CHÚ*</FormLabel>
                <FormControl>
                  <Textarea placeholder="NHẬP TIN NHẮN CỦA BẠN VÀO ĐÂY!" {...field} />
                </FormControl>
                <FormMessage>{errors.note?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div>
          <div className="flex flex-col gap-6 border border-[#F4F4F4] rounded-[16px] p-6">
            <div className="Subtotal flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Tổng tiền
                </p>
                <p className="">
                  $<span>360.00</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Vận chuyển
                </p>
                <p className="">New York, US</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Giảm giá
                </p>
                <p className="">
                  $<span>0</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Chi phí vận chuyển
                </p>
                <p className="">
                  $<span>50.00</span>
                </p>
              </div>
            </div>
            <div className="Code-Sale flex items-center justify-between gap-4">
              <Input placeholder="Mã giảm giá" style={{ margin: 0 }} />
              <div className="py-3 px-5 rounded-full text-light-400 text-[14px] bg-light-50 whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-light-100 select-none">
               Áp dụng phiếu giảm giá
              </div>
            </div>
            <hr />
            <div className="flex gap-5 ">
              <Checkbox className="w-[22px] h-[22px]" id="terms" />
              <span className="text-[#717378] text-[14px]">
              Tôi xác nhận rằng địa chỉ của tôi là chính xác 100% và SẼ KHÔNG bắt Top Shelf BC 
              phải chịu trách nhiệm nếu lô hàng này được gửi đến địa chỉ không chính xác. *
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vnay">Vnay</SelectItem>
                        <SelectItem value="Momo">Momo</SelectItem>
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

            <button type="submit" className="bg-[#C8C9CB] hover:bg-light-400 transition-all duration-300 flex justify-center items-center w-full py-4 gap-4 rounded-full text-white font-medium cursor-pointer select-none">
              <div>ĐẶT HÀNG</div>
              <div className="">|</div>
              <div>
                $<span>547.00</span>
              </div>
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
      </form>
    </Form>
  );
};

export default CheckOut;
