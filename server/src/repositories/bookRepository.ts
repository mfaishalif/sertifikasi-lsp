import prisma from '../prisma';
import { Buku } from '@prisma/client';

export const getAllBooks = async (): Promise<Buku[]> => {
    return prisma.buku.findMany();
};

export const getBookById = async (id: number): Promise<Buku | null> => {
    return prisma.buku.findUnique({ where: { idBuku: id } });
};

export const createBook = async (data: any): Promise<Buku> => {
    return prisma.buku.create({ data });
};

export const updateBook = async (id: number, data: any): Promise<Buku> => {
    return prisma.buku.update({ where: { idBuku: id }, data });
};

export const deleteBook = async (id: number): Promise<Buku> => {
    return prisma.buku.delete({ where: { idBuku: id } });
};
