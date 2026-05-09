import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import {
  ArrowLeft,
  Ruler,
  UserCheck,
  CheckCircle2,
  Edit2,
  Check,
  ExternalLink,
  User,
} from "lucide-react";
import { useState } from "react";

export default function BodyProfileScreen() {
  const navigate = useNavigate();
  const prefs = useStore();
  const profile = prefs.bodyProfile;
  const setBodyProfile = useStore((s) => s.setBodyProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);

  const startEdit = () => {
    setEditedProfile(JSON.parse(JSON.stringify(profile)));
    setIsEditing(true);
  };

  const saveEdit = () => {
    setBodyProfile(editedProfile);
    setIsEditing(false);
  };

  const handleEditChange = (path: string[], value: string | number) => {
    setEditedProfile((prev: any) => {
      const newProfile = { ...prev };
      if (path.length === 1) {
        newProfile[path[0]] = value;
      } else if (path.length === 2) {
        newProfile[path[0]] = { ...newProfile[path[0]], [path[1]]: value };
      }
      return newProfile;
    });
  };

  if (!profile && !prefs.userImage) {
    return (
      <div className="p-6 h-full bg-stone-50 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-stone-800 mb-2">
          Belum ada postur tubuh
        </h2>
        <p className="text-stone-500 mb-6 w-3/4 mx-auto">
          Silakan lakukan scan tubuh terlebih dahulu untuk melihat profile kamu.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-stone-50 overflow-y-auto"
    >
      <div className="bg-stone-900 pb-16 pt-12 px-6 rounded-b-[3rem] text-white relative">
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-12 left-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        {profile && (
          <button
            onClick={isEditing ? saveEdit : startEdit}
            className="absolute top-12 right-6 p-2 bg-white/10 hover:bg-primary rounded-full transition-colors text-white"
          >
            {isEditing ? <Check size={24} /> : <Edit2 size={24} />}
          </button>
        )}
        <div className="flex flex-col items-center mt-4">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/50 overflow-hidden">
            {prefs.userImage ? (
              <img
                src={prefs.userImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCheck size={40} className="text-primary" />
            )}
          </div>
          <h2 className="text-2xl font-bold">Detail Postur</h2>
          <p className="text-stone-400 font-medium mt-1 text-center max-w-[280px]">
            {isEditing
              ? "Mode Edit Aktif"
              : "Berdasarkan hasil analisis AI pada fotomu."}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10 space-y-6 pb-24">
        {profile ? (
          <>
            <div
              className={`bg-white rounded-3xl p-6 shadow-xl ${isEditing ? "border-primary ring-2 ring-primary/20" : "border-stone-100 shadow-stone-200/50"} border transition-all`}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-2xl">
                  <p className="text-stone-500 text-sm font-semibold mb-1">
                    Body Type
                  </p>
                  {isEditing ? (
                    <select
                      value={editedProfile.body_type}
                      onChange={(e) =>
                        handleEditChange(["body_type"], e.target.value)
                      }
                      className="bg-transparent font-bold text-primary-dark w-full outline-none border-b border-primary/20 pb-1"
                    >
                      <option value="Rectangle">Rectangle</option>
                      <option value="Athletic">Athletic</option>
                      <option value="Pear">Pear</option>
                      <option value="Inverted Triangle">
                        Inverted Triangle
                      </option>
                      <option value="Hourglass">Hourglass</option>
                    </select>
                  ) : (
                    <p className="text-lg font-bold text-primary-dark">
                      {profile.body_type}
                    </p>
                  )}
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl">
                  <p className="text-stone-500 text-sm font-semibold mb-1">
                    Skin Tone
                  </p>
                  {isEditing ? (
                    <select
                      value={editedProfile.skin_tone}
                      onChange={(e) =>
                        handleEditChange(["skin_tone"], e.target.value)
                      }
                      className="bg-transparent font-bold text-stone-800 w-full outline-none border-b border-stone-300 pb-1"
                    >
                      <option value="Medium Warm">Medium Warm</option>
                      <option value="Cool Tone">Cool Tone</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Deep Warm">Deep Warm</option>
                    </select>
                  ) : (
                    <p className="text-lg font-bold text-stone-800">
                      {profile.skin_tone}
                    </p>
                  )}
                </div>
              </div>

              {!isEditing && (
                <>
                  <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Insight Fashion
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {profile.analysis_text}
                  </p>
                </>
              )}
            </div>

            <div>
              <h3 className="font-bold text-lg text-stone-800 mb-4 px-2 flex items-center gap-2">
                <Ruler size={20} className="text-stone-500" />
                Detail Ukuran
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <EditableMeasurementItem
                    label="Tinggi"
                    unit="cm"
                    value={isEditing ? editedProfile.height : profile.height}
                    isEditing={isEditing}
                    onChange={(val) => handleEditChange(["height"], val)}
                  />
                  <EditableMeasurementItem
                    label="Berat"
                    unit="kg"
                    value={isEditing ? editedProfile.weight : profile.weight}
                    isEditing={isEditing}
                    onChange={(val) => handleEditChange(["weight"], val)}
                  />
                  <EditableMeasurementItem
                    label="Lingkar Dada"
                    unit="cm"
                    value={
                      isEditing
                        ? editedProfile.measurements.chest
                        : profile.measurements.chest
                    }
                    isEditing={isEditing}
                    onChange={(val) =>
                      handleEditChange(["measurements", "chest"], val)
                    }
                  />
                  <EditableMeasurementItem
                    label="Pinggang"
                    unit="cm"
                    value={
                      isEditing
                        ? editedProfile.measurements.waist
                        : profile.measurements.waist
                    }
                    isEditing={isEditing}
                    onChange={(val) =>
                      handleEditChange(["measurements", "waist"], val)
                    }
                  />
                  <EditableMeasurementItem
                    label="Bahu"
                    unit="cm"
                    value={
                      isEditing
                        ? editedProfile.measurements.shoulder
                        : profile.measurements.shoulder
                    }
                    isEditing={isEditing}
                    onChange={(val) =>
                      handleEditChange(["measurements", "shoulder"], val)
                    }
                  />
                  <EditableMeasurementItem
                    label="P. Celana"
                    unit="cm"
                    value={
                      isEditing
                        ? editedProfile.measurements.leg_length
                        : profile.measurements.leg_length
                    }
                    isEditing={isEditing}
                    onChange={(val) =>
                      handleEditChange(["measurements", "leg_length"], val)
                    }
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-stone-100 border border-stone-200 border-dashed rounded-3xl p-8 flex flex-col items-center text-center">
            <Ruler size={48} className="text-stone-300 mb-4" />
            <h3 className="font-bold text-stone-800 mb-2">
              Profil Tubuh Belum Lengkap
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              Scan bentuk tubuhmu sekarang agar AI bisa merekomendasikan pakaian
              yang sesuai.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              Scan Postur Sekarang <ExternalLink size={18} />
            </button>
          </div>
        )}
      </div>

      {profile && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent z-20 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            {isEditing && (
              <button
                onClick={saveEdit}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
              >
                Simpan Perubahan
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function EditableMeasurementItem({
  label,
  value,
  unit,
  isEditing,
  onChange,
}: {
  label: string;
  value: string | number;
  unit: string;
  isEditing: boolean;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">
        {label}
      </p>
      {isEditing ? (
        <div className="flex items-center gap-1 border-b border-primary/30 pb-0.5">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full bg-transparent font-bold text-stone-900 font-mono text-lg outline-none max-w-[4rem]"
          />
          <span className="text-stone-400 font-mono text-sm">{unit}</span>
        </div>
      ) : (
        <p className="font-bold text-stone-800 font-mono text-lg">
          {value} {unit}
        </p>
      )}
    </div>
  );
}
