import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useCreateAttribute } from "../actions/useCreateAttribute";
// import { useGetAttributeByID } from "../actions/useGetAttributeByID";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetCategoryByID } from "../actions/useGetCategoryByID";
import { useUpdateCategoryByID } from "../actions/useUpdateCategoryByID";
// import { useUpdateAttributeByID } from "../actions/useUpdateAttributeByID";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Hãy viết tên thuộc tính",
    })
    .max(50),
});

const UpdateAttributePage = () => {
  const { id } = useParams<{ id: string }>();
  const { updateCategory, isUpdating } = useUpdateCategoryByID(id!);

  const { isLoadingCategory, category, error } = useGetCategoryByID(id!);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  useEffect(() => {
    if (category) {
      form.reset({ name: category.name });
    }
  }, [category, form]);

  if (isLoadingCategory) {
    return <div>Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateCategory({ ...values, _id: id });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/3 ml-5"
      >
        <h2 className="text-2xl font-medium">Cập nhật danh mục</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isUpdating} type="submit">
          {isUpdating ? "Đang cập nhật" : "Cập nhật"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAttributePage;
