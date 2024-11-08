import { Link, NavLink, Outlet } from "react-router-dom";

import logo3 from "../../assets/logo3.jpg";

import customer from "@/assets/images/customer.jpg";

import NavMobile from "@/components/NavMobile";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { CiBellOn, CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";

import InputSearch from "./details/_components/InputSearch";

const LayoutWebsite = () => {
  const { openSignIn, openSignUp, signOut } = useClerk();
  const { user } = useUser();
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isBanned, setIsBanned] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (user) {
      checkUserBanStatus(user.id);
      saveUserToDatabase(user.id);
      console.log(user);
    }
  }, [user]);

  const checkUserBanStatus = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
      const data = await response.json();

      if (data && data.clerkData.isBanned) {
        setIsBanned(true);
      } else {
        setIsBanned(false);
      }
    } catch (error) {
      console.error("Error checking ban status:", error);
    }
  };

  const fetchLogo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logo");
      const data = await response.json();

      if (data && data.length > 0) {
        setLogoUrl(data[0].image);
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const saveUserToDatabase = async (userId: any) => {
    try {
      if (!userId) {
        console.log(userId);

        console.error("No userId provided");
        return;
      }

      await fetch("http://localhost:8080/api/users/save-user", {
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

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-black py-3">
        <div className="flex justify-between items-center max-w-[1408px] mx-auto px-4">
          <div className="flex items-center sm:gap-2 lg:gap-10 xl:gap-14">
            <NavMobile />
            <Link to="/">
              <img
                className="w-28"
                src={logoUrl || "fallback_logo.jpg"}
                alt="Logo Fabric Focus"
              />
            </Link>
            <nav className="hidden lg:flex gap-10 text-white ">
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/category">Category</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </nav>
          </div>

          <div className="flex gap-4 items-center">
            {/* input search */}
            <InputSearch />
            {/* End input search */}
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

              <div className="relative flex items-center gap-4">
                {/* Ảnh đại diện của user */}
                <img
                  src={user?.imageUrl || "default_avatar.jpg"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onMouseEnter={() => setIsMenuVisible(true)}
                />

                {/* Menu khi hover vào ảnh */}
                <div
                  className={`absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg w-48 z-50 transition-opacity duration-200 ${
                    isMenuVisible
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  onMouseEnter={() => setIsMenuVisible(true)}
                  onMouseLeave={() => setIsMenuVisible(false)}
                >
                  {/* Mũi tên chỉ vào ảnh đại diện */}
                  <div className="absolute -top-1 right-2 w-6 h-6 bg-white rotate-45 z-10" />

                  <ul className="flex flex-col gap-2 p-4">
                    <li>
                      <Link to="/users" className="hover:text-cyan-500">
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="hover:text-cyan-500">
                        Đơn mua
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-orange-700 text-left w-full hover:text-cyan-500"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
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

      {isBanned && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center relative pt-20">
            <div className="absolute -top-0 mt-2 left-1/2 transform -translate-x-1/2 text-6xl text-red-600">
              ⚠️
            </div>
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Tài khoản của bạn đã bị Khóa!
            </h2>
            <p className="mb-6">
              Vui lòng liên hệ hỗ trợ để biết thêm thông tin!.
            </p>
            <button
              onClick={handleLogout}
              className="py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      <Outlet />

      {/* Footer   */}
      <footer className="bg-black text-white py-8 mt-10">
        <div className="max-w-[1408px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-7">
          <div className="max-w-[290px]">
            <Link to="/">
              <img
                className="w-28"
                src={logoUrl || "fallback_logo.jpg"}
                alt="Logo Fabric Focus"
              />
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
