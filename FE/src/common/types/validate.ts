import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Định nghĩa schema cho một đối tượng variant
export const variantSchema = z
  .object({
    price: z.coerce.number().gte(1, {
      message: "Price must be at least 0 VND.",
    }),
    priceSale: z.coerce.number().optional(),
    values: z.array(
      z.object({
        _id: z.string(),
        name: z.string(),
        type: z.string(),
        value: z.string(),
      })
    ),
    countOnStock: z.coerce.number(),
    image: z.string(),
    deleted: z.boolean(),
  })
  .refine(
    (data) => data.priceSale === undefined || data.priceSale < data.price,
    {
      message: "Giá giảm giá phải nhỏ hơn giá thông thường",
      path: ["priceSale"], // Đường dẫn lỗi sẽ chỉ đến priceSale
    }
  );

// Định nghĩa schema cho đối tượng chính
export const productSchema = z
  .object({
    createdAt: z.string().transform((val) => new Date(val)),
    deleted: z.boolean(),
    description: z.string().min(1),
    name: z.string().min(1),
    price: z.coerce.number(),
    priceSale: z.coerce.number().optional(),
    reviews: z.array(z.object({})), // Cấu trúc cho reviews nếu cần
    updatedAt: z.string().transform((val) => new Date(val)),
    // variants: z.string(), // Mảng các variants tuân theo schema variant
    variants: z.array(variantSchema), // Mảng các variants tuân theo schema variant
    // slug: z.string().min(1),
    // __v: z.number(),
    // _id: z.string(),
  })
  .refine(
    (data) => data.priceSale === undefined || data.priceSale < data.price,
    {
      message: "Giá giảm giá phải nhỏ hơn giá thông thường",
      path: ["priceSale"], // Đường dẫn lỗi sẽ chỉ đến priceSale
    }
  );

export const productSimpleSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number(),
    priceSale: z.coerce.number().optional(),
  })
  .refine(
    (data) => data.priceSale === undefined || data.priceSale < data.price,
    {
      message: "Giá giảm giá phải nhỏ hơn giá thông thường",
      path: ["priceSale"], // Đường dẫn lỗi sẽ chỉ đến priceSale
    }
  );

export type FormTypeProductSimple = UseFormReturn<
  z.infer<typeof productSimpleSchema>
>;

export type FormTypeProductVariation = UseFormReturn<
  z.infer<typeof productSchema>
>;

export type FormTypeProductCommon = UseFormReturn<
  z.infer<typeof productSimpleSchema> & Partial<z.infer<typeof productSchema>>
>;
