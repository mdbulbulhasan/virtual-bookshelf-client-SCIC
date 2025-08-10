import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";
import { AnimatePresence } from "motion/react";

const AuthLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <NavBar></NavBar>
      <AnimatePresence>
        <Outlet key={location.pathname}></Outlet>
      </AnimatePresence>

      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
