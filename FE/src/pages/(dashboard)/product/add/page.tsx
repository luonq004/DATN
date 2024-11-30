import { useParams } from "react-router-dom";
import Container from "../_components/Container";

// Form Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InfoGeneralProduct from "../_components/InfoProduct";

// Validate Fields
import { productSchema } from "@/common/types/validate";
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
import { useUpdateProduct } from "../actions/useUpdateProduct";

import { UploadFiles } from "@/lib/upload";

const ProductAddPage = () => {
  const { id } = useParams();
  const [duplicate, setDuplicate] = useState<number[]>([]);
  const { createProduct, isCreatting } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct(id!);

  const [isDoing, setIsDoing] = useState(false);

  const { isLoadingAtributes, atributes } = useGetAtributes();

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

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: id
      ? product
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
          createdAt: "",
          updatedAt: "",
          deleted: false,
          price: 0,
          priceSale: 0,
          category: [],
          image: "",
          type: "variable",
        },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof productSchema>) {
    // console.log("values: ", values);
    setIsDoing(true);

    if (id) {
      const duplicateValues = checkForDuplicateVariants(values);
      setDuplicate(duplicateValues);
      if (!duplicateValues.length) {
        const result = await UploadFiles(values);
        updateProduct({ data: result, id });
      }
    } else {
      const duplicateValues = checkForDuplicateVariants(values);
      setDuplicate(duplicateValues);

      if (!duplicateValues.length) {
        const result = await UploadFiles(values);
        createProduct(result);
      }
    }

    if (!isCreatting || !isUpdating) setIsDoing(false);
  }

  if (isLoading || isLoadingAtributes) return <Container>Loading...</Container>;

  const types = id ? getUniqueTypes(product) : [];
  // console.log("types: ", types);

  const filteredData = types.length
    ? atributes.filter((item: Attribute) => types.includes(item.name))
    : [];
  // console.log("filteredData: ", filteredData);

  const attributeValue = id ? getUniqueAttributeValue(product) : [];
  // console.log("attributeValue: ", attributeValue);

  // console.log(form.setError("variants.0.values.0.name", { message: "Error" }));

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
              filteredData={filteredData}
              attributeValue={attributeValue}
              duplicate={duplicate}
            />

            {/* Info Categories and More... */}
            <StatusProduct form={form} loading={isDoing} />
          </div>
          <Button disabled={isDoing} type="submit">
            Lưu sản phẩm
          </Button>
        </form>
      </Form>
    </Container>
  );
};

export default ProductAddPage;
