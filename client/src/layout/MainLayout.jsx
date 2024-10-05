import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/register" || location.pathname === "/login" || location.pathname === "/recover";

  return (
    <div>
      {isAuthPage ? (
        <main>{children}</main>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
