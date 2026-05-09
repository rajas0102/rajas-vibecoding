import { Home, Camera, User, Bell, Aperture, Compass } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 pb-safe pt-3 px-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <NavItem
          icon={<Home size={22} />}
          label="Home"
          isActive={path === "/home"}
          onClick={() => navigate("/home")}
        />
        <NavItem
          icon={<Compass size={22} />}
          label="Acara"
          isActive={path === "/inspirasi"}
          onClick={() => navigate("/inspirasi")}
        />
        <div className="relative -top-5 mx-1">
          <div
            className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg shadow-stone-900/20 active:scale-95 transition-transform border-[3px] border-white"
            onClick={() => navigate("/upload")}
          >
            <Camera size={22} />
          </div>
        </div>
        <NavItem
          icon={<Bell size={22} />}
          label="Notifikasi"
          isActive={path === "/notifications"}
          onClick={() => navigate("/notifications")}
        />
        <NavItem
          icon={<User size={22} />}
          label="Profile"
          isActive={path === "/profile"}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors w-12 ${isActive ? "text-primary" : "text-stone-400 hover:text-stone-600"}`}
      onClick={onClick}
    >
      <div
        className={`p-1.5 rounded-xl scale-95 transition-all ${isActive ? "bg-amber-50 scale-100" : ""}`}
      >
        {icon}
      </div>
      <span className="text-[9px] font-bold -mt-1">{label}</span>
    </div>
  );
}
