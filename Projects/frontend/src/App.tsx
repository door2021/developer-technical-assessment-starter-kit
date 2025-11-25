import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./content/Navbar";
import PropertyDetails from "./pages/PropertyDetailPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}