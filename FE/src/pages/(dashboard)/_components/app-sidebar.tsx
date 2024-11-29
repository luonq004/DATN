"use client"

import * as React from "react"
import Logo from "@/assets/logo_no_text.png"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import {
    File,
    Grip,
    LayoutDashboard,
    LayoutPanelLeft,
    Settings,
    ShoppingCart,
    User,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useUser } from "@clerk/clerk-react";

// This is sample data.
// const { user } = useUser();
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
            isActive: false,
        },
        {
            title: "Products",
            url: "#",
            icon: File,
            items: [
                {
                    title: "List",
                    url: "/admin/products",
                },
                {
                    title: "Add",
                    url: "/admin/products/add",
                },
                {
                    title: "Fix",
                    url: "/admin/products/fix",
                },
            ],
        },
        {
            title: "Categories",
            url: "/admin/categories",
            icon: LayoutPanelLeft,
        },
        {
            title: "Attributes",
            url: "/admin/attributes",
            icon: Grip,
        },
        {
            title: "Orders",
            url: "/admin/orders",
            icon: ShoppingCart,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: User,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser();
    const dataUser = React.useMemo(() => {
        return {
            name: user?.fullName || "Admin",
            avatar: user?.imageUrl || "https://github.com/shadcn.png",
            email: user?.primaryEmailAddress?.emailAddress || "admin@gmail.com"
        }
    }, [user])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 p-1 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <img src={Logo} alt="Logo" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">FabricFocus</span>
                                    <span className="truncate text-xs">Quản trị</span>
                                </div>
                            </a>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={dataUser} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
