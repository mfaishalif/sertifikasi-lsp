import prisma from '../prisma';
import { Admin, Peminjam } from '@prisma/client';

export const findAdminByUsername = async (username: string): Promise<Admin | null> => {
    return prisma.admin.findUnique({ where: { userAdmin: username } });
};

export const findPeminjamByUsername = async (username: string): Promise<Peminjam | null> => {
    return prisma.peminjam.findUnique({ where: { userPeminjam: username } });
};

export const createPeminjam = async (data: any): Promise<Peminjam> => {
    return prisma.peminjam.create({ data });
};
