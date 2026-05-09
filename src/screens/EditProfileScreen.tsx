import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { ArrowLeft, User, Save } from "lucide-react";
import { useState } from "react";

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const prefs = useStore();
  const setAuth = useStore((s) => s.setAuth);
  const setPrefs = useStore((s) => s.setPrefs);

  const [name, setName] = useState(prefs.userName);
  const [age, setAge] = useState(prefs.age.toString());
  const [gender, setGender] = useState(prefs.gender);
  const [stylePref, setStylePref] = useState(prefs.stylePref);

  const styles = [
    "Korean Casual",
    "Streetwear",
    "Formal / Old Money",
    "Smart Casual",
    "Modest / Hijab",
  ];

  const handleSave = () => {
    setAuth(true, name, prefs.email);
    setPrefs({ age: parseInt(age) || 20, gender, stylePref });
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
          Edit Profil
        </h1>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <User size={20} className="text-blue-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Nama Lengkap
            </label>
            <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Umur
            </label>
            <div className="flex items-center bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="20"
                className="bg-transparent w-full outline-none font-medium text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Jenis Kelamin
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-3 rounded-xl font-bold transition-all border-2 ${
                    gender === g
                      ? "border-primary bg-amber-50 text-primary-dark"
                      : "border-stone-200 text-stone-500 bg-white hover:border-stone-300"
                  }`}
                >
                  {g === "male" ? "Pria" : "Wanita"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-stone-700 block mb-2">
              Style Favorit
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setStylePref(s)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    stylePref === s
                      ? "bg-stone-900 border-stone-900 text-white shadow-md"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-amber-500/30 mt-8"
        >
          Simpan Perubahan
        </button>
      </div>
    </motion.div>
  );
}
