import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Seed Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.upsert({
        where: { userAdmin: 'admin' },
        update: {},
        create: {
            namaAdmin: 'Administrator',
            userAdmin: 'admin',
            passAdmin: hashedPassword,
        },
    });
    console.log({ admin });

    // Seed Books
    const booksData = [
        {
            judulBuku: 'Laskar Pelangi',
            tglTerbit: new Date('2005-01-01'),
            namaPengarang: 'Andrea Hirata',
            namaPenerbit: 'Bentang Pustaka',
        },
        {
            judulBuku: 'Bumi Manusia',
            tglTerbit: new Date('1980-01-01'),
            namaPengarang: 'Pramoedya Ananta Toer',
            namaPenerbit: 'Hasta Mitra',
        },
        {
            judulBuku: 'Pulang',
            tglTerbit: new Date('2015-01-01'),
            namaPengarang: 'Leila S. Chudori',
            namaPenerbit: 'KPG',
        },
        {
            judulBuku: 'Cantik Itu Luka',
            tglTerbit: new Date('2002-01-01'),
            namaPengarang: 'Eka Kurniawan',
            namaPenerbit: 'Gramedia Pustaka Utama',
        },
        {
            judulBuku: 'Laut Bercerita',
            tglTerbit: new Date('2017-01-01'),
            namaPengarang: 'Leila S. Chudori',
            namaPenerbit: 'KPG',
        },
    ];

    for (const book of booksData) {
        await prisma.buku.create({
            data: book,
        });
    }
    console.log('Books seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
