import { useReducer, useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { tabProductData } from "@/common/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttributeTab from "./AttributeTab";
import { reducer } from "./reducer";

import { Attribute, Data, State } from "@/common/types/Product";
import { getSelectedValues, getUniqueTypesFromFields } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetAtributes } from "../actions/useGetAttributes";
import VariationTab from "./VariationTab";
import { FormTypeProductVariation } from "@/common/types/validate";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const InfoGeneralProduct: React.FC<{
  id: boolean;
  form: FormTypeProductVariation;
  filteredData: Attribute[];
  attributeValue: Data[][];
  duplicate: number[];
}> = ({ id, form, filteredData, attributeValue, duplicate }) => {
  const [valuetab, setValueTab] = useState("inventory");
  const { atributes } = useGetAtributes();

  const value = form.watch("descriptionDetail");

  const handleChange = (content: string) => {
    form.setValue("descriptionDetail", content); // Ghi giá trị vào React Hook Form
  };

  const initialState: State = {
    attributesChoose: filteredData,
    valuesChoose: attributeValue, // valuesChoose là mảng chứa mảng Data[]
    valuesMix: [], // valuesMix là mảng chứa mảng Data[]
  };
  const [stateAttribute, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
    getSelectedValues(attributeValue, atributes)
  );

  const handleAttributeValueChange = (
    attributeId: string,
    selectedOptions: {
      value: string;
      label: string;
      _id: string;
      attribute: string;
    }
  ) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [attributeId]: selectedOptions,
    }));
  };

  // Variant:
  const { fields, replace, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const typeFields: string[] = getUniqueTypesFromFields(fields) as string[];

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
        <Accordion
          className="bg-white"
          type="single"
          collapsible
          orientation="vertical"
        >
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
                <TabsList className="flex flex-col justify-start gap-2 h-auto bg-white border-r rounded-none p-0">
                  {tabProductData.map((tab) => (
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

                {/* <TabsContent className="px-3 pt-2" value="inventory">
                  Manage your inventory here.
                </TabsContent> */}
                <TabsContent className="px-3 pt-2" value="shipping">
                  Configure shipping options here.
                </TabsContent>
                {/* <TabsContent className="px-3 pt-2" value="linked-products">
                  Manage linked products here.
                </TabsContent> */}
                <TabsContent
                  className="px-3 pt-2 flex-1 min-h-[400px]"
                  value="attributes"
                >
                  <AttributeTab
                    attributes={atributes}
                    stateAttribute={stateAttribute}
                    dispatch={dispatch}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    handleAttributeValueChange={handleAttributeValueChange}
                  />
                </TabsContent>
                <TabsContent className="px-3 pt-2 w-full" value="variations">
                  <VariationTab
                    fields={fields}
                    stateAttribute={stateAttribute}
                    typeFields={typeFields}
                    form={form}
                    attributes={atributes}
                    replaceFields={replace}
                    removeFields={remove}
                    duplicate={duplicate}
                  />
                </TabsContent>
                <TabsContent className="px-3 pt-2" value="advanced">
                  Advanced product settings go here.
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <ReactQuill
        className="bg-white mt-9"
        theme="snow"
        value={value}
        onChange={handleChange} // Sử dụng handleChange
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              // { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={formats}
      />
    </div>
  );
};

export default InfoGeneralProduct;
