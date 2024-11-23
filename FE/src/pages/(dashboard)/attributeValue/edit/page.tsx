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
import { useGetAttributeValueByID } from "../actions/useGetAttributeValueByID";

// import { useUpdateAttributeByID } from "../actions/useUpdateAttributeByID";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Hãy viết tên giá trị thuộc tính",
  }),
  value: z.string().min(1, {
    message: "Hãy viết giá trị thuộc tính",
  }),

  type: z.string().min(1, {
    message: "Hãy chọn loại giá trị thuộc tính",
  }),
});

const UpdateAttributeValuePage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoadingAtributeValue, atributeValue, error } =
    useGetAttributeValueByID(id!);

  // const { isLoadingAtribute, atribute, error } = useGetAttributeByID(id!);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  useEffect(() => {
    if (atributeValue) {
      form.reset(atributeValue);
    }
  }, [atributeValue, form]);

  if (isLoadingAtributeValue) {
    return <div>Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // updateAttribute({ ...values, _id: id });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/3 ml-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên giá trị thuộc tính</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị thuộc tính</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại giá trị thuộc tính</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          // disabled={isUpdating}
          type="submit"
        >
          Cập nhật
          {/* {isUpdating ? "Đang cập nhật" : "Cập nhật"} */}
        </Button>
      </form>
    </Form>
  );
};
export default UpdateAttributeValuePage;
