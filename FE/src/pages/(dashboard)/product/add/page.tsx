import { useParams } from "react-router-dom";
import Container from "../_components/Container";

// Form Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InfoGeneralProduct from "../_components/InfoGeneralProduct";

// Validate Fields
import { productSchema, productSimpleSchema } from "@/common/types/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getProductEdit } from "../actions/api";

const ProductAddPage = () => {
  const { id } = useParams();
  const [typeProduct, setTypeProduct] = useState("simple");

  function handleChangeTab(value: string) {
    setTypeProduct(value);
  }

  useEffect(() => {
    if (!id) document.title = "Page: Create Product";
  }, [id]);

  const { data: product, isLoading } = useQuery({
    queryKey: id ? ["Product", id] : ["Product"],
    queryFn: async () => {
      if (id) {
        const data = await getProductEdit(id);
        form.reset(data);
        return data;
      }
      return {};
    },
  });

  const schemaProduct =
    typeProduct === "simple" ? productSimpleSchema : productSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof schemaProduct>>({
    resolver: zodResolver(schemaProduct),
    defaultValues: id
      ? product
      : typeProduct === "simple"
      ? {
          name: "",
          description: "",
          price: 0,
          priceSale: 0,
        }
      : {
          name: "",
          description: "",
          variants: [],
          reviews: [],
          createdAt: "",
          updatedAt: "",
          deleted: false,
          price: 0,
          priceSale: 0,
          slug: "",
          attribute: [],
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schemaProduct>) {
    console.log(values);
  }

  if (isLoading) return <Container>Loading...</Container>;

  return (
    <Container>
      <h1 className="text-2xl font-normal mb-3">
        {id ? "Edit " : "Create "}Product
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            {/* Info Product */}
            <InfoGeneralProduct
              form={form}
              isLoading={isLoading}
              typeProduct={typeProduct}
              handleChangeTab={handleChangeTab}
            />

            {/* Info Categories and More... */}
            <div>Categories</div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
};

export default ProductAddPage;
