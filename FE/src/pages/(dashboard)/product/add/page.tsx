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
import {
  checkForDuplicateVariants,
  getUniqueAttributeValue,
  getUniqueTypes,
} from "@/lib/utils";
import { useGetAtributes } from "../actions/useGetAttributes";
import { Attribute } from "@/common/types/Product";
import StatusProduct from "../_components/StatusProduct";
import { useCreateProduct } from "../actions/useCreateProduct";

const ProductAddPage = () => {
  const { id } = useParams();
  const [typeProduct, setTypeProduct] = useState("simple");
  const [duplicate, setDuplicate] = useState<number[]>([]);
  const { createProduct, isCreatting } = useCreateProduct();

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
    staleTime: 1000 * 60 * 5,
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
              price: 0,
              priceSale: 0,
              image: "",
              values: [
                {
                  _id: "",
                  name: "",
                  type: "",
                  value: "",
                },
              ],
              countOnStock: 0,
            },
          ],
          reviews: [],
          createdAt: "",
          updatedAt: "",
          deleted: false,
          price: 0,
          priceSale: 0,
          // slug: "",
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schemaProduct>) {
    console.log("values: ", values);
    // if (typeProduct !== "simple") {
    //   const duplicateValues = checkForDuplicateVariants(values);
    //   setDuplicate(duplicateValues);

    //   if (!duplicateValues.length) createProduct(values);
    // } else {
    //   createProduct(values);
    // }
  }

  if (isLoading || isLoadingAtributes || isCreatting)
    return <Container>Loading...</Container>;

  // console.log(duplicate);

  const types = id ? getUniqueTypes(product) : [];
  // console.log("types: ", types);

  const filteredData = types.length
    ? atributes.filter((item: Attribute) => types.includes(item.name))
    : [];
  // console.log("filteredData: ", filteredData);

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
              duplicate={duplicate}
            />

            {/* Info Categories and More... */}
            <StatusProduct form={form} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
};

export default ProductAddPage;
