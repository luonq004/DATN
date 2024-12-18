export interface User {
  _id?: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  Address: string;
  role: string;
  phone: string;
  gender: string;
  password?: string;
  isActive?: string;
  paymentInfo: string;
  orders: string;
  isBanned: boolean;
  isDeleted: boolean;
}
