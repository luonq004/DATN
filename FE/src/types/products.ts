
export interface Variant {
    _id: string;
    name: string;
}

export interface Review {
    user: string;
    comment: string;
    rating: number;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string; 
    countOnStock: number;
    avatarMain: string;
    price: number;
    description?: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    reviews: Review[];
    variants: Variant[];
}
