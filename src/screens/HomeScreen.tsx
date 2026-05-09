import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useState } from "react";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Camera,
  User,
  Home,
  Shirt,
  Flame,
  ChevronRight,
  ScanLine,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

import { EVENTS_DATA } from "../data/events";

export default function HomeScreen() {
  const navigate = useNavigate();
  const prefs = useStore();
  const [selectedEvent, setSelectedEvent] = useState("Pernikahan");

  const events = EVENTS_DATA.slice(0, 6);

  const handleSearch = (eventName: string) => {
    navigate("/outfit", { state: { event: eventName } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-stone-50 flex flex-col h-full overflow-hidden"
    >
      <div className="pt-14 px-6 pb-6 bg-white rounded-b-[2rem] shadow-sm relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-stone-500 font-medium text-sm">
              Welcome back,{" "}
              {prefs.userName || (prefs.gender === "male" ? "Bro!" : "Sis!")}
            </p>
            <h1 className="text-2xl font-bold text-stone-900 mt-1 tracking-tight">
              Temukan Style Terbaikmu
            </h1>
          </div>
          <div
            className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center cursor-pointer border-2 border-primary/20 overflow-hidden"
            onClick={() => navigate("/profile")}
          >
            {prefs.userImage ? (
              <img
                src={prefs.userImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={24} className="text-primary" />
            )}
          </div>
        </div>

        {/* Search bar simulation */}
        <div className="bg-stone-100 flex items-center p-3.5 px-4 rounded-2xl gap-3 text-stone-500 cursor-text group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border focus-within:border-primary/50 transition-all">
          <Search
            size={20}
            className="text-stone-400 group-focus-within:text-primary transition-colors"
          />
          <input
            placeholder="Cari acara atau gaya..."
            className="bg-transparent outline-none flex-1 font-medium text-stone-700 placeholder:text-stone-400"
          />
          <SlidersHorizontal
            size={20}
            className="text-stone-400 hover:text-primary transition-colors cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Banner CTA */}
        {!prefs.bodyProfile ? (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/upload")}
            className="bg-stone-900 text-white p-5 rounded-3xl shadow-xl mb-6 relative overflow-hidden flex items-center cursor-pointer disabled:opacity-50"
          >
            <div className="absolute -right-4 -top-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-1">
                <ScanLine size={18} className="text-primary" />
                <span className="font-bold text-sm tracking-wide uppercase text-primary">
                  Fitur AI Baru
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">Scan Postur Tubuh</h2>
              <p className="text-stone-400 text-sm mb-4 leading-relaxed line-clamp-2 w-11/12">
                Foto OOTD dan biarkan AI kami menganalisis tipe tubuhmu untuk
                rekomendasi terbaik.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                Mulai Scan <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            onClick={() => navigate("/profile")}
            className="bg-primary/10 border border-primary/20 text-stone-800 p-5 rounded-[2rem] mb-6 flex items-center gap-4 cursor-pointer hover:bg-primary/15 transition-colors"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Shirt size={32} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg leading-tight mb-1">
                Body Profile Aktif
              </h3>
              <p className="text-stone-600 text-sm">
                Type:{" "}
                <span className="font-bold text-stone-800">
                  {prefs.bodyProfile.body_type}
                </span>
              </p>
              <p className="text-stone-600 text-sm">
                Style:{" "}
                <span className="font-bold text-stone-800">
                  {prefs.stylePref}
                </span>
              </p>
            </div>
            <ChevronRight size={24} className="text-stone-400" />
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-orange-500 fill-orange-500/20" />
            <h2 className="font-bold text-lg text-stone-800">
              Inspirasi Acara
            </h2>
          </div>
          <span
            className="text-sm font-bold text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/inspirasi")}
          >
            Lihat Semua
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {events.map((ev, index) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={index}
              onClick={() => handleSearch(ev.eventName)}
              className="p-4 rounded-[1.5rem] bg-white border border-stone-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] text-left flex flex-col items-start gap-3 hover:border-primary/30 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-full ${ev.color} border ${ev.border} flex items-center justify-center text-xl`}
              >
                {ev.icon}
              </div>
              <div>
                <p className="font-bold text-stone-800 leading-tight">
                  {ev.title}
                </p>
                <p className="text-xs text-stone-400 font-medium mt-0.5">
                  Eksplor Rekomendasi
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </motion.div>
  );
}
