import { Link, NavLink, Outlet } from "react-router-dom";
import logo3 from "../../assets/logo3.jpg";
import { CiHeart, CiBellOn } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import NavMobile from "@/components/NavMobile";
import { ModeToggle } from "@/components/mode-toggle";
import InputSearch from "./details/_components/InputSearch";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { useEffect } from "react";

const LayoutWebsite = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      saveUserToDatabase(user.id);
      console.log(user);
    }
  }, [user]);

  const saveUserToDatabase = async (userId: any) => {
    try {
      if (!userId) {
        console.log(userId);

        console.error("No userId provided");
        return;
      }

      await fetch("http://localhost:8080/users/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId: userId }),
      });
    } catch (error) {
      console.error("Error during saveUserToDatabase:", error);
    }
  };

  const opensignin = async () => {
    await openSignIn({
      redirectUrl: "/",
    });
  };
  const opensignup = async () => {
    await openSignUp({
      redirectUrl: "/",
    });
  };

  return (
    <>
      <header className="bg-black py-3">
        <div className="flex justify-between items-center max-w-[1408px] mx-auto px-4">
          <div className="flex items-center sm:gap-2 lg:gap-10 xl:gap-14">
            <NavMobile />
            <Link to="/">
              <img className="w-28" src={logo3} alt="Logo Fabric Focus" />
            </Link>
            <nav className="hidden lg:flex gap-10 text-white">
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/category">Category</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </nav>
          </div>

          <div className="flex gap-4 items-center">
            <InputSearch />

            <SignedIn>
              <div className="text-2xl flex gap-4 text-white border-r pr-4">
                <div className="relative">
                  <Link to="/wishlist">
                    <CiHeart />
                    <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
                  </Link>
                </div>
                <div className="relative">
                  <Link to="/message">
                    <CiBellOn />
                    <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
                  </Link>
                </div>
                <div className="relative">
                  <IoBagOutline />
                  <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex gap-3 items-center">
                <button
                  onClick={opensignin}
                  className="w-full py-1 px-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-mono rounded-md hover:bg-gradient-to-l transition-all duration-300"
                >
                  Sign In
                </button>
                <Link
                  to="/"
                  onClick={opensignup}
                  className="w-full py-1 px-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-mono rounded-md hover:bg-gradient-to-l transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>

            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-10">
        <div className="max-w-[1408px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-7">
          <div className="max-w-[290px]">
            <Link to="/">
              <img className="w-28" src={logo3} alt="Logo Fabric Focus" />
            </Link>
            <p>
              Take Your Fashion Game to the Next Level with Our StreetWear
              Collection
            </p>
          </div>

          <div className="flex gap-8">
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/company">Company</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/discover">Discover</Link>
              </li>
              <li>
                <Link to="/collaboration">Collaboration</Link>
              </li>
              <li>
                <Link to="/comingsoon">Coming Soon</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/term">Term of Service</Link>
              </li>
              <li>
                <Link to="/policy">Policy Service</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 lg:gap-5 lg:justify-self-end max-w-72 md:max-w-72">
            <h3>Join Our News Collection</h3>

            <form className="pb-1 border-b flex justify-between">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none focus:outline-none focus:border-none text-white placeholder:text-white"
              />
              <button className="text-2xl">→</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LayoutWebsite;
