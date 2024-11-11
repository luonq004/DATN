import { FormTypeProductCommon } from "@/common/types/validate";
import ProductImage from "./ProductImage";
import CategoryProduct from "./CategoryProduct";

const StatusProduct = ({ form }: { form: FormTypeProductCommon }) => {
  return (
    <div className="w-1/4 flex flex-col gap-3">
      <p>Publish</p>
      <ProductImage form={form} />
      <CategoryProduct form={form} />
    </div>
  );
};

export default StatusProduct;
