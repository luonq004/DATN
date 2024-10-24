import { State, Variant } from "@/common/types/Product";
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
  replaceFields,
  removeFields,
}: {
  fields: FieldArrayWithId<Variant>[];
  stateAttribute: State;
  typeFields: string[];
  form: FormTypeProductCommon;
  replaceFields: (fields: Variant[]) => void;
  removeFields: (index: number) => void;
}) => {
  const [stateSelect, setStateSelect] = useState<string>(
    fields.length ? "create" : ""
  );
  // const [tempSelect, setTempSelect] = useState<string>(
  //   fields.length ? "create" : ""
  // );

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

        console.log(newFields);
        replaceFields(newFields);
      }
    }
  };
  // function findCategoryById(id, categories) {
  //   for (const category of categories) {
  //     for (const value of category.values) {
  //       if (value._id === id) {
  //         return category;
  //       }
  //     }
  //   }
  //   return null; // ID not found
  // }

  // console.log(
  //   findCategoryById(
  //     "66aa5c8d21a88f63c3a19662",
  //     stateAttribute.attributesChoose
  //   ).values
  // );

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
          // console.log(field);
          return (
            <div className=" py-4 border-b" key={field.id}>
              <Collapsible key={field.id}>
                <div className="flex gap-3 relative">
                  <CollapsibleTrigger className="text-left font-bold w-2/3">
                    #{field.id.split("-")[1]}
                  </CollapsibleTrigger>
                  <div>
                    <VariationValues
                      form={form}
                      indexValue={index}
                      field={field}
                    />
                  </div>
                  {stateAttribute.attributesChoose.map((attribute, indx) => {
                    return (
                      <div key={attribute._id}>
                        <select
                          className="w-32 py-1"
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
                              // console.log("VAL: ", value),
                              <option key={value._id} value={value._id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>

                        {/* <input
                          type="text"
                          {...form.register(
                            `variants.${index}.values.${indx}.name` as const
                          )}
                        />
                        <input
                          type="text"
                          {...form.register(
                            `variants.${index}.values.${indx}.value` as const
                          )}
                        />
                        <input
                          type="text"
                          {...form.register(
                            `variants.${index}.values.${indx}.type` as const
                          )}
                        /> */}
                      </div>
                    );
                  })}
                </div>
                <CollapsibleContent className="mt-4">
                  <div className="pt-4 border-t">
                    {/* Input to upload images */}
                    <div
                      className="mt-2 flex flex-col justify-center items-center border border-dashed border-blue-300 h-[100px] w-[100px] cursor-pointer rounded p-1"
                      onClick={() => {
                        const inputElement = document.querySelector(
                          `.input-file__${field.id}`
                        );
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                    >
                      <input
                        className={`input-file__${field.id}`}
                        {...form.register(`variants.${index}.image`)}
                        type="file"
                        hidden
                        onChange={(e) => handleImageChange(e, field.id, index)}
                      />

                      {/* Preview Image */}
                      <div className="flex items-center justify-center">
                        {previewImages[field.id] ? (
                          <img
                            src={previewImages[field.id] || ""}
                            alt="Preview"
                            className="object-cover w-[90px] h-[90px]"
                          />
                        ) : (
                          <FaCloudUploadAlt className="text-4xl text-blue-400" />
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      // {...form.register(`variants.${index}.price` as const)}
                      {...form.register(`variants.${index}.price` as const)}
                      className={
                        form.formState.errors?.variants?.[index]?.price
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <span>
                      {form.formState.errors?.variants?.[index]?.price?.message}
                    </span>

                    {/* <input
                      type="text"
                      {...form.register(
                        `variants.${index}.values.${index}.name` as const
                      )}
                    /> */}

                    {/* <input type="text" {...form.register("test")} /> */}
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
