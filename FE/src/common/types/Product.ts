export interface IProduct {
  _id: string;
  name: string;
  category: string[];
  price: number;
  description: string;
  image: string;
  // status: "pending" | "processing" | "success" | "failed";
}

export interface IProduct2 {
  _id: string;
  name: string;
  category: string[];
  price: number;
  description: string;
  image: string;
  reviews: string[];
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  variants: [
    {
      _id: string;
      countOnStock: number;
      price: number;
      deleted: boolean;
      image: string;
      values: [];
    }
  ];
}
