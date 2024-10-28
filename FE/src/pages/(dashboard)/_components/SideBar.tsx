import { useState } from "react";

import {
  ChevronRight,
  File,
  Grip,
  LayoutDashboard,
  LayoutPanelLeft,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Nav } from "@/components/ui/nav";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button
          className=" rounded-full p-2"
          variant="secondary"
          onClick={toggleSidebar}
        >
          <ChevronRight />
        </Button>
      </div>

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Products",
            href: "/dashboard/products",
            icon: File,
            variant: "ghost",
          },
          {
            title: "Categories",
            href: "/dashboard/categories",
            icon: LayoutPanelLeft,
            variant: "ghost",
          },
          {
            title: "Attributes",
            href: "/dashboard/attributes",
            icon: Grip,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Users",
            href: "/dashboard/users",
            icon: User,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;