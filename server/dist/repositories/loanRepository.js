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
exports.removeBookFromLoan = exports.updateLoanStatus = exports.getLoanById = exports.getAllLoans = exports.getLoansByPeminjam = exports.createLoan = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createLoan = (idPeminjam, bookIds) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjaman.create({
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
});
exports.createLoan = createLoan;
const getLoansByPeminjam = (idPeminjam) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjaman.findMany({
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
});
exports.getLoansByPeminjam = getLoansByPeminjam;
const getAllLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjaman.findMany({
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
});
exports.getAllLoans = getAllLoans;
const getLoanById = (kodePinjam) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjaman.findUnique({
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
});
exports.getLoanById = getLoanById;
const updateLoanStatus = (kodePinjam, status, idAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { statusPinjam: status };
    if (idAdmin)
        data.idAdmin = idAdmin;
    if (status === 'selesai')
        data.tglKembali = new Date();
    return prisma_1.default.peminjaman.update({
        where: { kodePinjam },
        data,
    });
});
exports.updateLoanStatus = updateLoanStatus;
const removeBookFromLoan = (kodePinjam, idBuku) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.detilPeminjaman.delete({
        where: {
            kodePinjam_idBuku: {
                kodePinjam,
                idBuku,
            },
        },
    });
});
exports.removeBookFromLoan = removeBookFromLoan;
