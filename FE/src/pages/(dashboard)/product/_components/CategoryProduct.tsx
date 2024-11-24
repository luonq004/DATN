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

type Category = {
  _id: string;
  name: string;
  slug: string;
};

const CategoryProduct = ({ form }: { form: FormTypeProductVariation }) => {
  const { category, isLoadingCategory } = useCategory();

  if (isLoadingCategory) return <div>Loading...</div>;

  return (
    <Accordion className="bg-white border px-4" type="multiple">
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger className="no-underline">Danh mục</AccordionTrigger>
        <AccordionContent>
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                {category?.data.map((item: Category) => (
                  <FormItem
                    key={item._id}
                    className="flex flex-row items-start space-x-2 space-y-0 mb-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item._id)}
                        onCheckedChange={(checked) => {
                          let updatedTags = [...(field.value || [])];
                          if (checked && !updatedTags.includes(item._id)) {
                            updatedTags.push(item._id);
                          } else if (
                            !checked &&
                            updatedTags.includes(item._id)
                          ) {
                            updatedTags = updatedTags.filter(
                              (tag) => tag !== item._id
                            );
                          }
                          field.onChange(updatedTags);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.name}</FormLabel>
                  </FormItem>
                ))}
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                      return (
                        <FormItem
                          key={item._id}
                          className="flex flex-row items-start space-x-2 space-y-0 mb-2"
                        >
                          <FormControl>
                            <Checkbox
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
