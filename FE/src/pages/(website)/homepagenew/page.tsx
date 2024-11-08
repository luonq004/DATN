import Accessories from "./_componnents/Accessories";
import Collections from "./_componnents/Collections";
import FeatureCards from "./_componnents/FeatureCards";
import Footer from "./_componnents/Footer";
import NewArrivals from "./_componnents/NewArrivals";
import OurSeries from "./_componnents/OurSeries";
import Products from "./_componnents/Products";
import Slider from "./_componnents/Slider";
import SpecialOffers from "./_componnents/SpecialOffers";
import SubscribeSection from "./_componnents/SubscribeSection";

const HomePageNew = () => {
  return (
    <div className="bg-zinc-100">
      {/* <Header /> */}
      <main className="bg-white  lg:mx-[50px] mx-[14px]">
        <Slider />
        <Collections />
        <Products />
        <SpecialOffers />
        <NewArrivals />
        <OurSeries/>
        <Accessories/>
        <FeatureCards/>
        <SubscribeSection/>
        </main>
        <Footer/>
    </div>
  );
};

export default HomePageNew;
