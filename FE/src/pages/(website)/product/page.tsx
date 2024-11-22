import { Link, useParams } from "react-router-dom";
import ProductInfo from "./_components/ProductInfo";
import SliderImage from "./_components/SliderImage";
import { useGetProductById } from "./actions/useGetProductById";
import { IoBagHandleSharp } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import SeeMore from "./_components/SeeMore";

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoading, product, error } = useGetProductById(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error loading product!</div>;
  }

  return (
    <div className="container mb-4">
      <div className="h-4 md:h-8 mb-0"></div>
      {/* Breadcrumbs */}
      <div className="text-[11px] leading-[18px] uppercase text-[#888] breadcrumbs">
        <Link to="/" className="bread">
          Trang chủ
        </Link>
        <Link to="/shopping" className="bread">
          Shopping
        </Link>
        <Link to={`/product/${product._id}`} className="bread">
          Baggy
        </Link>
      </div>
      {/* Khoang cach */}
      <div className="h-4 md:h-12 lg:h-24 mb-0"></div>
      {/* Info product */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-[15px] mx-auto mb-[30px] md:mb-0">
          {/* Carousel */}
          <SliderImage variants={product.variants} />
        </div>

        {/* Product info */}
        <div>
          {/* Sử dụng ProductInfo */}
          <ProductInfo product={product} />

          {/* BUTTON */}
          <div className="flex flex-col md:flex-row gap-2 text-[11px] font-raleway font-bold">
            <button
              className="btn-add text-white uppercase flex-1"
              // onClick={handleAddToCart}
            >
              <span className="btn-add__wrapper text-[11px] px-[30px] rounded-full bg-[#343434] pt-[17px] pb-[15px] font-raleway">
                <span className="icon">
                  <IoBagHandleSharp />
                </span>
                <span className="text">thêm giỏ hàng</span>
              </span>
            </button>
            <button className="btn-add text-white uppercase flex-1">
              <span className="btn-add__wrapper text-[11px] px-[30px] border rounded-full text-[#343434] pt-[17px] pb-[15px] font-raleway">
                <span className="icon">
                  <SlHeart />
                </span>
                <span className="text">thêm yêu thích</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* See More */}
      <div className="h-[35px] md:h-[70px]"></div>
      <SeeMore />
    </div>
  );
};

export default ProductDetail;
