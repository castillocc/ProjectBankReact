import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
