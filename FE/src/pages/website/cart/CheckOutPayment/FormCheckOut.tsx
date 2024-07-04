import { FormOut } from "./interface/formCheckOut";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Country from "./Country";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormCheckOut = () => {
  const form = useForm<FormOut>({
    defaultValues: {
      name: "",
      country: "",
      phone: "",
      email: "",
      paymentMethod:"",
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
      return;}
    console.log({
      ...data,
      cityId: selectedCityId,
      districtId: selectedDistrictId,
      wardId: selectedWardId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 2xl:w-[1408px] xl:w-[1200px] p-4 lg:w-[900px] lg:mt-[32px] max-[830px]:flex-col max-[830px]:flex grid grid-cols-2 xl:grid lg:grid-cols-2 xl:grid-cols-[57%_auto] 2xl:grid-cols-[57%_auto] gap-x-16 mx-auto"
      >
        <div>
          <div className="flex justify-between lg:h-[54px] mb-8 border-b border-b-[#C8C9CB]">
            <h3 className="text-[24px] font-medium">Shipping</h3>
            <span className="text-[#9D9EA2]">(3)</span>
          </div>

          <FormField
            control={control}
            name="name"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black " >FULL NAME*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black " >COUNTRY / REGION *</FormLabel>
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
                <FormLabel className="text-black " >PHONE (optional)</FormLabel>
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
                <FormLabel className="text-black " >EMAIL ADDRESS *</FormLabel>
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
                <FormLabel className="text-black " >NOTE *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage>{errors.note?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="border p-6 border-[#F4F4F4] rounded-[15px] md:h-[700px] lg:h-[700px]">
          <div className="flex mb-4 justify-between">
            <div className="lg:text-[#9D9EA2]">Subtotal</div>
            <div>$497.00</div>
          </div>
          <div className="flex mb-4 justify-between">
            <div className="text-[#9D9EA2]">Shipping</div>
            <div>New York, US</div>
          </div>
          <div className="flex mb-4 justify-between">
            <div className="text-[#9D9EA2]">Discount</div>
            <div>$0.0</div>
          </div>
          <div className="flex mb-5 justify-between">
            <div className="text-[#9D9EA2]">Shipping Costs</div>
            <div>$50.00</div>
          </div>
          <div className="flex mb-5 gap-6 items-center">
            <Input placeholder="Coupon code" />
            <Button
              className="bg-[#F3FBF4] rounded-[20px] h-12 hover:text-[#F3FBF4] hover:bg-[#17AF26] text-[#17AF26]"
              type="button"
            >
              Apply Coupon
            </Button>
          </div>
          <div className="mb-5 flex gap-5 ">
            <Checkbox className="w-[22px] h-[22px]" id="terms" />
            <span className="text-[#717378] text-[14px]">
              I confirm that my address is 100% correct and WILL NOT hold Top
              Shelf BC liable if this shipment is sent to an incorrect address.
              *
            </span>
          </div>
          <div className="mb-8 flex gap-5 ">
            <Checkbox className="w-[22px] h-[22px]" id="emailUpdates" />
            <span className="text-[#717378] text-[14px]">
              Sign me up to receive email updates and news (optional)
            </span>
          </div>
          <div className="mb-8 mx-auto">
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
            <FormDescription>
            </FormDescription>
            <FormMessage>{errors.paymentMethod?.message}</FormMessage>
          </FormItem>
        )}
      />  
          </div>
          <Button
            type="submit"
            className="flex lg:w-[300px] xl:w-[375px] mx-auto lg:h-[56px] gap-8"
          >
            <span>Place Order</span>
            <img src="src/assets/CheckOut_Order.png" alt="" />
            <span>$547.00</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCheckOut;
