export interface User {
    id: number;
    nama: string;
    username: string;
    role: 'admin' | 'peminjam';
    foto?: string;
}

export interface Book {
    idBuku: number;
    judulBuku: string;
    tglTerbit: string;
    namaPengarang: string;
    namaPenerbit: string;
}

export interface Loan {
    kodePinjam: number;
    idPeminjam: number;
    idAdmin?: number;
    tglPesan: string;
    tglAmbil?: string;
    tglWajibKembali?: string;
    tglKembali?: string;
    statusPinjam: 'diproses' | 'disetujui' | 'ditolak' | 'selesai';
    peminjam?: {
        idPeminjam: number;
        namaPeminjam: string;
        userPeminjam: string;
        fotoPeminjam?: string;
    };
    detilPeminjaman: {
        kodePinjam: number;
        idBuku: number;
        buku: Book;
    }[];
}
