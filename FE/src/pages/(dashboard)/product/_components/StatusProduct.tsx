import { FormTypeProductVariation } from "@/common/types/validate";
import CategoryProduct from "./CategoryProduct";
import ProductImage from "./ProductImage";

const StatusProduct = ({ form }: { form: FormTypeProductVariation }) => {
  return (
    <div className="w-1/4 flex flex-col gap-3">
      <p>Publish</p>
      <ProductImage form={form} />
      <CategoryProduct form={form} />
    </div>
  );
};

export default StatusProduct;
