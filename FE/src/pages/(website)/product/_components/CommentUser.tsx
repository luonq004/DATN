import { TiStarFullOutline } from "react-icons/ti";

const CommentUser = () => {
  return (
    <div className="border-b mt-[25px]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <img
            className="size-12 rounded-full"
            src="http://unionagency.one/exzo/img/testimonial-1.jpg"
            alt="Ảnh người dùng"
          />

          <div>
            <span className="text-base leading-[18px] block mb-1">
              Quoc Luong
            </span>
            <div className="flex">
              <TiStarFullOutline className="text-[#b8cd06]" />
              <TiStarFullOutline className="text-[#b8cd06]" />
              <TiStarFullOutline className="text-[#b8cd06]" />
              <TiStarFullOutline className="text-[#b8cd06]" />
              <TiStarFullOutline className="text-gray-300" />
            </div>
          </div>
        </div>

        <span>20:45 APR 07 / 15</span>
      </div>

      {/* Content Comment */}
      <div className="text-[#888] text-[14px] leading-5 pb-[25px]">
        Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie
        vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        efficitur vulputate elit.
      </div>
    </div>
  );
};

export default CommentUser;
