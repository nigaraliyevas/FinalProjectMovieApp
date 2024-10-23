import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar"; // Make sure to import your Sidebar component
import "./MainLayout.css"; // Import your CSS for layout styling

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/register" || location.pathname === "/login" || location.pathname === "/recover";

  return (
    <div className={`layout ${isAuthPage ? "auth-layout" : "main-layout"}`}>
      {!isAuthPage && <Sidebar />} {/* Render Sidebar only if it's not an auth page */}
      <div className="content">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
