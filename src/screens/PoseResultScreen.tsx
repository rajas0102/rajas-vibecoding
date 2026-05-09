import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera, Image as ImageIcon } from "lucide-react";
import { useStore } from "../store";

export default function PoseResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || "Casual";
  const bodyProfile = useStore((s) => s.bodyProfile);

  const poses = [
    {
      name: "Pose Tiga Perempat",
      desc: "Berdiri menyerong 45 derajat dari kamera. Salah satu kaki sedikit ke depan.",
      reason: `Sangat cocok untuk postur ${bodyProfile?.body_type || "kamu"} agar badan terlihat lebih ramping dan proporsional.`,
      icon: "🚶",
    },
    {
      name: "Bersandar Dinding (Casual)",
      desc: "Sandarkan satu sisi bahu ke dinding, satu kaki disilangkan di depan.",
      reason: `Memberikan kesan natural dan santai, sempurna untuk OOTD acara ${event}.`,
      icon: "🧱",
    },
    {
      name: "Tangan di Saku",
      desc: "Masukkan satu atau dua tangan ke saku celana, dada tegap lurus ke depan.",
      reason: "Menonjolkan siluet outfit bagian atas dan memberi kesan elegan.",
      icon: "🧍",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-stone-900 flex flex-col h-full text-white"
    >
      <div className="px-6 pt-12 pb-4 z-20 sticky top-0 bg-stone-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg text-white text-center flex-1">
            Saran Pose Foto
          </h2>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-stone-800 rounded-[2rem] flex items-center justify-center shadow-lg border border-stone-700">
            <Camera size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Pose Terbaikmu</h1>
        <p className="text-center text-stone-400 mb-8 max-w-[280px] mx-auto">
          AI menyarankan pose ini berdasarkan outfit dan bentuk tubuhmu.
        </p>

        <div className="space-y-4">
          {poses.map((pose, idx) => (
            <div
              key={idx}
              className="bg-stone-800 p-5 rounded-3xl border border-stone-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none">
                {pose.icon}
              </div>
              <h3 className="font-bold text-xl mb-1 text-white">{pose.name}</h3>
              <p className="text-stone-300 text-sm mb-3 relative z-10">
                {pose.desc}
              </p>
              <div className="bg-stone-900/50 p-3 rounded-xl border border-stone-700 relative z-10">
                <p className="text-xs text-primary font-semibold mb-1">
                  Alasan AI:
                </p>
                <p className="text-sm text-stone-400">{pose.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900 via-stone-900 to-transparent z-20">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white text-stone-900 rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
          >
            Selesai
          </button>
        </div>
      </div>
    </motion.div>
  );
}
