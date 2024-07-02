import PaymentMethod from './PaymentMethod';
import { FormOut } from './interface/formCheckOut';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Country from './Country';

const FormCheckOutaa = () => {
  const form = useForm<FormOut>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      note: "",
    }
  });

  const {
    handleSubmit,
    control,
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
    console.log({
      ...data,
      cityId: selectedCityId,
      districtId: selectedDistrictId,
      wardId: selectedWardId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 2xl:w-[1408px] xl:w-[1200px] p-10 lg:w-[900px] lg:mt-[32px] max-[830px]:flex-col max-[830px]:flex grid grid-cols-2 xl:grid lg:grid-cols-2 xl:grid-cols-[57%_auto] 2xl:grid-cols-[57%_auto] gap-x-16 mx-auto">
        <div>
          <div className="flex justify-between lg:h-[54px] mb-8 border-b border-b-[#C8C9CB]">
            <h3 className="text-[24px] font-medium">Shipping</h3>
            <span className="text-[#9D9EA2]">(3)</span>
          </div>

          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FULL NAME*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>COUNTRY / REGION *</FormLabel>
                <FormControl>
                  <Country
                    {...field}
                    onCityChange={handleCityChange}
                    onDistrictChange={handleDistrictChange}
                    onWardChange={handleWardChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PHONE (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EMAIL ADDRESS *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NOTE *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
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
              I confirm that my address is 100% correct and WILL NOT hold Top Shelf BC liable if this shipment is sent to an incorrect address. *
            </span>
          </div>
          <div className="mb-8 flex gap-5 ">
            <Checkbox className="w-[22px] h-[22px]" id="emailUpdates" />
            <span className="text-[#717378] text-[14px]">
              Sign me up to receive email updates and news (optional)
            </span>
          </div>
          <div className="mb-8 mx-auto">
            <PaymentMethod />
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

export default FormCheckOutaa;
