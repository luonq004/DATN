// export interface IProduct {
//   _id: string;
//   name: string;
//   category: string[];
//   price: number;
//   description: string;
//   image: string;
//   // status: "pending" | "processing" | "success" | "failed";
// }

export interface IProduct {
  _id: string;
  name: string;
  type: string;
  category: string[];
  countOnStock: number;
  price: number;
  description: string;
  image: string;
  reviews: string[];
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  variants: Variant[];
  comments: {
    _id: string;
    userId: string;
    content: string;
    rating: number;
    createdAt: Date;
  };
}

export interface Variant {
  _id?: string;
  price: number;
  priceSale?: number;
  values: {
    _id: string;
    name: string;
    type: string;
    value: string;
  }[];
  countOnStock: number;
  image: string;
  deleted: boolean;
}

export interface Value {
  _id: string;
  name: string;
  type: string;
  value: string;
}

export interface Attribute {
  _id: string;
  name: string;
  values: {
    _id?: string;
    name: string;
    type: string;
    value: string;
  }[];
}

export interface Data {
  _id: string;
  value: string;
  label: string;
  type: string;
}

export interface State {
  attributesChoose: Attribute[];
  valuesChoose: Data[][];
  valuesMix: Data[][];
}

export type Action =
  | { type: "ADD_ATTRIBUTE"; payload: Attribute } // payload chắc chắn là Attribute
  | { type: "ADD_VALUE"; payload: Data[] } // payload là mảng Data[]
  | { type: "DELETE_ONE_VALUE"; payload: string }
  | { type: "MIX_VALUES" }
  | { type: "CLEAR_VALUES" }
  | { type: "DELETE_INDEX_MIX_VALUE"; payload: number }
  | { type: "CLEAR" };
