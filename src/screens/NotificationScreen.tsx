import { motion } from "motion/react";
import { Bell } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function NotificationScreen() {
  const notifications = [
    {
      title: "Rekomendasi Baru!",
      desc: "Outfit casual untuk Hangout minggu ini sudah siap.",
      time: "10 mnt lalu",
      unread: true,
    },
    {
      title: "Gaya Berhasil Disimpan",
      desc: "Outfit Pernikahan 1 telah ditambahkan ke favorit.",
      time: "2 jam lalu",
      unread: false,
    },
    {
      title: "Promo Khusus",
      desc: "Diskon 20% untuk kemeja rekomendasi dari H&M.",
      time: "1 hari lalu",
      unread: false,
    },
    {
      title: "Profil Tubuh Tersimpan",
      desc: "Data profile postur tubuh kamu berhasil diperbarui.",
      time: "2 hari lalu",
      unread: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-stone-50 overflow-hidden flex flex-col"
    >
      <div className="pt-14 px-6 pb-4 bg-white shadow-sm z-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Notifikasi
        </h1>
        <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
          <Bell size={20} className="text-stone-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-4">
        {notifications.map((notif, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-[1.5rem] border ${notif.unread ? "bg-amber-50 border-amber-200" : "bg-white border-stone-200 shadow-sm"}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`font-bold ${notif.unread ? "text-primary-dark" : "text-stone-800"}`}
              >
                {notif.title}
              </h3>
              <span className="text-[10px] font-bold text-stone-400">
                {notif.time}
              </span>
            </div>
            <p className="text-sm text-stone-600 font-medium">{notif.desc}</p>
          </div>
        ))}
      </div>
      <BottomNav />
    </motion.div>
  );
}
