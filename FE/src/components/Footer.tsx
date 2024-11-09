import logo from "@/assets/logo3.png";
import imageFoot1 from "@/assets/img/Footer/foot1.jpeg";
import imageFoot2 from "@/assets/img/Footer/foot2.jpeg";

const Footer = () => {
  const quickLinks = [
    "Trang Chủ",
    "Giới Thiệu",
    "Sản Phẩm",
    "Dịch Vụ",
    "Blog",
    "Thư Viện",
    "Liên Hệ",
    "Chính Sách Bảo Mật",
    "Bảo Hành",
    "Đăng Nhập",
    "Đăng Ký",
    "Giao Hàng",
    "Trang",
    "Cửa Hàng",
  ];

  const posts = [
    {
      title: "Fusce tincidunt accumsan giá trị tại đây",
      date: "07 Tháng 4 / 15",
      imgSrc: imageFoot1,
    },
    {
      title: "Fusce tincidunt accumsan giá trị tại đây",
      date: "07 Tháng 4 / 15",
      imgSrc: imageFoot2,
    },
    {
      title: "Fusce tincidunt accumsan giá trị tại đây",
      date: "07 Tháng 4 / 15",
      imgSrc: imageFoot1,
    },
  ];
  const tags = [
    "Tai Nghe",
    "Phụ Kiện",
    "Mới",
    "Không Dây",
    "Cáp",
    "Thiết Bị",
    "Đồ Công Nghệ",
    "Thương Hiệu",
    "Thay Thế",
    "Bao Da",
    "Chuyên Nghiệp",
  ];

  const paymentMethods = [
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfECtHBI6QcuMYWSx8tTwXsAm9kne2DvLMUg&s",
      link: "#skrill",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      link: "#bitcoin",
    },
    {
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
      link: "#paypal",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
      link: "#mastercard",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
      link: "#visa",
    },
  ];

  return (
    <footer className="bg-gray-800 text-xs text-gray-400 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Thông Tin Công Ty */}
        <div>
          <img src={logo} className="w-32 mb-3" alt="Logo" />
          <p>
            Vị trí và tư thế được thiết lập để nâng cao hiệu quả. Hãy duy trì tư
            thế vững vàng, tập trung vào vị trí để đạt được kết quả tốt nhất.
          </p>

          <ul className="mt-4 space-y-8">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fill-rule="evenodd"
                  d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                  clip-rule="evenodd"
                />
              </svg>
              <a
                href="tel:+3625551238745"
                className="hover:text-[#b8cd06] cursor-pointer"
              >
                CONTECT US: +3 (625) 555 123 8745
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>

              <a
                href="mailto:office@exzo.com"
                className="hover:text-[#b8cd06] cursor-pointer"
              >
                EMAIL: office@exzo.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <a
                href="#location"
                className="hover:text-[#b8cd06] cursor-pointer"
              >
                ADDRESS: 1st, New York, USA
              </a>
            </li>
          </ul>
        </div>

        {/* Liên Kết Nhanh */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Liên Kết Nhanh
          </h3>
          <div className="grid grid-cols-2 gap-x-2">
            <ul className="space-y-5">
              {quickLinks.slice(0, 7).map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-[#b8cd06] cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-5">
              {quickLinks.slice(7).map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-[#b8cd06] cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Một Số Bài Viết */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Một Số Bài Viết
          </h3>
          <ul className="space-y-5 ">
            {posts.map((post, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img
                  src={post.imgSrc}
                  alt="Ảnh Bài Viết"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p>{post.date}</p>
                  <p className="hover:text-[#b8cd06]">{post.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Thẻ Phổ Biến */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Thẻ Phổ Biến
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 hover:bg-[#b8cd06] hover:text-white cursor-pointer text-gray-300 py-2 px-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="border-t border-gray-700 mt-8 pt-8">
        <div className="max-w-7xl gap-5 mx-auto flex flex-col md:flex-row items-center justify-between text-xs">
          <p>
            © 2015 Bản quyền thuộc về. Phát triển bởi{" "}
            <a
              href="https://unionagency.com"
              className="text-green-400 hover:text-white"
            >
              Union Agency
            </a>
          </p>

          <div className="flex space-x-4 ">
            <a
              href="#facebook"
              className="hover:text-gray-500 text-gray-400 bg-gray-700 p-3 rounded-full flex items-center justify-center w-10 h-10"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="#twitter"
              className="hover:text-gray-500 text-gray-400 bg-gray-700 p-3 rounded-full flex items-center justify-center w-10 h-10"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="#linkedin"
              className="hover:text-gray-500 text-gray-400 bg-gray-700 p-3 rounded-full flex items-center justify-center w-10 h-10"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="#google"
              className="hover:text-gray-500 text-gray-400 bg-gray-700 p-3 rounded-full flex items-center justify-center w-10 h-10"
            >
              <i className="fab fa-google-plus-g" />
            </a>
            <a
              href="#pinterest"
              className="hover:text-gray-500 text-gray-400 bg-gray-700 p-3 rounded-full flex items-center justify-center w-10 h-10"
            >
              <i className="fab fa-pinterest" />
            </a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {paymentMethods.map((method, index) => (
              <a key={index} href={method.link} className="hover:opacity-80">
                <img
                  src={method.imgSrc}
                  alt="Payment Method"
                  className="w-10 h-6 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
