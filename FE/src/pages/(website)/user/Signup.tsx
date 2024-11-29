import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input"; // Đảm bảo import Input component

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const Signup = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (user) => {
            return await axios.post(`http://localhost:8080/api/signup`, user);
        },
        onSuccess: () => {
            alert('Đăng kí thành công');
            queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const onSubmit = (user: any) => {
        mutate(user);
        navigate(`/signin`);
    };

    return (
        <div className="relative min-h-screen bg-white flex justify-center">
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="p-8 w-[800px] h-auto bg-white shadow-md rounded-lg">
                    <p className="text-[24px] font-medium text-center mb-6">Đăng kí tài khoản</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Đăng kí</Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">hoặc</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-3">
                                <Button className="bg-red-600 w-[360px] flex items-center justify-center space-x-4 hover:bg-red-500">
                                    <i className="fab fa-google text-white text-xl"></i>
                                    <span className="text-white">Tiếp tục với Google</span>
                                </Button>
                                <Button className="bg-blue-600 w-[360px] flex items-center justify-center space-x-4 hover:bg-blue-500">
                                    <i className="fab fa-facebook-f text-white text-xl"></i>
                                    <span className="text-white">Tiếp tục với Facebook</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
