import React from "react";
import AppNavbar from "../components/layout/Navbar";
import HeroSection from "./HeroSection";
import AppFooter from "../components/layout/Footer";
import PriceChart from "../components/charts/PriceChart";
import MarketNews from "../components/charts/LineChart";
import ErrorBoundary from "../components/ErrorBoundary";

const HomePage = () => {
  return (
    <>
    <ErrorBoundary>
      {/* <AppNavbar /> */}
      <HeroSection />
      </ErrorBoundary>
      <PriceChart/>
      <MarketNews/>
      {/* <AppFooter/> */}
    </>
  );
};

export default HomePage;
