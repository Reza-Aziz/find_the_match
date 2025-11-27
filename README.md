# FIND THE MATCH

## Deskripsi Project

FIND THE MATCH adalah aplikasi web permainan tanya-jawab sederhana. Pemain melihat pertanyaan satu per satu; jika jawaban benar, pasangan pertanyaan-jawaban akan dihapus dari database. Jika jawaban salah, pertanyaan tetap ada dan dapat dicoba lagi sampai semua pertanyaan terjawab benar.

Aplikasi ini memiliki dua bagian utama:

- `Backend/` — REST API menggunakan Node.js, Express, MongoDB (Mongoose), JWT authentication.
- `Frontend/` — Single Page Application menggunakan React + Vite, Tailwind CSS, Zustand untuk state.

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- Frontend: React (Vite), React Router, Axios, Zustand, Tailwind CSS

## Struktur Folder

```
Find The Match/
├── Backend/
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── app.js
│       └── server.js
└── Frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        ├── components/
        ├── pages/
        ├── stores/
        └── styles/
```

## Prasyarat

- Node.js (disarankan v18+)
- Akun MongoDB Atlas (untuk host database) atau MongoDB yang dapat diakses dari lingkungan pengembangan
- npm (disertakan bersama Node.js)

## Instalasi Backend

1. Install dependencies:

```powershell
npm install
```

2. Buat koneksi MongoDB Atlas (jika belum):

   - Daftar/login ke https://www.mongodb.com/cloud/atlas
   - Buat Project baru dan Cluster (pilih tier gratis jika cukup)
   - Di panel Cluster, klik "Connect" → "Connect your application"
   - Salin connection string (format `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/<dbname>?retryWrites=true&w=majority`)
   - Pastikan Anda membuat user database (username/password) dan mengizinkan IP akses (bisa 0.0.0.0/0 untuk pengembangan)

3. Copy file lingkungan dan isi variabel (PowerShell):

```powershell
copy .env.example .env
```

Edit file `.env` dan isi `MONGODB_URI` dengan connection string dari Atlas (ganti `<username>`, `<password>`, `<dbname>` pada string). Isi juga `JWT_SECRET` dengan string rahasia acak.

Contoh `.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/findthematch?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

5. Jalankan server (mode development):

```powershell
npm run dev
```

Server akan berjalan di `http://localhost:5000` (atau port sesuai `.env`).

## Instalasi Frontend

1. Install dependencies:

```powershell
npm install
```

2. Jalankan dev server Vite:

```powershell
npm run dev
```

Aplikasi frontend biasanya akan tersedia di `http://localhost:3000`.

## Cara Penggunaan

1. Buka frontend di browser (`/`) → halaman beranda.
2. Registrasi user pertama: user pertama yang mendaftar otomatis diberi role `admin`.
3. Login sebagai admin → buka halaman `Admin` untuk menambah pertanyaan.
4. Logout dan registrasi/login sebagai player.
5. Masuk ke halaman `Play` untuk mulai bermain: tampil satu per satu, bila jawaban benar maka pertanyaan dihapus dari server.
6. Ketika semua pertanyaan terjawab, pengguna akan diarahkan ke halaman `Finish`.

## API Endpoints

Semua respons API konsisten dengan format:

- Success: `{ success: true, data: ... }`
- Error: `{ success: false, message: '...' }`

Base URL: `http://localhost:5000/api`

Authentication: header `Authorization: Bearer <token>` untuk route yang dilindungi.

Auth

- `POST /api/auth/register` — body `{ username, email, password }` — registrasi (user pertama → admin)
- `POST /api/auth/login` — body `{ email, password }` — login
- `GET /api/auth/me` — (protected) mendapatkan profile user

Questions

- `GET /api/questions` — ambil semua pertanyaan (public)

Answer

- `POST /api/answer` — (protected) body `{ questionId, userAnswer }` — mengirim jawaban; server akan membandingkan setelah dinormalisasi (trim + lowercase). Jika benar, pertanyaan akan dihapus dan respons `{ success: true, data: { correct: true } }`, jika salah akan `{ success: true, data: { correct: false } }`.

Admin (harus menggunakan token user dengan role `admin`)

- `GET /api/admin/questions` — semua pertanyaan
- `POST /api/admin/questions` — body `{ question, answer }` — buat pertanyaan baru
- `DELETE /api/admin/questions/:id` — hapus pertanyaan

## Validasi & Normalisasi

- Email akan dinormalisasi menjadi lowercase saat registrasi/login.
- Password minimal 6 karakter saat registrasi.
- Saat submit jawaban, jawaban dinormalisasi dengan `.trim().toLowerCase()` sebelum dibandingkan.

## Troubleshooting

- Jika backend gagal connect ke MongoDB: periksa `MONGODB_URI` di `.env`, pastikan user/password benar dan IP whitelist di MongoDB Atlas.
- Error 401 saat akses API yang dilindungi: pastikan token dikirim di header `Authorization: Bearer <token>` dan token belum kadaluarsa.
- Jika port sudah terpakai: ubah `PORT` di `.env` atau jalankan pada port berbeda.

## Catatan Pengembang

- Backend menggunakan CommonJS (`require/module.exports`).
- Frontend menggunakan ES Modules (Vite + React).
- File utama backend: `src/server.js`, `src/app.js`.
- File utama frontend: `src/main.jsx`, `src/App.jsx`.

---

Jika Anda ingin, saya bisa menjalankan `npm install` dan `npm run dev` di environment saat ini (perlu akses terminal) atau membantu membuat file `.env` contoh berisi placeholder yang lebih lengkap.

Selamat! Semua file proyek telah dibuat sesuai spesifikasi.
