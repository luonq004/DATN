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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const Signin = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axios.post(`http://localhost:8080/api/signin`, user);
            localStorage.setItem('user', JSON.stringify(data));
            return data.user;
        },
        onSuccess: () => {
            alert('Dang nhap thanh cong')
        }
    })

    const onSubmit = (user: any) => {
        mutate(user);
        navigate('/')
    };

    return (
        <div className="relative min-h-screen bg-white flex justify-center">
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="p-8 w-[800px] h-auto ">
                    <p className="text-[24px] font-medium text-center mb-6">Đăng nhập tài khoản</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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


                            <Button type="submit" className="w-full">Đăng nhập</Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
