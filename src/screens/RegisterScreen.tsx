import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setAuth(true, name, email);
      navigate("/onboarding");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col h-full overflow-y-auto px-6 py-12"
    >
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-2 tracking-tight">
          Buat Akun
        </h1>
        <p className="text-stone-500 font-medium mb-8">
          Daftar sekarang untuk mendapatkan rekomendasi gaya pertamamu.
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-stone-700 block mb-2">
                Nama Lengkap
              </label>
              <div className="flex items-center bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <User size={20} className="text-stone-400 mr-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </div>

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
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-amber-500/20 mt-4"
          >
            Daftar <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-stone-500 font-medium">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-bold"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
