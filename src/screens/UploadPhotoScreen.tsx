import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { Camera, Upload, ScanLine, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { analyzeBodyImage } from "../services/aiService";

export default function UploadPhotoScreen() {
  const navigate = useNavigate();
  const setUserImage = useStore((s) => s.setUserImage);
  const setBodyProfile = useStore((s) => s.setBodyProfile);

  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setAnalyzing(true);
    try {
      const result = await analyzeBodyImage(preview);
      setUserImage(preview);
      setBodyProfile(result);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Gagal menganalisis gambar. Pastikan API key kamu valid.");
      setAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-stone-50 flex flex-col h-full bg-cover bg-center"
    >
      <div className="p-6 pt-12 flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm text-stone-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg text-stone-800">Scan Postur Tubuh</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        {!preview ? (
          <div className="w-full flex-1 flex flex-col items-center justify-center">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-4 border-dashed border-stone-300 rounded-[2rem] flex flex-col items-center justify-center p-6 text-stone-400 bg-white hover:bg-stone-50 cursor-pointer transition-colors"
            >
              <Camera size={48} className="mb-4 text-stone-300" />
              <p className="font-semibold text-stone-500 mb-2">
                Ambil Foto Full Body
              </p>
              <p className="text-sm text-center">
                Pastikan pencahayaan terang dan berdiri tegak menatap kamera.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm rounded-[2rem] overflow-hidden relative shadow-xl">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto object-cover max-h-[60vh]"
            />
            {analyzing && (
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <motion.div
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-1 bg-primary drop-shadow-[0_0_10px_rgba(245,158,11,1)] absolute opacity-80"
                />
                <ScanLine
                  size={48}
                  className="mb-4 text-primary animate-pulse"
                />
                <p className="font-semibold text-lg animate-pulse">
                  Memproses Postur Tubuh...
                </p>
                <p className="text-sm opacity-80 mt-1">Menggunakan AI Vision</p>
              </div>
            )}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div className="p-6 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        {!preview ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-stone-900 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Upload size={20} />
            Upload / Buka Kamera
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              disabled={analyzing}
              onClick={() => setPreview(null)}
              className="flex-1 bg-stone-200 text-stone-700 rounded-2xl py-4 font-bold text-lg active:scale-95 transition-all"
            >
              Ulangi
            </button>
            <button
              disabled={analyzing}
              onClick={handleAnalyze}
              className="flex-[2] bg-primary hover:bg-primary-dark text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-amber-500/30"
            >
              {analyzing ? "Scanning..." : "Analisis AI"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
