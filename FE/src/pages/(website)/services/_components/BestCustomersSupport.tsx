const BestCustomersSupport = () => {
  return (
    <div className="container mt-[140px]  mb-[140px] max-[991px]:mt-[70px] max-[991px]:mb-[70px] px-4 relative min-[1200px]:w-[1170px] min-[992px]:w-[970px] min-[768px]:w-[750px]">
      {/* title best customers support */}
      <div className="text-center">
        <div className="text-[14px] highlight leading-[22px] text-[#555] uppercase mb-[5px]">
          our award
        </div>
        <div
          className="text-[40px] highlight max-[767px]:text-[34px] max-[767px]:leading-[40px] leading-[46px] text-[#343434] font-black uppercase"
          style={{
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          best customers support
        </div>
        <div className="p-[20px_0]  title-underline h-[21px]">
          <span className="w-[55px]  text-[#c2d805] h-[1px] bg-current inline-block align-top relative"></span>
        </div>
      </div>
      {/* end title best customers support */}
      {/* Quisque scelerisque leo nisl */}
      <div className="grid mt-[70px] gap-y-[30px] max-[768px]:grid-cols-1 grid-cols-[45%_55%] justify-center items-center">
        <div className="">
          <img
            className="mx-auto"
            src="/src/assets/icons/thumbnail-34.jpg"
            alt="icon"
          />
        </div>
        <div>
          <div className="">
            <div className="px-4">
              <h4
                className="text-[18px] px-4 highlight leading-[24px] text-[#343434] font-black uppercase mb-[22px]"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Quisque scelerisque leo nisl
              </h4>
              <p className="mb-[22px]  highlight text-[#888]">
                Aenean facilisis, purus ut tristique pulvinar, odio neque
                commodo ligula, non vestibulum lacus justo vel diam. Aenean ac
                aliquet tortor, nec gravida urna. Ut nec urna elit. Etiam id
                scelerisque ante. Cras velit nunc, luctus a volutpat nec,
                blandit id dolor. Quisque commodo elit nulla, eu semper quam
                feugiat et. Integer quam velit, suscipit eget consectetur ac,
                molestie eu diam.
              </p>
              <p className="text-[#888] highlight">
                Fusce semper rhoncus dignissim. Curabitur dapibus convallis
                varius. Suspendisse sem urna, ullamcorper eget porttitor ut,
                sagittis in justo. Vestibulum egestas nulla nec purus porttitor
                fermentum. Integer mauris mi, viverra eget nibh at, efficitur
                consectetur erat. Curabitur et imperdiet enim.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end Quisque scelerisque leo nisl */}
    </div>
  );
};

export default BestCustomersSupport;
