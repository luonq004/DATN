import { FormOut } from "@/common/types/formCheckOut";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

const CheckOut = () => {
  const navigate = useNavigate();

  const form = useForm<FormOut>({
    defaultValues: {
      name: "",
      country: "",
      phone: "",
      email: "",
      paymentMethod: "",
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

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
  };

  const handleWardChange = (wardId: string) => {
    setSelectedWardId(wardId);
  };

  const onSubmit = (data: FormOut) => {
    if (!selectedCityId || !selectedDistrictId || !selectedWardId) {
      alert("Bạn phải chọn đầy đủ thông tin địa chỉ!");
      return;
    }
    console.log({
      ...data,
      cityId: selectedCityId,
      districtId: selectedDistrictId,
      wardId: selectedWardId,
    });
    navigate("/cart/order");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 2xl:w-[1408px] xl:w-[1200px] py-8 px-4 lg:w-[900px] max-[830px]:flex-col max-[830px]:flex grid grid-cols-2 xl:grid lg:grid-cols-2 xl:grid-cols-[57%_auto] 2xl:grid-cols-[57%_auto] gap-x-16 mx-auto"
      >
        <div>
          <div className="flex justify-between pb-6 mb-4 border-b border-b-[#C8C9CB]">
            <h3 className="text-[24px] font-medium">Shipping</h3>
            <span className="text-[#9D9EA2]">(3)</span>
          </div>

          <FormField
            control={control}
            name="name"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">FULL NAME*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel className="text-black">COUNTRY / REGION *</FormLabel>
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
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number is not valid",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">PHONE (optional)</FormLabel>
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
              required: "Email address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email address is not valid",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">EMAIL ADDRESS *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="note"
            rules={{ required: "Note is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">NOTE *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
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
                  Subtotal
                </p>
                <p className="">
                  $<span>360.00</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Shipping
                </p>
                <p className="">New York, US</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Discount
                </p>
                <p className="">
                  $<span>0</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
                  Shipping Costs
                </p>
                <p className="">
                  $<span>50.00</span>
                </p>
              </div>
            </div>
            <div className="Code-Sale flex items-center justify-between gap-4">
              <Input placeholder="Coupon code" style={{ margin: 0 }} />
              <div className="py-3 px-5 rounded-full text-light-400 text-[14px] bg-light-50 whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-light-100 select-none">
                Apply Coupon
              </div>
            </div>
            <hr />
            <div className="flex gap-5 ">
              <Checkbox className="w-[22px] h-[22px]" id="terms" />
              <span className="text-[#717378] text-[14px]">
                I confirm that my address is 100% correct and WILL NOT hold Top
                Shelf BC liable if this shipment is sent to an incorrect
                address. *
              </span>
            </div>
            <div className="flex gap-5 ">
              <Checkbox className="w-[22px] h-[22px]" id="emailUpdates" />
              <span className="text-[#717378] text-[14px]">
                Sign me up to receive email updates and news (optional)
              </span>
            </div>
            {/* ============= PAYMENTMEDTHOD=============== */}
            <div className="w-full mx-auto">
              <FormField
                control={control}
                name="paymentMethod"
                rules={{ required: "Payment method is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
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

            <button className="bg-[#C8C9CB] hover:bg-light-400 transition-all duration-300 flex justify-center items-center w-full py-4 gap-4 rounded-full text-white font-medium cursor-pointer select-none">
              <div>Place Order</div>
              <div className="">|</div>
              <div>
                $<span>547.00</span>
              </div>
            </button>
            <div className="Payments flex flex-col gap-4">
              <p className="text-[#717378] uppercase text-[14px] tracking-[2px] max-sm:tracking-[1px]">
                SECURE PAYMENTS PROVIDED BY
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
