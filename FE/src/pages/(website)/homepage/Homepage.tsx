import Collections from "./component/Collections";
import Endow from "./component/Sale";
import Products from "./component/Products";
import Slider from "./component/Slider";

const HomePage = () => {

  return (
    <div className="">
      <div className="max-w-[1408px] items-center mx-auto">
          <Slider/>
          <Products/>
          <Collections/>
          <Endow/>
      </div>
    </div>
  );
};

export default HomePage;
