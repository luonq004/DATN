import { Attribute, State, Variant } from "@/common/types/Product";
import { FormTypeProductCommon } from "@/common/types/validate";
import { FieldArrayWithId } from "react-hook-form";

import { FaCloudUploadAlt } from "react-icons/fa";

// UI
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  areArraysEqual,
  formatDataLikeFields,
  getUniqueTypesFromFields,
  updateFields,
} from "@/lib/utils";
import VariationValues from "./VariationValues";

const VariationTab = ({
  fields,
  stateAttribute,
  typeFields,
  form,
  attributes,
  replaceFields,
  removeFields,
  duplicate,
}: {
  fields: FieldArrayWithId<Variant>[];
  stateAttribute: State;
  typeFields: string[];
  form: FormTypeProductCommon;
  attributes: Attribute[];
  replaceFields: (fields: Variant[]) => void;
  removeFields: (index: number) => void;
  duplicate: number[];
}) => {
  const [stateSelect, setStateSelect] = useState<string>(
    fields.length ? "create" : ""
  );

  const [previewImages, setPreviewImages] = useState<{
    [key: string]: string | null;
  }>({});

  // Initialize the preview images for the edit scenario
  useEffect(() => {
    const initialImages = fields.reduce((acc, field) => {
      if (field.image) {
        acc[field.id] = field.image; // Use the existing image URL
      }
      return acc;
    }, {} as { [key: string]: string | null });
    setPreviewImages(initialImages);
  }, [fields]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({
        ...prev,
        [id]: imageUrl,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue(`variants.${index}.image`, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (stateSelect === "create") {
      if (stateAttribute.valuesMix.length !== 0) {
        const typesFromReducer = getUniqueTypesFromFields(
          stateAttribute.attributesChoose
        );

        const newFields = areArraysEqual(
          typeFields as string[],
          typesFromReducer as string[]
        )
          ? updateFields(fields, formatDataLikeFields(stateAttribute.valuesMix))
          : formatDataLikeFields(stateAttribute.valuesMix);

        replaceFields(newFields);
      }
    }
  };

  const matchingAttributes = attributes.filter((attribute) =>
    fields.some((field) =>
      field.values.some(
        (productValue: string) =>
          attribute.name === (productValue.type as string)
      )
    )
  );

  console.log(matchingAttributes);

  return (
    <>
      <div className="flex gap-3 border-b pb-3">
        <select
          className="w-2/3"
          value={stateSelect}
          onChange={(e) => setStateSelect(e.target.value)}
        >
          <option value="add">Thêm biến thể</option>
          <option value="create">
            Tạo biến thể từ tất cả thuộc tính đã chọn
          </option>
          <option value="deleteAll">Xóa tất cả</option>
        </select>
        <Button
          type="button"
          className="bg-gray-200 text-black"
          onClick={handleButtonClick}
        >
          Go
        </Button>
      </div>
      <div>
        {fields.map((field, index) => {
          return (
            <div
              className={`py-4 border-b ${
                duplicate.includes(index) ? "border-red-500 border" : ""
              }`}
              key={field.id}
            >
              <Collapsible key={field.id}>
                <div className="flex gap-3 relative">
                  <CollapsibleTrigger className="text-left font-bold w-2/3">
                    #{index + 1}
                  </CollapsibleTrigger>
                  {matchingAttributes?.map((attribute, indx) => {
                    return (
                      <div key={attribute._id}>
                        <select
                          className="w-24 py-1"
                          value={form.watch(
                            `variants.${index}.values.${indx}._id`
                          )} // Sử dụng `value` và theo dõi giá trị
                          {...form.register(
                            `variants.${index}.values.${indx}._id` as const,
                            {
                              onChange: (e) => {
                                form.setValue(
                                  `variants.${index}.values.${indx}._id`,
                                  e.target.value
                                );
                              },
                            }
                          )}
                        >
                          {attribute.values.map((value) => {
                            return (
                              <option key={value._id} value={value._id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>

                        {form.formState.errors.variants && (
                          <p className="text-red-600">
                            {form.formState.errors.variants.message}
                          </p> // Lỗi chung cho variants
                        )}
                      </div>
                    );
                  })}
                </div>
                <CollapsibleContent className="mt-4">
                  <div className="pt-4 border-t">
                    <div className="mt-2 flex border-b border-gray-300 pb-4">
                      <input
                        className={`input-file__${field.id}`}
                        {...form.register(`variants.${index}.image`)}
                        type="file"
                        hidden
                        onChange={(e) => handleImageChange(e, field.id, index)}
                      />

                      {/* Preview Image */}
                      <div
                        onClick={() => {
                          const inputElement = document.querySelector(
                            `.input-file__${field.id}`
                          );
                          if (inputElement) {
                            (inputElement as HTMLInputElement).click();
                          }
                        }}
                        className="h-[100px] w-[100px] border border-dashed border-blue-300 cursor-pointer rounded p-1 flex items-center justify-center"
                      >
                        {previewImages[field.id] ? (
                          <img
                            src={previewImages[field.id] || ""}
                            alt="Preview"
                            className="object-cover w-[90px] h-[90px]"
                          />
                        ) : (
                          <FaCloudUploadAlt className="text-4xl  text-blue-400" />
                        )}
                      </div>
                      <div className="self-end ml-auto">
                        <label className="block">Số lượng tồn kho</label>
                        <input
                          type="text"
                          {...form.register(
                            `variants.${index}.countOnStock` as const
                          )}
                        />
                      </div>
                    </div>

                    <VariationValues
                      form={form}
                      indexValue={index}
                      removeFields={removeFields}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VariationTab;
