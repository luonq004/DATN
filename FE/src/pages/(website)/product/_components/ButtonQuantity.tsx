const Button = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    /* Quantity */

    <div className="mb-10 flex flex-col md:flex-row md:items-center">
      <span className="uppercase text-[13px] text-[#343434] font-raleway font-black mb-2 w-full md:w-4/12">
        số lượng:
      </span>

      <div className="flex items-center h-[42px] ">
        <button
          className="cursor-pointer flex justify-center items-center text-5xl font-light w-[50px] h-full text-center border border-r-0 rounded-tl-full rounded-bl-full text-[#333]"
          onClick={() => {
            if (quantity > 1) setQuantity(quantity - 1);
          }}
        >
          -
        </button>
        <span className="border flex justify-center items-center h-full w-24 text-center text-[#333]">
          {quantity}
        </span>
        <button
          className="cursor-pointer flex justify-center items-center text-3xl font-light w-[50px] h-full text-center border border-l-0 rounded-tr-full rounded-br-full text-[#333]"
          onClick={() => {
            if (quantity < 10) setQuantity(quantity + 1);
          }}
        >
          +
        </button>
        <span className="ml-4 text-xs">13312 sản phẩm có sẵn</span>
      </div>
    </div>
  );
};

export default Button;
