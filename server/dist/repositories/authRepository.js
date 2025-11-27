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
exports.createPeminjam = exports.findPeminjamByUsername = exports.findAdminByUsername = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const findAdminByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.admin.findUnique({ where: { userAdmin: username } });
});
exports.findAdminByUsername = findAdminByUsername;
const findPeminjamByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjam.findUnique({ where: { userPeminjam: username } });
});
exports.findPeminjamByUsername = findPeminjamByUsername;
const createPeminjam = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.peminjam.create({ data });
});
exports.createPeminjam = createPeminjam;
