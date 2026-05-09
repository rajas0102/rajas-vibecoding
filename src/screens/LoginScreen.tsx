import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginScreen() {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setAuth(true, email.split("@")[0] || "User", email);
      navigate("/home");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-white flex flex-col h-full overflow-y-auto px-6 py-12"
    >
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-2 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-stone-500 font-medium mb-8">
          Masuk untuk melihat gaya terbaikmu hari ini.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-stone-700 block mb-2">
                Email
              </label>
              <div className="flex items-center bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Mail size={20} className="text-stone-400 mr-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-stone-700 block mb-2">
                Password
              </label>
              <div className="flex items-center bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Lock size={20} className="text-stone-400 mr-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="text-primary font-bold text-sm text-right w-full"
          >
            Lupa Password?
          </button>

          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
          >
            Masuk <ArrowRight size={20} />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-stone-200 flex-1"></div>
          <span className="text-stone-400 font-medium text-sm">Atau</span>
          <div className="h-px bg-stone-200 flex-1"></div>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="w-full bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-800 rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          Daftar Akun Baru
        </button>
      </div>
    </motion.div>
  );
}
