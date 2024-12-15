import { useCategory } from "@/common/hooks/useCategory";
import { FormTypeProductVariation } from "@/common/types/validate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  defaultCategory: boolean;
  deleted: boolean;
};

const CategoryProduct = ({ form }: { form: FormTypeProductVariation }) => {
  const defaultCategory = "675dadfde9a2c0d93f9ba531";

  const { category, isLoadingCategory } = useCategory();

  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    "item-3"
  );

  if (isLoadingCategory) return <div>Loading...</div>;

  // console.log(form.getValues("category"));

  return (
    <Accordion
      className="bg-white border px-4"
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={(value) => setAccordionValue(value)}
    >
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger className="no-underline">Danh mục</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                {category?.data?.map((item: Category) => (
                  <FormField
                    key={item._id}
                    control={form.control}
                    name="category"
                    render={({ field }) => {
                      // console.log(item);
                      return (
                        <FormItem
                          key={item._id}
                          className="flex flex-row items-start space-x-2 space-y-0 mb-2"
                        >
                          <FormControl>
                            <Checkbox
                              disabled={item._id === defaultCategory}
                              checked={field.value?.includes(item._id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item._id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item._id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoryProduct;
