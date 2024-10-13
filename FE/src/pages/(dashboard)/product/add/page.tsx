import { useParams } from "react-router-dom";
import Container from "../_components/Container";

// Form Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InfoGeneralProduct from "../_components/InfoProduct";

// Validate Fields
import { productSchema, productSimpleSchema } from "@/common/types/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getProductEdit } from "../actions/api";
import { getUniqueAttributeValue, getUniqueTypes } from "@/lib/utils";
import { useGetAtributes } from "../actions/useGetAttributes";
import { Attribute } from "@/common/types/Product";

const ProductAddPage = () => {
  const { id } = useParams();
  const [typeProduct, setTypeProduct] = useState("simple");
  const { isLoadingAtributes, atributes } = useGetAtributes();

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
          variants: [
            {
              price: "",
              image: "",
              values: [],
              countOnStock: 0,
            },
          ],
          reviews: [],
          createdAt: "",
          updatedAt: "",
          deleted: false,
          price: 0,
          priceSale: 0,
          slug: "",
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schemaProduct>) {
    console.log(values);
  }

  if (isLoading || isLoadingAtributes) return <Container>Loading...</Container>;

  const types = id ? getUniqueTypes(product) : [];

  const filteredData = types.length
    ? atributes.filter((item: Attribute) => types.includes(item.name))
    : [];

  const attributeValue = id ? getUniqueAttributeValue(product) : [];
  // console.log("attributeValue: ", attributeValue);

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
              id={id ? true : false}
              form={form}
              typeProduct={typeProduct}
              handleChangeTab={handleChangeTab}
              filteredData={filteredData}
              attributeValue={attributeValue}
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
