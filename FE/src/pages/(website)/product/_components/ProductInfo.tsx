import { IProduct } from "@/common/types/Product";
import {
  extractAttributes,
  filterAndFormatAttributes,
  formatCurrency,
} from "@/lib/utils";
import React, { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import ButtonQuantity from "./ButtonQuantity";

import Attributes from "./Attributes";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [attributesChoose, setAttributesChoose] = useState<
    Record<string, string[]>
  >({});
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const [quantity, setQuantity] = useState(1);

  const attributesProduct = Object.entries(
    extractAttributes(product.variants || [])
  ) as [string, string[]][];

  const handleAttributeSelect = (type: string, value: string) => {
    setSelectedAttributes((prev) => {
      const newSelected = { ...prev };

      if (type in newSelected) {
        if (newSelected[type] === value) {
          delete newSelected[type];
        } else {
          newSelected[type] = value;
        }
      } else {
        newSelected[type] = value;
      }

      return newSelected;
    });

    const attributeSelected = filterAndFormatAttributes(product, type, value);

    setAttributesChoose((prev) => {
      const newSelected = { ...prev };

      Object.keys(attributeSelected).forEach((key) => {
        const newValue = attributeSelected[key];

        if (newSelected[key]) {
          if (
            newValue.length === newSelected[key][0].length &&
            newValue.every(
              (value, index) => value === newSelected[key][0][index]
            )
          ) {
            delete newSelected[key];
          } else {
            newSelected[key] = [newValue];
          }
        } else {
          newSelected[key] = [newValue];
        }
      });

      return newSelected;
    });
  };

  const variantChoose =
    Object.entries(selectedAttributes).length ===
    product?.variants[0].values.length
      ? product?.variants.find((variant) =>
          variant.values.every((values) =>
            Object.entries(selectedAttributes).some(([key, value]) => {
              return key === values.type && values._id === value;
            })
          )
        )
      : null;

  return (
    <div>
      <h2 className="text-3xl leading-8 uppercase font-black font-raleway text-[#343434] mb-[25px]">
        {product.name}
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mb-[25px] overflow-hidden">
        <span className="uppercase text-lg text-[#555]">
          giá:{" "}
          <span className="text-[#b8cd06]">
            {variantChoose
              ? formatCurrency(variantChoose?.price)
              : formatCurrency(product?.price ?? 0)}{" "}
            VNĐ
          </span>
        </span>

        {/* Star Rating */}
        <div className="flex gap-0.5 pl-1 mb-[25px] md:mb-0">
          <TiStarFullOutline className="text-[#b8cd06]" />
          <TiStarFullOutline className="text-[#b8cd06]" />
          <TiStarFullOutline className="text-[#b8cd06]" />
          <TiStarFullOutline className="text-[#b8cd06]" />
          <TiStarFullOutline className="text-gray-300" />
          <span className="text-[13px] text-[#888] leading-5">
            128 Đánh giá
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#888] leading-[22px] mb-[30px]">
        {product.description}
      </p>

      {/* Attributes */}
      <Attributes
        attributes={attributesProduct}
        attributesChoose={attributesChoose}
        onAttributeSelect={handleAttributeSelect}
      />

      {/* Quantity  */}
      {/* Thieu add to cart */}
      <ButtonQuantity quantity={quantity} setQuantity={setQuantity} />
    </div>
  );
};

export default ProductInfo;
