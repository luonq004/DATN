import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/(website)/layout";
import DetailPage from "../pages/(website)/details/page";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route path="product/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
