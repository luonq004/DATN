const services = [
  {
    title: "Discount",
    subtitle: "Loyalty System",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
  {
    title: "24/7",
    subtitle: "Customer Support",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
  {
    title: "Delivery System",
    subtitle: "Whole World",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
  {
    title: "Smart Support",
    subtitle: "For Every Problem",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
  {
    title: "Quality",
    subtitle: "Best Materials",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
  {
    title: "Professional Staff",
    subtitle: "Over 5,000 Employers",
    description:
      "Mollis nec consequat at In feugiat molestie tortor a malesuada etiam a venenatis.",
  },
];

const ChooseTheBest = () => {
  return (
    <div className="flex flex-wrap ">
      {/* choose the best */}
      <div className="max-[991px]:w-full w-1/2">
        <div
          className="block-entry bg-cover bg-center  "
          style={{ backgroundImage: "url(/src/assets/ChooseTheBest.jpg)" }}
        >
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-8/12 mx-auto">
                <div className="h-[700px] max-[991px]:h-auto flex flex-col justify-center items-center text-center">
                  <div className="mb-9 sm:mb-14" />
                  <div className="text-[14px] highlight leading-[22px] text-[rgba(255,_255,_255,_.8)] font-light uppercase mb-2">
                    we offer
                  </div>
                  <h2
                    className="text-[66px] highlight   max-[1199px]:text-[46px] max-[1199px]:leading-[46px] max-[767px]:text-[34px] max-[767px]:leading-[40px]  leading-[70px] font-black uppercase text-white "
                    style={{
                      textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    choose the best
                  </h2>
                  <div className="p-[20px_0] light  title-underline h-[21px] ">
                    <span className="w-[55px]  text-white h-[1px] bg-current inline-block align-top relative"></span>
                  </div>
                  <div
                    className="text-[16px] highlight text-center leading-[24px] text-[rgba(255,255,255,.8)] "
                    style={{
                      textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                    }}
                  >
                    Praesent nec finibus massa. Phasellus id auctor lacus, at
                    iaculis lorem. Donec quis arcu elit. In vehicula purus sem
                  </div>
                  <div className="mb-9 sm:mb-14" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* text right choose the best */}
      <div className="max-[991px]:w-full w-1/2">
        <div className="container px-4 max-[991px]:p-0 mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full  mx-auto">
              <div className=" items-center justify-center h-[700px] min-[1200px]:ml-[16.66666667%] min-[768px]:ml-[8.33333333%] max-[991px]:h-auto flex ">
                <div className="mb-9 sm:mb-14" />
                <div className="container max-[991px]:p-0 min-[991px]:mx-auto">
                  <div className="grid lg:px-0 px-4 sm:grid-cols-2 grid-cols-1 ">
                    {services.map((service, index) => (
                      <div key={index} className="w-full min-[1200px]:w-[80%] p-[15px]">
                        <div className="text-center sm:text-left">
                          <div className="simple-article highlight text-[13px] leading-5 text-[#b8cd06]  font-light uppercase mb-2">
                            {service.title}
                          </div>
                          <h5
                            className="text-[16px] leading-[22px] highlight mb-1 text-[#343434] font-black uppercase"
                            style={{
                              fontFamily: "'Raleway', sans-serif",
                            }}
                          >
                            {service.subtitle}
                          </h5>
                          <div className="text-[13px] highlight leading-5 text-[#888] font-light">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-9 sm:mb-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTheBest;
