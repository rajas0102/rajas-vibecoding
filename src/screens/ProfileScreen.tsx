import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import {
  ArrowLeft,
  User,
  Ruler,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Camera,
  Home,
  ChevronRight,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const prefs = useStore();
  const logout = useStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-stone-50 overflow-y-auto"
    >
      <div className="bg-stone-900 pb-12 pt-14 px-6 rounded-b-[2.5rem] text-white relative">
        <h1 className="text-2xl font-bold mb-6 tracking-tight">Akun Saya</h1>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center border-2 border-stone-700 overflow-hidden">
            {prefs.userImage ? (
              <img
                src={prefs.userImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-stone-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {prefs.userName || "Pecinta Fashion"}
            </h2>
            <p className="text-stone-400 font-medium text-sm mt-0.5">
              {prefs.email || "user@example.com"}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-primary/20 text-primary-dark px-2 py-0.5 rounded-md text-xs font-bold border border-primary/30">
                Free Plan
              </span>
              <span className="text-stone-500 text-xs font-semibold">
                {prefs.age ? `${prefs.age} Tahun` : "20 Tahun"} •{" "}
                {prefs.gender === "male" ? "Laki-laki" : "Perempuan"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 pb-28 space-y-8">
        {/* Section 1 */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider px-2">
            Data Pribadi
          </h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-stone-100">
            <MenuListItem
              icon={<User size={20} className="text-blue-500" />}
              title="Edit Profil"
              subtitle="Nama, Umur, Gender"
              onClick={() => navigate("/edit-profile")}
            />
            <div className="h-px bg-stone-100 ml-14"></div>
            <MenuListItem
              icon={<Ruler size={20} className="text-primary" />}
              title="Body Profile & Fashion Insight"
              subtitle="Detail ukuran hasil scan tubuh"
              onClick={() => navigate("/body-profile")}
              badge={!prefs.bodyProfile ? "Belum Scan" : undefined}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider px-2">
            Pengaturan
          </h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-stone-100">
            <MenuListItem
              icon={<Shield size={20} className="text-emerald-500" />}
              title="Keamanan"
              subtitle="Email, Password, Nomor HP"
              onClick={() => navigate("/security")}
            />
            <div className="h-px bg-stone-100 ml-14"></div>
            <MenuListItem
              icon={<Bell size={20} className="text-amber-500" />}
              title="Notifikasi"
              subtitle="Atur pemberitahuan rekomendasi"
              onClick={() => navigate("/notifications")}
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider px-2">
            Bantuan
          </h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-stone-100">
            <MenuListItem
              icon={<HelpCircle size={20} className="text-purple-500" />}
              title="Pusat Dukungan"
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl py-4 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all mb-8 border border-red-100"
        >
          <LogOut size={20} /> Keluar Akun
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </motion.div>
  );
}

function MenuListItem({
  icon,
  title,
  subtitle,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  badge?: string;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors cursor-pointer active:bg-stone-100"
    >
      <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-stone-800 leading-tight">{title}</h4>
        {subtitle && (
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {badge && (
        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md">
          {badge}
        </span>
      )}
      <ChevronRight size={20} className="text-stone-300" />
    </div>
  );
}
