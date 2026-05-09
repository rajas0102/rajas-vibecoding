import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center pointer-events-none p-6 text-white min-h-screen z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          <Camera size={48} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg mb-2">
          FitIn
        </h1>
        <p className="text-lg font-medium text-white/90 drop-shadow">
          AI Fashion Stylist
        </p>
      </motion.div>
    </div>
  );
}
