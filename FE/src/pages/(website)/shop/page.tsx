import { Link } from "react-router-dom";
import { ContentShop } from "./_components/ContentShop";
import Header from "./_components/Header";

import FilterContent from "./_components/FilterContent";
import { debounce } from "@/lib/utils";
import React from "react";

const ProductShopPage = () => {
  const handleRangeChange = debounce((event) => {
    console.log("Giá trị:", event.target.value);
  }, 300); // Thời gian trễ là 300ms

  return (
    <>
      <Header />
      <div className="block h-[100px] md:h-[159px]"></div>
      <div className="container">
        <div className="h-4 md:h-8 mb-0"></div>

        {/* BREADCRUM */}
        <div className="text-[11px] leading-[18px] uppercase text-[#888] breadcrumbs">
          <a className="bread" href="#">
            Trang chủ
          </a>
          <a className="bread" href="#">
            Quần
          </a>
          <Link to="/shopping">Baggy</Link>
        </div>
        {/* BREADCRUM */}

        {/* Khoang cach */}
        <div className="h-4 md:h-12 lg:h-24 mb-0"></div>
        {/* Khoang cach */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* CONTENT */}
          <ContentShop />
          {/* CONTENT */}
          {/*=========================  */}
          {/* CATEGORY */}
          <FilterContent />
          {/* CATEGORY */}

          <input type="range" min="0" max="100" onInput={handleRangeChange} />
        </div>
      </div>
    </>
  );
};

export default ProductShopPage;
