import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/layout/Navbar";
import AppFooter from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import GoldSection from "./pages/GoldSection";

function App() {
  return (
    <Router>
      {/* <AppNavbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/goldsection" element={<GoldSection />} />
      </Routes>
      {/* <AppFooter /> */}
    </Router>
  );
}

export default App;
