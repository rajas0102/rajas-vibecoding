import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

// Screens
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import UploadPhotoScreen from "./screens/UploadPhotoScreen";
import HomeScreen from "./screens/HomeScreen";
import OutfitResultScreen from "./screens/OutfitResultScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BodyProfileScreen from "./screens/BodyProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import SaranFotoScreen from "./screens/SaranFotoScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SecurityScreen from "./screens/SecurityScreen";

import InspirasiScreen from "./screens/InspirasiScreen";

export default function App() {
  return (
    <div className="bg-stone-900 min-h-[100dvh] flex items-center justify-center">
      <BrowserRouter>
        <div className="mobile-container w-full h-[100dvh] sm:h-[844px] sm:rounded-[3rem] sm:border-[8px] border-stone-800 relative shadow-2xl overflow-hidden bg-stone-50 flex flex-col">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/upload" element={<UploadPhotoScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/outfit" element={<OutfitResultScreen />} />
            <Route path="/saran-foto" element={<SaranFotoScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/body-profile" element={<BodyProfileScreen />} />
            <Route path="/notifications" element={<NotificationScreen />} />
            <Route path="/inspirasi" element={<InspirasiScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/security" element={<SecurityScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
