const OurServices = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed fixed-background"
      style={{ backgroundImage: "url(/src/assets/OurServices.jpg)" }}
    >
      {/*our services */}
      <div className="container px-4 relative min-[1200px]:w-[1170px] min-[992px]:w-[970px] min-[768px]:w-[750px]">
        <div className="flex h-[600px] max-[991px]:h-auto items-center justify-center">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col items-center h-auto text-center">
              <div className="mb-8 sm:mb-16" />
              <h1
                className="text-[66px]  highlight  max-[1199px]:text-[46px] max-[1199px]:leading-[46px] max-[767px]:text-[34px] max-[767px]:leading-[40px]  leading-[70px] font-black uppercase text-white "
                style={{
                  textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                our services
              </h1>
              <div className="p-[20px_0] title-underline h-[21px] ">
                <span className="w-[55px]  text-[#c2d805] h-[1px] bg-current inline-block align-top relative"></span>
              </div>
            </div>
            {/* Thay title-underline */}
            <p
              className="text-[16px] highlight text-center leading-[24px] text-[rgba(255,255,255,.8)] "
              style={{
                textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
              }}
            >
              In feugiat molestie tortor a malesuada. Etiam a venenatis ipsum.
              Proin pharetra elit at feugiat commodo vel placerat tincidunt
              sapien nec
            </p>
            <div className="mb-8 sm:mb-16" />
          </div>
        </div>
      </div>
      {/*end our services */}
    </div>
  );
};

export default OurServices;
