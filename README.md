# 🏠 Sekamar - Teman Sekamar Ideal, Tanpa Drama

**Sekamar** adalah aplikasi web pencari teman kos (roommate) yang menghubungkan mahasiswa berdasarkan kecocokan gaya hidup dan kebiasaan, bukan hanya sekadar lokasi.

## Sekamar App Preview
<img width="1918" height="1089" alt="image" src="https://github.com/user-attachments/assets/8e5a0cfe-01f7-4ebc-8a0d-b353cbc32270" />

---

## Problem Statement (Latar Belakang Masalah)

Mencari teman sekamar seringkali seperti "membeli kucing dalam karung". Banyak mahasiswa yang mengalami konflik, stres, hingga harus pindah kos karena ketidakcocokan gaya hidup. Masalah nyata yang sering terjadi meliputi:
- **Perbedaan Jam Tidur:** Konflik antara yang suka begadang (*Night Owl*) dan bangun pagi (*Early Bird*).
- **Gaya Hidup:** Masalah toleransi asap rokok atau hewan peliharaan.
- **Kebersihan:** Perbedaan standar kebersihan (Sangat resik vs Santai).

Aplikasi pencari kos yang ada saat ini mayoritas hanya menampilkan fisik bangunan, namun mengabaikan **aspek manusia (social compatibility)** di dalamnya.

---

## Solution Overview (Solusi)

**Sekamar** hadir sebagai solusi preventif dengan fitur utama:
1.  **Habit Matching:** Mewajibkan pengguna mencantumkan kebiasaan (Rokok, Jam Tidur, Kebersihan) pada setiap iklan.
2.  **Smart Badges:** Tampilan visual (*badges*) pada kartu iklan memudahkan pencari melihat kecocokan secara instan.
3.  **Direct Contact:** Konversi otomatis nomor HP menjadi link WhatsApp (`wa.me`) untuk komunikasi yang cepat dan aman.
4.  **Edit & Control:** Pemilik iklan memiliki kontrol penuh untuk mengedit atau menghapus iklan jika teman sekamar sudah ditemukan.

---

## Tech Stack

Proyek ini dibangun menggunakan **MERN Stack** modern dengan dukungan **TypeScript** untuk kode yang lebih aman dan terstruktur.

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend** | React.js (Vite), TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT (JSON Web Token), Bcrypt |
| **Storage** | Multer (Local Image Upload) |

---

## Fitur Utama

1. **Authentication System:** Login & Register aman menggunakan enkripsi password dan JWT Token.
2. **CRUD Postingan:** User bisa membuat, melihat, mengedit, dan menghapus iklan mencari teman.
3. **Image Upload:** Fitur upload foto kamar menggunakan `FormData` dan `Multer`.
4. **Habit Tracker:** Penanda visual untuk status Perokok/Non-Perokok, Jam Tidur, dan Kebersihan.
5. **WhatsApp Generator:** Input nomor HP otomatis diubah menjadi link chat WhatsApp yang valid.
6. **Authorization:** Tombol Edit/Hapus hanya muncul pada iklan milik user yang sedang login.

---

## Cara Menjalankan Project (Setup Instructions)

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal (Localhost).

### Prasyarat
* Node.js (v16 ke atas)
* MongoDB Community Server (Harus sudah berjalan)

### 1. Clone Repository
```bash
git clone [https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git](https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git)
cd Sekamar
```

### 2. Run Backend (Server)
```bash
# Masuk ke folder server
cd server

# Install dependencies (library)
npm install

# Jalankan server
npx nodemon src/index.ts
```
Jika berhasil, akan muncul text: Server running on port 5000 & MongoDB Connected.

### 3. Run Frontend (Client)
```bash
# Masuk ke folder client
cd client

# Install dependencies
npm install

# Jalankan React
npm run dev
```
Jika berhasil, akan muncul link: `http://localhost:5173`.

### 4. Buka Web
Buka browser dan kunjungi link:  `http://localhost:5173`

#### Note
- Pastikan MongoDB di device sudah menyala sebelum menjalankan server backend.
- Jangan mematikan terminal **Server** saat menggunakan web, karena Frontend membutuhkan API dari Server agar bisa Login/Register/Upload.
