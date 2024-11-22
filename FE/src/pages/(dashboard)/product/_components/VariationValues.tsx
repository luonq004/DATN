import { FormTypeProductVariation } from "@/common/types/validate";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "react-hook-form";

const VariationValues = ({
  form,
  indexValue,
  removeFields,
}: {
  form: FormTypeProductVariation;
  indexValue: number;
  removeFields: (index: number) => void;
}) => {
  const errors = form.formState.errors.variants as
    | FieldErrors<{ price: number; countOnStock: number; priceSale: number }>[]
    | undefined;

  const renderInput = (
    field: "price" | "countOnStock" | "priceSale",
    label: string
  ) => (
    <div>
      <label className="block">{label}</label>
      <input
        type="text"
        {...form.register(`variants.${indexValue}.${field}` as const)}
        className={errors?.[indexValue]?.[field] ? "border-red-500" : ""}
      />
      <span className="text-xs block text-red-600">
        {errors?.[indexValue]?.[field]?.message}
      </span>
    </div>
  );

  return (
    <div>
      {renderInput("price", "Giá")}
      {renderInput("priceSale", "Giá giảm giá")}
      {/* {renderInput("countOnStock", "Số lượng tồn kho")} */}

      <Button
        type="button"
        className="bg-red-500"
        onClick={() => removeFields(indexValue)}
      >
        Xóa
      </Button>
    </div>
  );
};

export default VariationValues;
