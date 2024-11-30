import { IProduct } from "@/common/types/Product";
import ActionCell from "@/pages/(dashboard)/product/_components/ActionCell";
import { ColumnDef } from "@tanstack/react-table";

export const columnProducts: ColumnDef<IProduct>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "ID",
  // },
  {
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => {
      const attribute = row.original;

      return (
        <img
          src={attribute.image}
          alt={attribute.name}
          className="w-20 h-20 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  // {
  //   accessorKey: "category",
  //   header: "Category",
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

// {
//   accessorKey: "values",
//   header: "Giá trị",
//   cell: ({ row }) => {
//     const attribute = row.original;

//     return (
//       <div className="flex space-x-2">
//         {Array.isArray(attribute.values) && attribute.values.length > 0 ? (
//           attribute.values.map((value, index) => (
//             <span
//               key={index}
//               className="bg-gray-200 px-2 py-1 rounded"
//               title={value.name}
//             >
//               {value.name}
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">Không có giá trị</span>
//         )}
//       </div>
//     );
//   },
// },
