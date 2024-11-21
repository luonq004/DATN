<<<<<<< HEAD:FE/src/types/User.ts
export interface User {
  _id?: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    email: string;
    Address:string;
    role: string;
    phone: string;
    gender: string;
    isActive: string;
    paymentInfo: string;
    orders:string;
    isBanned: boolean;
    
=======
export interface User {
    clerkId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    email: string;
    Address:string;
    role: string;
    phone: string;
    gender: string;
    isActive: string;
    isDeleted:string
    paymentInfo: string;
    orders:string;
    isBanned: boolean;
    
>>>>>>> 4ea154dd7d2fc66dbf8622859ef5603e8db6b77c:FE/src/common/types/User.ts
  }