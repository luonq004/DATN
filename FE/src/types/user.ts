export interface User {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    role?: 'admin' | 'member';
    isActive?: boolean;
    imageUrl?: string;
    accessToken: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface UpdateUserData {
    id: string;
    user: Partial<User>;
}
