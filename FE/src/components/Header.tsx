import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "toggle-menu-top-item"
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header >
      <div className="bg-zinc-800">
        <div className="container text-[18px] mx-auto flex items-center justify-between py-1.5">
          <button className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <svg
              id="toggle-menu-top-item"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <nav className="">
            <ul
              ref={menuRef}
              id="menu-top-item"
              className={`py-3 ${
                menuVisible ? "block" : "hidden"
              } lg:flex lg:items-center lg:justify-center lg:space-x-9 text-[#46494F]`}
            >
              <li>
                <a
                  href="#"
                  className="text-white flex items-center ct-menu-top-item"
                >
                  HOT
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ct-menu-top-item">
                  Collaboration
                </a>
              </li>
              <li>
                <a href="#" className="text-white ct-menu-top-item">
                  Coming Soon
                </a>
              </li>
              <li>
                <a href="#" className="text-white ct-menu-top-item">
                  Discount
                </a>
              </li>
              <li>
                <a href="#" className="text-white ct-menu-top-item">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-white ct-menu-top-item">
                  Contact
                </a>
              </li>
              <li></li>
            </ul>
          </nav>
          <div className="flex items-center text-white ct-menu-top-item">
            <a href="#" className="ml-2 ct-menu-top-item">
              EN
            </a>
            <span className="mx-1 ct-menu-top-item">|</span>
            <a href="#">ID</a>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 py-4 lg:border-b ">
        <div className="container items-center">
          <div className="mx-auto flex items-center justify-between flex-wrap">
            <div className="basis-2/8 flex items-center space-x-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>

              <div className="text-white text-xl lg:text-[33px]">Pesion</div>
            </div>

            <div className="basis-1/8 w-full flex order-3 lg:order-2 lg:mt-0 pt-4 lg:w-auto lg:pt-0 lg:border-0">
              <div className="flex text-white items-center text-[20px]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
                <a className="lg:text-[22px] text-[20px]" href="">
                  Jakarta, Indonesia
                </a>
              </div>
            </div>

            <form
              action=""
              className="basis-4/8 justify-end w-full flex order-3 lg:order-2 border-t mt-5 lg:mt-0 border-neutral-400 pt-4 lg:w-auto lg:pt-0 lg:border-0"
            >
              <div className="relative flex w-full items-center border rounded-full">
                <input
                  type="text"
                  className="py-4 pl-10 pr-0 text-white rounded-full lg:w-[400px] bg-zinc-900 w-auto"
                  placeholder="Search product..."
                />
                <div className="absolute inset-y-0 right-5 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-10 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>
            </form>

            <div className="basis-2/8 flex order-2 lg:order-3 items-center lg:gap-3 gap-1 text-white lg:w-auto">
              <button className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="lg:size-6 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                <span className="text-[9px] absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-white">
                  1
                </span>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="lg:size-6 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>

              <button className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="lg:size-6 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span className="text-[9px] absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-white">
                  1
                </span>
              </button>
              <span className="text-slate-400 text-[20px] lg:text-[23px]">
                |
              </span>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="lg:size-9 size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
