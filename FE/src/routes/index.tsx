import Pagination from "@/components/Pagination";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Pagination />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
