"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Seed Admin
        const hashedPassword = yield bcrypt_1.default.hash('admin123', 10);
        const admin = yield prisma.admin.upsert({
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
            yield prisma.buku.create({
                data: book,
            });
        }
        console.log('Books seeded');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
