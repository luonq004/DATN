import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./_components/SideBar";
import { useUserContext } from "@/common/context/UserProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "./_components/app-sidebar";

const LayoutAdmin = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(true);

  // const { role } = useUserContext();

  useEffect(() => {
    if (!isLoaded) {
      // Chờ đến khi user được tải xong
      return;
    }

    // Kiểm tra quyền truy cập
    if (
      user &&
      (user.publicMetadata.role === "Admin" ||
        user.publicMetadata.role === "Employee")
    ) {
      // Xác nhận quyền truy cập
      setIsAuthorized(true);
    } else {
      navigate("*", { replace: true });
    }
  }, [user, isLoaded, navigate]);

  // Trì hoãn render giao diện khi đang kiểm tra quyền truy cập
  if (!isLoaded || !isAuthorized) {
    return null;
  }

  // console.log("user", user);

  // Nếu đã xác thực quyền truy cập, render giao diện
  return (
    // <div className="bg-white flex min-h-screen">
    //   <Sidebar />
    //   <div className="w-full">
    //     <div className="h-20 bg-red-400"></div>
    //     <div className="bg-slate-300 rounded-lg m-7 min-h-80">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="w-full bg-[#f1f5f9] h-full">
            {/* <div className="h-20 bg-red-400"></div> */}
            <div className="rounded-lg m-7 min-h-80">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutAdmin;
