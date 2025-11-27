-- CreateTable
CREATE TABLE "peminjam" (
    "id_peminjam" SERIAL NOT NULL,
    "nama_peminjam" TEXT NOT NULL,
    "tgl_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_peminjam" TEXT NOT NULL,
    "pass_peminjam" TEXT NOT NULL,
    "foto_peminjam" TEXT,
    "status_peminjam" TEXT NOT NULL DEFAULT 'aktif',

    CONSTRAINT "peminjam_pkey" PRIMARY KEY ("id_peminjam")
);

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "nama_admin" TEXT NOT NULL,
    "user_admin" TEXT NOT NULL,
    "pass_admin" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "buku" (
    "id_buku" SERIAL NOT NULL,
    "judul_buku" TEXT NOT NULL,
    "tgl_terbit" TIMESTAMP(3) NOT NULL,
    "nama_pengarang" TEXT NOT NULL,
    "nama_penerbit" TEXT NOT NULL,

    CONSTRAINT "buku_pkey" PRIMARY KEY ("id_buku")
);

-- CreateTable
CREATE TABLE "peminjaman" (
    "kode_pinjam" SERIAL NOT NULL,
    "id_admin" INTEGER,
    "id_peminjam" INTEGER NOT NULL,
    "tgl_pesan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tgl_ambil" TIMESTAMP(3),
    "tgl_wajibkembali" TIMESTAMP(3),
    "tgl_kembali" TIMESTAMP(3),
    "status_pinjam" TEXT NOT NULL DEFAULT 'diproses',

    CONSTRAINT "peminjaman_pkey" PRIMARY KEY ("kode_pinjam")
);

-- CreateTable
CREATE TABLE "detil_peminjaman" (
    "kode_pinjam" INTEGER NOT NULL,
    "id_buku" INTEGER NOT NULL,

    CONSTRAINT "detil_peminjaman_pkey" PRIMARY KEY ("kode_pinjam","id_buku")
);

-- CreateIndex
CREATE UNIQUE INDEX "peminjam_user_peminjam_key" ON "peminjam"("user_peminjam");

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_admin_key" ON "admin"("user_admin");

-- AddForeignKey
ALTER TABLE "peminjaman" ADD CONSTRAINT "peminjaman_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peminjaman" ADD CONSTRAINT "peminjaman_id_peminjam_fkey" FOREIGN KEY ("id_peminjam") REFERENCES "peminjam"("id_peminjam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detil_peminjaman" ADD CONSTRAINT "detil_peminjaman_kode_pinjam_fkey" FOREIGN KEY ("kode_pinjam") REFERENCES "peminjaman"("kode_pinjam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detil_peminjaman" ADD CONSTRAINT "detil_peminjaman_id_buku_fkey" FOREIGN KEY ("id_buku") REFERENCES "buku"("id_buku") ON DELETE RESTRICT ON UPDATE CASCADE;
