import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet";
  
  import { GiHamburgerMenu } from "react-icons/gi";
  
  const NavMobile = () => {
    return (
      <section className="max-w-[264px]">
        <Sheet>
          <SheetTrigger>
            <GiHamburgerMenu className="text-white text-2xl cursor-pointer sm:hidden" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>
    );
  };
  
  export default NavMobile;