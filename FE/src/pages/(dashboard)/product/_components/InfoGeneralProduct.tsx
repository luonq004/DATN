import React from "react";
import { FormTypeProductSimple } from "@/common/types/validate";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabProductData } from "@/common/constants";

const InfoGeneralProduct: React.FC<{
  form: FormTypeProductSimple;
  isLoading: boolean;
  typeProduct: string;
  handleChangeTab: (value: string) => void;
}> = ({ form, isLoading, typeProduct, handleChangeTab }) => {
  const [valuetab, setValueTab] = React.useState("inventory");

  return (
    <div className="w-3/4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="border rounded-sm h-8 px-2 mb-4"
                placeholder="Name Product"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      {typeProduct === "simple" && (
        <>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border rounded-sm h-8 px-2 mb-4"
                    placeholder="Price"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceSale"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border rounded-sm h-8 px-2 mb-4"
                    placeholder="Price Sale"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="shadcn" {...field} rows={10} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="border relative">
        <Accordion className="bg-white" type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="border-b p-5 hover:no-underline">
              Product data
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <Tabs
                value={valuetab}
                onValueChange={(value) => setValueTab(value)}
                className="flex"
              >
                <TabsList className="flex flex-col gap-2 justify-start h-auto bg-white border-r rounded-none p-0">
                  {typeProduct == "simple"
                    ? tabProductData
                        .filter((tab) => tab.label !== "Variations")
                        .map((tab) => (
                          <TabsTrigger
                            key={tab.value}
                            className="py-3 w-full data-[state=active]:bg-slate-200 hover:bg-slate-100 data-[state=active]:rounded-none"
                            value={tab.value}
                          >
                            {tab.label}
                          </TabsTrigger>
                        ))
                    : tabProductData
                        .filter((tab) => tab.label !== "General")
                        .map((tab) => (
                          <TabsTrigger
                            key={tab.value}
                            className="py-3 w-full data-[state=active]:bg-slate-200 hover:bg-slate-100 data-[state=active]:rounded-none"
                            value={tab.value}
                          >
                            {tab.label}
                          </TabsTrigger>
                        ))}
                </TabsList>

                {/* Tab Content */}
                {typeProduct == "simple" && (
                  <TabsContent value="general" className="px-3 pt-2">
                    General product information goes here General product
                    information goes here General product information goes here
                    General product information goes here. General product
                    information goes here General product information goes here
                    General product information goes hereGeneral product
                    information goes here General product information goes here
                  </TabsContent>
                )}
                {/* <TabsContent className="px-3 pt-2" value="inventory">
                  Manage your inventory here.
                </TabsContent> */}
                <TabsContent className="px-3 pt-2" value="shipping">
                  Configure shipping options here.
                </TabsContent>
                {/* <TabsContent className="px-3 pt-2" value="linked-products">
                  Manage linked products here.
                </TabsContent> */}
                <TabsContent className="px-3 pt-2" value="attributes">
                  Set product attributes here.
                </TabsContent>
                <TabsContent className="px-3 pt-2" value="variations">
                  Manage product variations here.
                </TabsContent>
                <TabsContent className="px-3 pt-2" value="advanced">
                  Advanced product settings go here.
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <select
          className="absolute text-sm top-5 py-0 w-24 lg:w-48 left-40 outline-none"
          value={typeProduct}
          onChange={(e) => {
            form.reset();
            setValueTab("inventory");
            handleChangeTab(e.target.value);
          }}
        >
          <option value="simple">Simple product</option>
          <option value="variable">Variable product</option>
        </select>
      </div>

      {/* <Skeleton className="w-[200px] h-[40px] rounded-full bg-slate-800 " /> */}
    </div>
  );
};

export default InfoGeneralProduct;
