import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";
import { AnimatePresence } from "motion/react";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <NavBar></NavBar>
      <AnimatePresence mode="wait">
        <div className="mt-[15%] lg:mt-[2%]">
          <Outlet key={location.pathname}></Outlet>
        </div>
      </AnimatePresence>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
