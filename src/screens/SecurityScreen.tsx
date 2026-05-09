import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { ArrowLeft, Shield, Phone, Mail, Lock } from "lucide-react";
import { useState } from "react";

export default function SecurityScreen() {
  const navigate = useNavigate();
  const prefs = useStore();
  const setAuth = useStore((s) => s.setAuth);
  const setPrefs = useStore((s) => s.setPrefs);

  const [email, setEmail] = useState(prefs.email);
  const [phone, setPhone] = useState(prefs.phone);
  const [password, setPassword] = useState("••••••••");

  const handleSave = () => {
    setAuth(true, prefs.userName, email);
    setPrefs({ phone });
    navigate("/profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-stone-50 overflow-hidden flex flex-col"
    >
      <div className="pt-14 px-6 pb-4 bg-white shadow-sm z-10 flex items-center justify-between">
        <button
          onClick={() => navigate("/profile")}
          className="p-2 -ml-2 text-stone-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-stone-900 tracking-tight">
          Keamanan Akun
        </h1>
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <Shield size={20} className="text-emerald-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Email
            </label>
            <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <Mail size={20} className="text-stone-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Nomor Telepon
            </label>
            <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <Phone size={20} className="text-stone-400 mr-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
                className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Password Baru
            </label>
            <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <Lock size={20} className="text-stone-400 mr-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl mt-8"
        >
          Simpan Keamanan
        </button>
      </div>
    </motion.div>
  );
}
