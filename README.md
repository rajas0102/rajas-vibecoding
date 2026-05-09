# StyleMatch AI (FitIn)
Aplikasi AI Fashion Stylist yang dirancang khusus untuk pengguna Indonesia.

## Tech Stack
* **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion (Mensimulasikan UI Mobile Flutter)
* **Backend (Mock)**: Node.js (Vite) / Representasi FastAPI
* **AI Analysis**: Gemini 3.1 Pro (Menggantikan MediaPipe & GPT-4 Vision untuk Body & Face Analysis)
* **AI Recommendation**: Pendekatan Hybrid dengan Gemini API + curated JSON database
* **Virtual Try-On**: Simulated via UI (Representasi IDM-VTON)

## Struktur Folder Project
* `/src/screens/`: Berisi semua screen UI utama dari aplikasi (mengadopsi konsep Navigation/Router Mobile).
* `/src/services/` : Layer integrasi API eksternal (termasuk Gemini AI).
* `/src/data/`: Data statis produk fashion (sebagai Mock Database).
* `/src/store.ts`: State management sederhana menggunakan Zustand.
* `/backend_fastapi/`: Struktur dan representasi Backend Python menggunakan FastAPI sesuai permintaan.
* `/flutter_mobile/`: Struktur representasi dasar Flutter app.

## Setup & Instalasi Lokal
1. Pastikan Anda memiliki Node.js 18+ terinstall.
2. Clone repository ini.
3. Jalankan perintah `npm install` untuk menginstall dependencies React & UI.
4. Buat file `.env.local` dan tambahkan API Key Gemini Anda:
   ```
   GEMINI_API_KEY="YOUR_API_KEY_HERE"
   ```
5. Jalankan `npm run dev` untuk memulai server lokal. Buka browser dan akses ke URL yang diberikan. (Untuk UX terbaik, gunakan tampilan Mobile Responsive pada DevTools browser Anda).

## Menjalankan Backend Python (Opsional)
Jika Anda ingin mencoba endpoint FastAPI di server terpisah:
1. Pindah ke direktori `backend_fastapi`
2. Install dependencies: `pip install fastapi uvicorn pydantic python-multipart`
3. Jalankan server: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

---
*Dibuat untuk event #JuaraVibeCoding Google*
