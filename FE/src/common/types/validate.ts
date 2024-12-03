import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

// Định nghĩa schema cho một đối tượng variant
export const variantSchema = z
  .object({
    _id: z.string().optional(),
    price: z.coerce
      .number({
        message: "Giá phải là số",
      })
      .gte(1, {
        message: "Giá phải lớn hơn hoặc bằng 1",
      }),
    priceSale: z.coerce
      .number({
        message: "Giá giảm giá phải là số",
      })
      .optional(),
    values: z.array(
      z.object({
        _id: z.string(),
        // name: z.string(),
        type: z.string(),
        // value: z.string(),
      })
    ),
    countOnStock: z.coerce.number().gte(1, {
      message: "Số lượng phải lớn hơn hoặc bằng 1",
    }),
    // image: z.string().optional(),
    image: z.union([
      z.string().url().or(z.literal("")), // URL hợp lệ hoặc chuỗi rỗng
      z.instanceof(File).optional(), // File là tùy chọn
    ]),
  })
  .refine(
    (data) => data.priceSale === undefined || data.priceSale < data.price,
    {
      message: "Giá giảm giá phải nhỏ hơn giá thông thường",
      path: ["priceSale"], // Đường dẫn lỗi sẽ chỉ đến priceSale
    }
  );

// Định nghĩa schema cho đối tượng chính
export const productSchema = z.object({
  createdAt: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  deleted: z.boolean().optional(),
  description: z.string().min(1),
  descriptionDetail: z.string().optional(),
  name: z.string().min(1),
  category: z.array(z.string()).optional(),
  image: z.union([
    z.string().url().or(z.literal("")), // URL hợp lệ hoặc chuỗi rỗng
    z.instanceof(File).optional(), // File là tùy chọn
  ]),
  price: z.coerce.number().optional(),
  priceSale: z.coerce.number().optional(),
  // reviews: z.array(z.object({})).optional(), // Cấu trúc cho reviews nếu cần
  updatedAt: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  variants: z.array(variantSchema),
  _id: z.string().optional(),
});

export const productSimpleSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(1),
    category: z.array(z.string()).optional(),
    image: z
      .union([
        z.string().url().or(z.literal("")), // Chấp nhận URL hợp lệ hoặc chuỗi rỗng
        z.instanceof(File), // Chấp nhận đối tượng File
      ])
      .optional(),
    description: z.string().min(1),
    descriptionDetail: z.string().optional(),
    price: z.coerce.number(),
    // countOnStock: z.coerce.number(),
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
