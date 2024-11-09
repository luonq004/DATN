const FeatureCards = () => {
  // Thiết lập màu gradient mặc định
  const defaultGradientColor = "from-green-500 to-lime-400 to-cyan-500";

  const features = [
    {
      title: "ÂM THANH HOÀN HẢO CHO MỌI NGƯỜI",
      subtitle: "ĐÁNG TIN CẬY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar ante et nisl scelerisque.",
      backgroundImage: "https://nguoinoitieng.tv/images/nnt/101/0/bfv9.jpg",
    },
    {
      title: "LỰA CHỌN CỦA CHUYÊN GIA",
      subtitle: "CHẤT LƯỢNG CAO",
      description:
        "Lorem ipsum dolor sirem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar anrem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar ant amet, consectetur adipiscing elit. Praesent pulvinar ante et nisl scelerisque.",
      backgroundImage:
        "https://cdnphoto.dantri.com.vn/Im0W2Oa59BulrmFjQo1dOsDcBZY=/thumb_w/990/2021/10/30/trang-nhungdocx-1635528230350.jpeg",
    },
    {
      title: "CAM KẾT HÀI LÒNG",
      subtitle: "TIỆN LỢI",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar ante et nisl scelerisque.",
      backgroundImage:
        "https://photo.znews.vn/w660/Uploaded/ycgvppwi/2022_08_17/z3649757610090_a1488d39aae272b411f0ac77c027b61d.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-5 pt-20 md:pt-36">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative max-h[100%] lg:h-[650px] flex justify-center items-center rounded-lg overflow-hidden text-center text-white shadow-lg"
          style={{
            backgroundImage: `url(${feature.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Sử dụng màu gradient mặc định trực tiếp */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${defaultGradientColor} opacity-80`}
          ></div>
          <div className="relative z-10 p-8">
            <h5 className="text-sm font-questrial mb-2">{feature.subtitle}</h5>
            <h2 className="text-3xl font-extrabold font-raleway text-[#fff] mb-4">
              {feature.title}
            </h2>
            <div className="flex items-center gap-1 justify-center my-3">
              <span className="h-[1px] w-2 bg-white mb-2"></span>
              <span className="h-[1px] w-12 bg-white mb-2"></span>
              <span className="h-[1px] w-2 bg-white mb-2"></span>
            </div>
            <p className="text-sm mb-6 md:mx-[100px] lg:mx-[0px] line-clamp-3">
              {feature.description}
            </p>

            <button className="group relative px-32 md:px-16 py-6 bg-[#343434] text-[#fff] rounded-full font-semibold overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                TÌM HIỂU THÊM
              </span>
              <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
