import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  Wand2,
  Camera,
  Star,
  CheckCircle,
} from "lucide-react";
import { recommendOutfitSelection } from "../services/aiService";
import productsData from "../data/products.json";

export default function OutfitResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || "Casual";

  const prefs = useStore();
  const [aiInsight, setAiInsight] = useState(
    "Menganalisis style yang cocok...",
  );
  const [loading, setLoading] = useState(true);
  const [vtonModal, setVtonModal] = useState<any>(null);

  useEffect(() => {
    async function getInsight() {
      if (prefs.bodyProfile) {
        const text = await recommendOutfitSelection(
          prefs.bodyProfile,
          event,
          prefs.stylePref,
        );
        setAiInsight(text);
      } else {
        setAiInsight(
          "Pastikan outfit yang kamu pilih nyaman dan membuatmu percaya diri.",
        );
      }
      setLoading(false);
    }
    getInsight();
  }, [prefs, event]);

  // Filter products dummy logic
  const recommendedProducts = productsData
    .filter((p) => p.gender === prefs.gender && p.price <= prefs.budgetMax)
    .sort(() => 0.5 - Math.random()) // Randomize slightly for demo
    .slice(0, 3); // Get top 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 bg-stone-100 flex flex-col h-full"
    >
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm z-20 sticky top-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-stone-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg text-stone-800 text-center flex-1">
            {event}
          </h2>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        {/* AI Insight Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-primary text-white p-5 rounded-3xl shadow-lg shadow-amber-500/20 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wand2 size={64} />
          </div>
          <div className="flex items-center gap-2 mb-2 font-bold text-lg">
            <Star size={20} className="fill-white" /> AI Stylist Insight
          </div>
          {loading ? (
            <div className="h-10 flex items-center">
              <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
            </div>
          ) : (
            <p className="text-white/90 leading-relaxed text-sm">{aiInsight}</p>
          )}
        </motion.div>

        {/* Product Cards */}
        <div className="space-y-6">
          {recommendedProducts.map((p, idx) => (
            <div
              key={p.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col"
            >
              <div className="relative h-64 bg-stone-200">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-stone-800 flex items-center gap-1 shadow-sm">
                  <Star size={14} className="text-primary fill-primary" /> 95%
                  Match
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-1">
                  {p.brand} • {p.category}
                </p>
                <h3 className="font-bold text-lg text-stone-900 leading-tight mb-2">
                  {p.name}
                </h3>
                <p className="text-primary-dark font-bold text-xl font-mono mb-4">
                  Rp {p.price.toLocaleString("id-ID")}
                </p>

                <div className="bg-stone-50 p-3 rounded-xl mb-4 border border-stone-100">
                  <p className="text-sm text-stone-600">
                    <strong>Alasan AI:</strong> {p.match_reason}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVtonModal(p)}
                    className="bg-stone-900 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
                  >
                    <Wand2 size={16} /> Virtual Try-On
                  </button>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-100 text-stone-800 rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm hover:bg-stone-200"
                  >
                    <ShoppingBag size={16} /> Beli
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-100 via-stone-100 to-transparent z-20">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/saran-foto", { state: { event } })}
            className="w-full bg-white text-stone-900 border-2 border-stone-200 hover:border-stone-300 rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <Camera size={20} /> Lihat Saran Pose Foto
          </button>
        </div>
      </div>

      {/* VTON Modal Simulation */}
      <AnimatePresence>
        {vtonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-80 bg-stone-200 flex items-center justify-center">
                {/* Simulate VTON result. Just show user image overlaid or placeholder */}
                {prefs.userImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={prefs.userImage}
                      className="w-full h-full object-cover grayscale opacity-50"
                    />
                    <img
                      src={vtonModal.image_url}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <p className="text-white font-bold text-lg flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-400" />
                        IDM-VTON Success
                      </p>
                      <p className="text-white/80 text-sm">
                        Pakaian telah dipadukan dengan foto kamu.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-500 font-medium">
                    Foto profil tidak tersedia
                  </p>
                )}
              </div>
              <div className="p-4">
                <button
                  onClick={() => setVtonModal(null)}
                  className="w-full bg-stone-900 text-white rounded-xl py-3 font-bold"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
