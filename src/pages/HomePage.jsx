import React from "react";
import AppNavbar from "../components/layout/Navbar";
import HeroSection from "./HeroSection";
import AppFooter from "../components/layout/Footer";
import PriceChart from "../components/charts/PriceChart";
import MarketNews from "../components/charts/LineChart";

const HomePage = () => {
  return (
    <>
      <AppNavbar />
      <HeroSection />
      <PriceChart/>
      <MarketNews/>
      <AppFooter/>
    </>
  );
};

export default HomePage;
