import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Footer from "./Footer";

const RootLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Outlet />
      {isLoggedIn && <Footer />}
    </>
  );
};

export default RootLayout;
