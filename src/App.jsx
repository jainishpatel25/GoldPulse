import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/layout/Navbar";
import AppFooter from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import GoldSection from "./pages/GoldSection";
import MyGoldPage from "./pages/MyGoldPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PriceAlertPage from "./pages/Setalert";
import PredictionsPage from "./pages/PredicationPage";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/goldsection" element={<GoldSection />} />
        <Route path="/mygold" element={<MyGoldPage />} />
        <Route path="/setalert" element={< PriceAlertPage/>} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/editprofile" element={<EditProfilePage />} />
         <Route path="/changepassword" element={<ChangePasswordPage />} />
         <Route path="/predicationpage" element={<PredictionsPage />} />
      </Routes>
      {/* <AppFooter /> */}
    </Router>
  );
}

export default App;
