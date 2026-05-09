import { motion } from "motion/react";
import { EVENTS_DATA } from "../data/events";
import { Search, Compass, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function InspirasiScreen() {
  const navigate = useNavigate();

  const handleSearch = (eventName: string) => {
    navigate("/outfit", { state: { event: eventName } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-stone-50 overflow-hidden flex flex-col"
    >
      <div className="pt-14 px-6 pb-4 bg-white shadow-sm z-10 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-stone-800"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">
            Eksplor Inspirasi
          </h1>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Compass size={20} className="text-amber-600" />
          </div>
        </div>

        <div className="bg-stone-100 flex items-center p-3.5 px-4 rounded-2xl gap-3 text-stone-500 cursor-text focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border focus-within:border-primary/50 transition-all">
          <Search
            size={20}
            className="text-stone-400 group-focus-within:text-primary transition-colors"
          />
          <input
            placeholder="Cari acara pernikahan, nongkrong..."
            className="bg-transparent outline-none flex-1 font-medium text-stone-700 placeholder:text-stone-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <p className="text-stone-500 font-medium mb-6">
          Pilih acara untuk melihat rekomendasi outfit terbaik yang sesuai
          dengan bentuk tubuhmu.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {EVENTS_DATA.map((ev, index) => (
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
                  Rekomendasi
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <BottomNav />
    </motion.div>
  );
}
