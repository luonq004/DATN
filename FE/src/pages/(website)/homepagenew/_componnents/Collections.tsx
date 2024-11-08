const slidesData = [
  {
    title: "YOUR PERFECT SOUND",
    subtitle: "RELAX COLLECTION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentir pulvinar ante et nisl scelerisque.",
    image:
      "https://blog.btaskee.com/wp-content/uploads/2018/08/chup-hinh-dep-e1534849946134.jpg",
  },
  {
    title: "NOISE IS NOT A PROBLEM",
    subtitle: "STREET COLLECTION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentir pulvinar ante et nisl scelerisque.",
    image:
      "https://studiovietnam.com/wp-content/uploads/2022/10/gia-thue-mau-chup-anh-quan-ao-05-1.jpg",
  },
];

const Collections = () => {
  return (
    <div className="flex justify-center items-center w-full h-[650px] sm:h-[480px]">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className="relative flex items-center justify-start bg-cover bg-center h-full overflow-hidden"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 px-8 md:px-14 text-white max-w-lg">
              <h5 className="text-xs md:text-sm text-slate-200 uppercase mb-2 tracking-wide">
                {slide.subtitle}
              </h5>
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <div className="flex items-center gap-1 mb-4">
                <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
                <span className="h-[1px] w-12 bg-[#b8cd06] mb-2"></span>
              </div>
              <p className="mb-6 text-sm text-slate-200">{slide.description}</p>

              <button className="group relative px-40 py-6 md:px-16 md:py-6 text-xs md:text-sm bg-slate-100 text-gray-600 rounded-full font-semibold overflow-hidden">
                <span className="absolute text-xs top-4 left-28 md:top-4 md:left-7 transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                  LEARN MORE
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
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
    </div>
  );
};

export default Collections;
