# SEAL Frontend Technical Test - Krisna Taufik

## 📌 Deskripsi

Project ini merupakan implementasi desain Figma menjadi website frontend yang menampilkan berita menggunakan API publik. Project ini dibuat sebagai bagian dari Technical Test Magang Mandiri SEAL 2026 untuk posisi Frontend Developer.

## 🚀 Teknologi yang Digunakan

* React.js (Vite)
* Tailwind CSS
* JavaScript (ES6+)
* Fetch API
* React Router DOM

## 🌐 API

Menggunakan API berita dari:
https://berita-indo-api-next.vercel.app

Endpoint yang digunakan di dalam project ini menangani multiple source, contohnya:

* `/api/cnn-news/nasional`
* `/api/cnn-news/teknologi`
* `/api/antara-news/terkini`

Project ini menggunakan konfigurasi proxy Vite dan Vercel Rewrites untuk bypass issue CORS (Cross-Origin Resource Sharing).

## ✨ Fitur Utama

* Menampilkan berita dari API secara live
* Fetching dari dual source secara paralel (CNN Indonesia & Antara News) dengan fallback
* Filter kategori berita (terbaru, hiburan, gaya hidup, olahraga, dll) via Navigation Bar
* Responsive design (mobile & desktop) mirip mockup
* Navigasi antar kategori (Routing)
* Caching data in-memory di sisi *client* agar web terasa cepat saat berpindah kategori
* Loading state saat mengambil data
* Error handling jika terjadi kesalahan (seperti API timeout atau down)

## 🖼️ Preview

Tambahkan screenshot project di sini (opsional)

## 🔗 Live Demo

https://your-project.vercel.app

## ⚙️ Cara Menjalankan Project

1. Clone repository
   ```bash
   git clone https://github.com/username/seal-frontend-test.git
   ```

2. Masuk ke folder project
   ```bash
   cd seal-frontend-test-krisna
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Jalankan project
   ```bash
   npm run dev
   ```

## 📁 Struktur Project

```
src/
├── components/     # Komponen UI seperti Navbar, Footer, Hero, dan NewsCard
├── pages/          # Halaman utama seperti Home dan Detail Berita
├── services/       # File API (api.js) berisi logika request fetch dan caching
├── App.jsx         # File routing utama aplikasi
├── index.css       # Tailwind entry dan custom CSS
└── main.jsx        # Root render script
```

## 👤 Author

**Krisna Taufik**
Frontend Developer Intern Candidate
