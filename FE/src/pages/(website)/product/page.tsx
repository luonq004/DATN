import { Link, useParams } from "react-router-dom";
import ProductInfo from "./_components/ProductInfo";
import SeeMore from "./_components/SeeMore";
import SkeletonProduct from "./_components/SkeletonProduct";
import SliderImage from "./_components/SliderImage";
import { useGetProductById } from "./actions/useGetProductById";

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoading, product, error } = useGetProductById(id!);

  if (isLoading) {
    return (
      <div className="container mb-4">
        <SkeletonProduct />
      </div>
    );
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
        <Link to={`/product/${product._id}`}>{product.name}</Link>
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
        </div>
      </div>
      {/* See More */}
      <div className="h-[35px] md:h-[70px]"></div>
      <SeeMore
        descriptionDetail={product.descriptionDetail}
        comments={product?.comments}
      />
    </div>
  );
};

export default ProductDetail;
