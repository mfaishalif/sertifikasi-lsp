# Sistem Drive-Thru Perpustakaan Arcadia

Sebuah aplikasi web full-stack untuk mengelola peminjaman buku perpustakaan melalui sistem drive-thru yang praktis. Anggota dapat memesan buku secara online, dan administrator dapat mengelola seluruh proses peminjaman mulai dari persetujuan hingga pengembalian.

## Tech Stack (Teknologi yang Digunakan)

**Backend:**
* **Framework:** Express.js dengan TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma v7
* **Autentikasi:** JWT + Bcrypt
* **Unggah File:** Multer
* **Validasi:** Zod

**Frontend:**
* **Framework:** React 18 + Vite
* **Bahasa:** TypeScript
* **Styling:** Tailwind CSS
* **Komponen UI:** Shadcn UI
* **Manajemen State:** TanStack Query (React Query)
* **Formulir:** React Hook Form + Zod
* **Routing:** React Router
* **HTTP Client:** Axios

## Fitur Utama

* **Akses Berbasis Peran:** Dashboard dan izin akses yang terpisah untuk Administrator dan Anggota (Peminjam).
* **Operasi CRUD Lengkap:** Administrator dapat mengelola buku (Buat, Baca, Ubah, Hapus).
* **Manajemen Peminjaman:** Alur kerja peminjaman menyeluruh: pemesanan, persetujuan/penolakan, dan konfirmasi pengembalian.
* **Katalog Buku Online:** Anggota dapat menelusuri buku yang tersedia dan menambahkannya ke keranjang.
* **Autentikasi Aman:** Autentikasi berbasis JWT dengan hashing kata sandi.
* **Registrasi Pengguna:** Anggota dapat mendaftar dengan opsi foto profil.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat berikut:
* [Node.js](https://nodejs.org/) (disarankan v18 atau yang lebih baru)
* [npm](https://www.npmjs.com/)
* [PostgreSQL](https://www.postgresql.org/download/)

## Persiapan dan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda.

### 1. Konfigurasi Database

1.  **Buat Database PostgreSQL:**
    * Buka klien PostgreSQL Anda (misalnya, `psql` atau alat GUI seperti pgAdmin).
    * Buat database baru. Untuk proyek ini, nama defaultnya adalah `arcadia_library`.

    ```sql
    CREATE DATABASE arcadia_library;
    ```

2.  **Konfigurasi Variabel Lingkungan (Environment Variables):**
    * Masuk ke direktori `server/`.
    * Buat salinan file `.env.example` dan beri nama `.env`.
    * Buka file `.env` dan perbarui `DATABASE_URL` dengan string koneksi PostgreSQL Anda. Seharusnya terlihat seperti ini:

    ```
    DATABASE_URL="postgresql://<USER_ANDA>:<PASSWORD_ANDA>@localhost:5432/arcadia_library?schema=public"
    ```

### 2. Konfigurasi Backend

1.  **Masuk ke direktori backend:**
    ```bash
    cd server
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Terapkan migrasi database:** Ini akan membuat tabel-tabel yang diperlukan di database Anda.
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Seed database:** Langkah ini akan mengisi database dengan akun admin dan data buku contoh.
    ```bash
    npm run seed
    ```

5.  **Jalankan server backend:**
    ```bash
    npm run dev
    ```
    Backend akan berjalan di `http://localhost:3000`.

### 3. Konfigurasi Frontend

1.  **Buka terminal baru** dan masuk ke direktori frontend:
    ```bash
    cd client
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan frontend:**
    ```bash
    npm run dev
    ```
    Frontend akan berjalan di `http://localhost:5173`.

## Cara Penggunaan

Setelah kedua server berjalan, Anda dapat mengakses aplikasi melalui browser di `http://localhost:5173`.

**Akun Admin:**
* **Username:** `admin`
* **Password:** `admin123`