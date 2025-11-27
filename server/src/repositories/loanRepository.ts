import prisma from '../prisma';
import { Peminjaman } from '@prisma/client';

export const createLoan = async (idPeminjam: number, bookIds: number[]): Promise<Peminjaman> => {
    return prisma.peminjaman.create({
        data: {
            idPeminjam,
            detilPeminjaman: {
                create: bookIds.map((idBuku) => ({ idBuku })),
            },
        },
        include: {
            detilPeminjaman: {
                include: {
                    buku: true,
                },
            },
        },
    });
};

export const getLoansByPeminjam = async (idPeminjam: number): Promise<Peminjaman[]> => {
    return prisma.peminjaman.findMany({
        where: { idPeminjam },
        include: {
            detilPeminjaman: {
                include: {
                    buku: true,
                },
            },
        },
        orderBy: { tglPesan: 'desc' },
    });
};

export const getAllLoans = async (): Promise<Peminjaman[]> => {
    return prisma.peminjaman.findMany({
        include: {
            peminjam: true,
            detilPeminjaman: {
                include: {
                    buku: true,
                },
            },
        },
        orderBy: { tglPesan: 'desc' },
    });
};

export const getLoanById = async (kodePinjam: number): Promise<Peminjaman | null> => {
    return prisma.peminjaman.findUnique({
        where: { kodePinjam },
        include: {
            peminjam: true,
            detilPeminjaman: {
                include: {
                    buku: true,
                },
            },
        },
    });
};

export const updateLoanStatus = async (
    kodePinjam: number,
    status: string,
    idAdmin?: number
): Promise<Peminjaman> => {
    const data: any = { statusPinjam: status };
    if (idAdmin) data.idAdmin = idAdmin;
    if (status === 'selesai') data.tglKembali = new Date();

    return prisma.peminjaman.update({
        where: { kodePinjam },
        data,
    });
};

export const removeBookFromLoan = async (kodePinjam: number, idBuku: number) => {
    return prisma.detilPeminjaman.delete({
        where: {
            kodePinjam_idBuku: {
                kodePinjam,
                idBuku,
            },
        },
    });
};
