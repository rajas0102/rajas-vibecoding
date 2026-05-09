import { motion } from "motion/react";
import { Aperture, ArrowLeft } from "lucide-react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

export default function SaranFotoScreen() {
  const bodyProfile = useStore((s) => s.bodyProfile);
  const navigate = useNavigate();

  const poses = [
    {
      name: "Pose Tiga Perempat",
      desc: "Berdiri menyerong 45 derajat dari kamera. Salah satu kaki sedikit ke depan.",
      reason: `Sangat cocok untuk postur ${bodyProfile?.body_type || "tubuh kamu"} agar terlihat lebih proporsional.`,
      icon: "🚶",
      image_url:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    },
    {
      name: "Bersandar Dinding",
      desc: "Sandarkan satu sisi bahu ke dinding, satu kaki disilangkan di depan.",
      reason: "Memberikan kesan natural dan santai, sempurna untuk OOTD.",
      icon: "🧱",
      image_url:
        "https://images.unsplash.com/photo-1550614000-4b95d4ebfa84?w=600&q=80",
    },
    {
      name: "Tangan di Saku",
      desc: "Masukkan satu atau dua tangan ke saku celana, dada tegap lurus ke depan.",
      reason: "Menonjolkan siluet outfit bagian atas dan memberi kesan elegan.",
      icon: "🧍",
      image_url:
        "https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=600&q=80",
    },
    {
      name: "Berjalan Natural",
      desc: "Ambil langkah perlahan, ayunkan tangan secara natural seolah sedang berjalan.",
      reason: "Memberi efek dinamis dan menonjolkan fitur pakaian dengan baik.",
      icon: "🏃",
      image_url:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&q=80",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-stone-50 overflow-hidden flex flex-col"
    >
      <div className="pt-14 px-6 pb-4 bg-white shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-stone-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">
            Saran Foto
          </h1>
        </div>
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <Aperture size={20} className="text-amber-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <p className="text-stone-500 font-medium mb-6">
          Inspirasi pose terbaik berdasarkan bentuk tubuhmu agar hasil foto
          makin estetik.
        </p>
        <div className="space-y-6">
          {poses.map((pose, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col"
            >
              <div className="relative h-64 bg-stone-200">
                <img
                  src={pose.image_url}
                  alt={pose.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-stone-800 flex items-center gap-1 shadow-sm">
                  {pose.icon} Top Pick
                </div>
              </div>
              <div className="p-5 relative z-10">
                <h3 className="font-bold text-xl mb-1 text-stone-800">
                  {pose.name}
                </h3>
                <p className="text-stone-500 text-sm mb-4 font-medium">
                  {pose.desc}
                </p>
                <div className="bg-amber-50 p-3 rounded-xl">
                  <p className="text-[11px] text-primary-dark font-bold uppercase tracking-wider mb-1">
                    Kenapa Cocok?
                  </p>
                  <p className="text-sm text-stone-700 font-medium leading-relaxed">
                    {pose.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent z-20">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-stone-900 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
          >
            Selesai
          </button>
        </div>
      </div>
    </motion.div>
  );
}
