import {
  Attribute,
  Data,
  IProduct,
  Value,
  Variant,
} from "@/common/types/Product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

// ===================================================================

export function getUniqueTypes(product: IProduct) {
  const types = new Set(); // Sử dụng Set để đảm bảo không có giá trị trùng lặp

  // Duyệt qua tất cả các biến thể (variants) của sản phẩm
  product?.variants?.forEach((variant) => {
    // Duyệt qua tất cả các giá trị (values) trong mỗi biến thể
    variant.values.forEach((value) => {
      types.add(value.type); // Thêm type vào Set
    });
  });

  return Array.from(types); // Chuyển Set về mảng và trả về
}

export function getUniqueTypesFromFields(fields: Variant[] | Attribute[]) {
  const types = new Set(); // Sử dụng Set để đảm bảo không có giá trị trùng lặp

  // Duyệt qua tất cả các biến thể (variants) của sản phẩm
  fields.forEach((field) => {
    // Duyệt qua tất cả các giá trị (values) trong mỗi biến thể
    field.values.forEach((value) => {
      types.add(value.type); // Thêm type vào Set
    });
  });

  return Array.from(types); // Chuyển Set về mảng và trả về
}

// Check array equal
// Example: areArraysEqual([1, 2, 3], [2, 1, 3]) => true
export function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item) => arr2.includes(item));
}

export function getUniqueAttributeValue(product: IProduct): Data[][] {
  return product.variants.reduce<Data[][]>((acc, variant) => {
    variant.values.forEach((item: Value) => {
      const { type, value } = item;

      // Tìm mảng tương ứng với từng type trong acc
      let existingTypeArray: Data[] | undefined = acc.find(
        (arr) => arr.length > 0 && arr[0].type === type
      );

      if (!existingTypeArray) {
        existingTypeArray = [];
        acc.push(existingTypeArray);
      }

      // Kiểm tra xem giá trị value đã tồn tại trong mảng chưa
      if (
        !existingTypeArray.some((existingItem) => existingItem.value === value)
      ) {
        // console.log("VALUE: ", item);
        const revalidateItem = {
          value,
          label: item.name,
          _id: item._id,
          type,
        };

        existingTypeArray.push(revalidateItem);
      }
    });
    return acc;
  }, []);
}

export function getSelectedValues(
  valueAttributeProduct: Data[][],
  attribute: Attribute[]
) {
  return attribute.reduce((acc, attribute, index) => {
    const matchedValues = valueAttributeProduct[index]; // Lấy các giá trị tương ứng từ array1 theo index
    if (matchedValues) {
      acc[attribute._id] = matchedValues; // Gán mảng giá trị từ array1 vào acc với khóa là _id của attribute
    }
    return acc;
  }, {} as Record<string, (typeof valueAttributeProduct)[0]>);
}

export function formatDataLikeFields(valeMix: Data[][]) {
  return valeMix.map((group) => ({
    price: 0,
    values: group.map((item) => ({
      _id: item._id,
      name: item.label,
      type: item.type,
      value: item.value,
    })),
    countOnStock: 0,
    image: "",
    deleted: false,
    // id: crypto.randomUUID(), // Tạo id ngẫu nhiên cho mỗi phần tử
  }));
}

// ====================
const isMatch = (values1: Value[], values2: Value[]) => {
  return values2.every((value2) =>
    values1.some(
      (value1) =>
        value1._id === value2._id &&
        value1.type === value2.type &&
        value1.value === value2.value
    )
  );
};

// Tạo mảng 2 mới bằng cách thay thế các object nếu tìm thấy trùng trong mảng 1
export function updateFields(array1: Variant[], array2: Variant[]) {
  return array2.map((item2) => {
    const matchingItem = array1.find((item1) =>
      isMatch(item1.values, item2.values)
    );

    // Nếu tìm thấy item trùng trong array1, thay thế, nếu không, giữ nguyên item2
    return matchingItem ? matchingItem : item2;
  });
}

// Check trùng values
export const checkForDuplicateVariants = (data: IProduct) => {
  const variantSet = new Map<string, number>(); // Lưu vị trí của từng variant key
  const duplicateIndices: number[] = []; // Lưu vị trí của các biến thể bị trùng

  data.variants.forEach((variant, index) => {
    // Tạo khóa duy nhất dựa trên các thuộc tính chính
    const variantKey = variant.values
      .map((valueObj) => `${valueObj.type}:${valueObj._id}`)
      .join("|");

    if (variantSet.has(variantKey)) {
      // Nếu trùng, thêm vị trí hiện tại vào duplicateIndices
      duplicateIndices.push(index);
    } else {
      // Nếu không trùng, lưu vị trí hiện tại vào variantSet
      variantSet.set(variantKey, index);
    }
  });

  return duplicateIndices; // Trả về mảng vị trí của các biến thể bị trùng
};

//

export const extractAttributes = (variants: any) => {
  const attributes: any = {};

  variants.forEach((variant) => {
    variant.values.forEach((value) => {
      const type = value.type;
      if (!attributes[type]) {
        attributes[type] = new Set();
      }
      attributes[type].add(`${value._id}:${value.value}`);
    });
  });

  // Chuyển đổi Set thành Array cho mỗi thuộc tính
  Object.keys(attributes).forEach((key) => {
    attributes[key] = Array.from(attributes[key]);
  });

  return attributes;
};

export const filterAndFormatAttributes = (
  product: IProduct,
  type: string,
  value: string
) => {
  const filteredVariants = product.variants.filter((variant) =>
    variant.values.some((attr) => attr.type === type && attr._id === value)
  );

  const result: Record<string, string[]> = {};

  filteredVariants.forEach((variant) => {
    variant.values.forEach((attr) => {
      if (attr.type !== type) {
        if (!result[attr.type]) {
          result[attr.type] = [];
        }
        if (!result[attr.type].includes(attr._id)) {
          result[attr.type].push(attr._id);
        }
      }
    });
  });

  return result;
};
