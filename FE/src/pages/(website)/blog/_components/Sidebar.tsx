import { categories } from "@/pages/(dashboard)/blog/_components/Categories";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // lấy và cập nhật tham số URL (danh mục và trang)
  const currentCategory = searchParams.get("category");
  const tags = [
    "TAI NGHE",
    "PHỤ KIỆN",
    "MỚI",
    "KHÔNG DÂY",
    "CÁP",
    "THIẾT BỊ",
    "ĐỒ CÔNG NGHỆ",
    "THƯƠNG HIỆU",
    "THAY THẾ",
    "BAO DA",
    "CHUYÊN NGHIỆP",
  ];

  // Hàm xử lý khi click vào danh mục
  const handleCategoryClick = (category: string | null) => {
    if (category) {
      // Nếu category là một giá trị hợp lệ, thêm vào URL
      searchParams.set("category", category);
    } else {
      // Nếu là "Tất cả", xóa tham số category trong URL
      searchParams.delete("category");
    }
    searchParams.set("page", "1"); // Đặt lại trang về 1 khi thay đổi danh mục
    setSearchParams(searchParams); // Cập nhật lại URL
  };

  return (
    <div className="mb-20">
      {/* Main Content Section */}
      <div className="flex uppercase">
        {/* Sidebar Section */}
        <div className="lg:w-80">
          {/* Search Box */}
          <div className="mb-10 relative">
            <input
              type="text"
              placeholder="Nhập từ khóa"
              className="w-full text-xs py-3  pr-10 border border-[#efefef] rounded-full focus:outline-none focus:ring-[#b8cd06] focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <h3 className="mb-4 text-lg font-raleway font-extrabold uppercase text-[#343434]">
              danh mục
            </h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li
                  key={cat.value}
                  className={`text-[#888] text-[11px] font-raleway hover:text-[#b8cd06] cursor-pointer border-b border-[#efefef] pb-4 ${
                    currentCategory === cat.value ? "text-[#b8cd06] font-bold" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat.value)}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="mb-10">
            <h2 className="mb-4 text-[18px] text-[#343434] font-raleway font-extrabold uppercase">
              THẺ PHỔ BIẾN
            </h2>
            <div className="flex flex-col items-start mb-10">
              <div className="lg:w-full h-full mb-4 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src="http://unionagency.one/exzo/img/thumbnail-73.jpg"
                  alt="Popular Tag"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#343434] text-[15px] font-raleway font-extrabold mb-1 cursor-pointer">
                Phasellus Rhoncus in Nunc Sit
              </p>
              <p className="text-[11px] text-gray-500">
                Apr 07 / 15 &nbsp;&bull;&nbsp;{" "}
                <span className="text-[#b8cd06]">John Wick</span>{" "}
                &nbsp;&bull;&nbsp;{" "}
                <span className="text-[#b8cd06]">Gadgets</span>
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="lg:w-full h-full mb-4 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src="http://unionagency.one/exzo/img/thumbnail-74.jpg"
                  alt="Popular Tag"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#343434] text-[15px] font-raleway font-extrabold mb-1 cursor-pointer">
                Phasellus Rhoncus in Nunc Sit
              </p>
              <p className="text-[11px] text-gray-500">
                Apr 07 / 15 &nbsp;&bull;&nbsp;{" "}
                <span className="text-[#b8cd06]">John Wick</span>{" "}
                &nbsp;&bull;&nbsp;{" "}
                <span className="text-[#b8cd06]">Gadgets</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className=" font-raleway text-[18px] font-extrabold text-[#343434] mb-4">
              THẺ PHỔ BIẾN
            </h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f7f7f7] font-raleway text-[10px]  hover:bg-[#b8cd06] hover:text-white cursor-pointer text-[#888] py-[10px] px-3 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
