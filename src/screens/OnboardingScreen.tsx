import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const setPrefs = useStore((state) => state.setPrefs);
  const prefs = useStore();
  const [step, setStep] = useState(1);

  const styles = [
    "Korean Casual",
    "Streetwear",
    "Formal / Old Money",
    "Smart Casual",
    "Modest / Hijab",
  ];
  const events = [
    "Kuliah",
    "Kerja Formal",
    "Nongkrong",
    "Pernikahan",
    "Buka Bersama",
    "Casual Outfit",
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else navigate("/upload");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-stone-50 p-6 flex flex-col h-full overflow-y-auto"
    >
      <div className="pt-12 pb-6">
        <div className="flex gap-2 mb-6">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div
            className={`h-1 flex-1 rounded-full ${step > 1 ? "bg-primary" : "bg-stone-200"}`}
          />
        </div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">
          {step === 1 ? "Kenalin Diri Kamu" : "Preferensi Fashion"}
        </h1>
        <p className="text-stone-500 font-medium">
          Bantu AI memahami karakter dan style favoritmu.
        </p>
      </div>

      {step === 1 && (
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">
              Jenis Kelamin
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setPrefs({ gender: g })}
                  className={`py-4 rounded-2xl font-semibold transition-all border-2 ${
                    prefs.gender === g
                      ? "border-primary bg-amber-50 text-primary-dark"
                      : "border-stone-200 text-stone-500 bg-white hover:border-stone-300"
                  }`}
                >
                  {g === "male" ? "Pria" : "Wanita"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">
              Style Favorit
            </h3>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setPrefs({ stylePref: s })}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    prefs.stylePref === s
                      ? "bg-stone-900 text-white"
                      : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">
              Range Budget Outfit
            </h3>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="50000"
              value={prefs.budgetMax}
              onChange={(e) => setPrefs({ budgetMax: Number(e.target.value) })}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-stone-600 font-medium font-mono text-sm">
              Rp 50.000 - Rp {prefs.budgetMax.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      )}

      <div className="py-6 mt-auto">
        <button
          onClick={handleNext}
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-amber-500/30"
        >
          {step === 1 ? "Selanjutnya" : "Mulai Analisis Tubuh"}
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
