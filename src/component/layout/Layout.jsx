// import React from 'react'

import Footer from "../Footer/footer";
import NavBar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
    <div className="">
      <NavBar />
      </div>
      <Outlet />
      <div className="">
  
        <Footer />
      </div>
    </>
  );
}
