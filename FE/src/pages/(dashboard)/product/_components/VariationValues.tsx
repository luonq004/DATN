import { Variant } from "@/common/types/Product";
import { FormTypeProductCommon } from "@/common/types/validate";
import { FieldArrayWithId } from "react-hook-form";

const VariationValues = ({
  form,
  indexValue,
  field,
}: {
  form: FormTypeProductCommon;
  indexValue: number;
  field: FieldArrayWithId<Variant>;
}) => {
  // console.log("field", field);

  return <div>VariationValues</div>;
};

export default VariationValues;
