import { Data, IProduct2, Value } from "@/common/types/Product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueTypes(product: IProduct2) {
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

export function getUniqueAttributeValue(product: IProduct2): Data[][] {
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

// const array1 = [
//   [
//     {
//       value: '#1b67ea',
//       label: 'Blue',
//       _id: '66aa5c8d21a88f63c3a19662',
//       type: 'Color',
//     },
//     {
//       value: '#f05252',
//       label: 'Red',
//       _id: '66aa5c9721a88f63c3a19666',
//       type: 'Color',
//     },
//   ],
//   [
//     {
//       value: 'm',
//       label: 'M',
//       _id: '66aa5caf21a88f63c3a1966e',
//       type: 'Size',
//     },
//     {
//       value: 's',
//       label: 'S',
//       _id: '66aa5cb621a88f63c3a19672',
//       type: 'Size',
//     },
//     {
//       value: 'xl',
//       label: 'XL',
//       _id: '66aa5ca821a88f63c3a1966a',
//       type: 'Size',
//     },
//   ],
// ];

// const array2 = [
//   {
//     _id: '6697fcd487ab9b1763829b7b',
//     name: 'Color',
//     values: [
//       {
//         _id: '66aa5c8d21a88f63c3a19662',
//         name: 'Blue',
//         type: 'Color',
//         value: '#1b67ea',
//       },
//       {
//         _id: '66aa5c9721a88f63c3a19666',
//         name: 'Red',
//         type: 'Color',
//         value: '#f05252',
//       },
//     ],
//   },
//   {
//     _id: '6699ce561174ba56977e01f5',
//     name: 'Size',
//     values: [
//       {
//         _id: '66aa5ca821a88f63c3a1966a',
//         name: 'XL',
//         type: 'Size',
//         value: 'xl',
//       },
//       {
//         _id: '66aa5caf21a88f63c3a1966e',
//         name: 'M',
//         type: 'Size',
//         value: 'm',
//       },
//       {
//         _id: '66aa5cb621a88f63c3a19672',
//         name: 'S',
//         type: 'Size',
//         value: 's',
//       },
//     ],
//   },
//   {
//     _id: '66a35bf6ac516ed46cc934a6',
//     name: 'Material',
//     values: [
//       {
//         _id: '66aa5cd121a88f63c3a19676',
//         name: 'Wooden',
//         type: 'Material',
//         value: 'wooden',
//       },
//       {
//         _id: '66aa5cec21a88f63c3a19684',
//         name: 'Iron',
//         type: 'Material',
//         value: 'iron',
//       },
//     ],
//   },
// ];

// // Tạo đối tượng kết quả dựa trên array2
// const result = array2.reduce((acc, attribute, index) => {
//   const matchedValues = array1[index]; // Lấy các giá trị tương ứng từ array1 theo index
//   if (matchedValues) {
//     acc[attribute._id] = matchedValues; // Gán mảng giá trị từ array1 vào acc với khóa là _id của attribute
//   }
//   return acc;
// }, {} as Record<string, typeof array1[0]>);

// console.log(result);
