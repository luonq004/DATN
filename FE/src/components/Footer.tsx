import product2 from "../assets/img/products/product2.jpg";
const Footer = () => {
  return (
    <footer className=" mt-12 ">
      <div className="bg-black flex text-white py-8  px-4 rounded-b-xl">
        <div className="p-8 flex  flex-wrap justify-between items-center space-y-8 lg:space-x-[5px]">

          <div className="w-full lg:w-1/3 mb-6 md:mb-0 flex-1 lg:flex-none ">
            <div className="flex items-center mb-4">
              <div >
                <img src={product2} alt="Logo" className="w-20"/>
              </div>
            </div>
            <p className="text-gray-400 text-justify">
            Take Your Fashion Game to the Next Level with Our Streetwear CollectionTake Your Fashion Game to the Next Level with Our Streetwear Collection
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex flex-wrap leading-8 justify-between ">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="font-bold mb-2">About</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Company
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/3  mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="font-bold mb-2">Discover</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Collaboration
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Coming Soon
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="font-bold mb-2">FAQ</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Policy Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:leading-[50px] lg:w-auto">
            <h3 className="font-bold mb-2 text-center lg:text-left">Join Our News Collection</h3>
            <form className="flex flex-col lg:flex-row items-center lg:items-end lg:justify-center w-full lg:w-auto">
              <div className="flex border-b border-gray-700 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent px-4 py-2 text-gray-400 focus:outline-none focus:bg-transparent w-full"
                />
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded"
                >
                  →
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
