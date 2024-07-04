import HomePage from "@/pages/(website)/homepage/Homepage";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
