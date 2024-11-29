"use client";

import { FolderClock, List, User, ShoppingCart, Save, Car, LogOut, ShoppingBag } from "lucide-react";
import SidebarItem from "./SidebarItem";

const routes = [
    {
        icon: FolderClock,
        label: "Thống kê",
        href: "/admin/",
    },
    {
        icon: User,
        label: "Khách hàng",
        href: "/admin/categories",
    },
    {
        icon: List,
        label: "Sản phẩm",
        href: "/admin/products",
    },
    {
        icon: Save,
        label: "Danh mục",
        href: "/admin/categories",
    },
    {
        icon: ShoppingBag,
        label: "Đặt hàng",
        href: "/admin/products",
    },
    {
        icon: ShoppingCart,
        label: "Giỏ hàng",
        href: "/admin/categories",
    },
    {
        icon: Car,
        label: "Vận chuyển",
        href: "/admin/categories",
    }
];

const SidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};

export default SidebarRoutes;