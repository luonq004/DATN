import { FormTypeProductCommon } from "@/common/types/validate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ProductImage = ({ form }: { form: FormTypeProductCommon }) => {
  const [previewImagesMain, setPreviewImagesMain] = useState<string | File>(
    form.getValues("image") || ""
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagesMain(reader.result as string); // Cập nhật preview với ảnh mới
      };
      reader.readAsDataURL(file);
      form.setValue("image", file); // Cập nhật giá trị ảnh trong form
    }
  }

  return (
    <Accordion className="bg-white border px-4" type="multiple">
      <AccordionItem className="border-none" value="item-2">
        <AccordionTrigger className="no-underline">
          Ảnh sản phẩm
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-2 flex">
            <input
              className="input-file__image"
              {...form.register("image")}
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </div>

          {/* Preview Image */}
          <div
            onClick={() => {
              const inputElement = document.querySelector(".input-file__image");
              if (inputElement) {
                (inputElement as HTMLInputElement).click();
              }
            }}
            className="w-full min-h-48 max-h-48 border border-dashed border-blue-300 cursor-pointer rounded p-1 flex items-center justify-center overflow-hidden"
          >
            {previewImagesMain ? (
              <img
                src={
                  typeof previewImagesMain === "string" ? previewImagesMain : ""
                }
                alt="Preview"
                className="object-cover"
              />
            ) : (
              <FaCloudUploadAlt className="text-4xl text-blue-400" />
            )}
          </div>

          <p
            className="mt-2 text-red-500 underline cursor-pointer"
            onClick={() => {
              form.setValue("image", "");
              setPreviewImagesMain("");
            }}
          >
            Xóa ảnh
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductImage;
