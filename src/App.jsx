
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Acceuil from "./pages/acceuil.jsx";
import Choix from "./pages/choix.jsx";
import Connexion from "./pages/connexion.jsx";
import Education from "./pages/education.jsx";
import Inscription from "./pages/inscription.jsx";
import Marketing from "./pages/marketing.jsx";
import Profile from "./pages/profile.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage";
//import DetailEducation from "./pages/detail_educ.jsx";
//import DetailMarketing from "./pages/detail_mark.jsx";

import {
  handlePreloader,
  handleScroll,
  initializeAOS,
  initializeFAQToggle,
  initializeGLightbox,
  initializeMobileNavToggle,
  initializeScrollTopButton,
} from "./assets/js/main.js";
import AdminDashboard from "./pages/Admin-client.jsx";
import AdminLogin from "./pages/admin-login.jsx";
import AdminMarketing from "./pages/Admin-marketing.jsx";
import AdminEducation from "./pages/Admin-education.jsx";
import AdminAdmin from "./pages/Admin.jsx";


function App() {
  useEffect(() => {
    // Initialize external scripts
    initializeAOS();
    initializeGLightbox();
    handlePreloader();
    initializeScrollTopButton();
    initializeMobileNavToggle();
    initializeFAQToggle();

    const handleScrollEvent = () => {
      handleScroll();
    };

    document.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("load", handleScrollEvent);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("scroll", handleScrollEvent);
      window.removeEventListener("load", handleScrollEvent);
    };
  }, []);

  return (

      <Routes>
        <Route path="/" Component={Acceuil} />
        <Route path="/profile" Component={Profile} />
        <Route path="/choix" Component={Choix} />
        <Route path="/education" Component={Education} />
        <Route path="/connexion" Component={Connexion} />
        <Route path="/inscription" Component={Inscription} />
        <Route path="/marketing" Component={Marketing} />
        <Route path="/choix" Component={Choix} />
        <Route path="/profile" Component={Profile} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/Admin-client" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/Admin-marketing" element={<AdminMarketing />} />
        <Route path="/Admin-education" element={<AdminEducation />} />
        <Route path="/Admin-Dashboard" element={<AdminAdmin />} />
        
      </Routes>

  );
}

export default App;
