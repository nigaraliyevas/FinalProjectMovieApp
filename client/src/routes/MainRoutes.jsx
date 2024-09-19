import MainLayout from "../layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
// import ProductList from "../pages/ProductFilter/ProductList";
// import LoginPage from "../pages/Login/LoginPage";
// import RegisterPage from "../pages/Register/RegisterPage";
// import ProductPage from "../pages/ProductPage/ProductPage";
// import ScrollToTop from "./ScrollToTop";
const MainRoutes = () => {
  return (
    <MainLayout>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/products" element={<ProductPage />} /> */}
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
