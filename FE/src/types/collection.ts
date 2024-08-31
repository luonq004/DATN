import { Product } from "./products";


export interface Collection {
    _id: string;
    name: string;
    description?: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
}