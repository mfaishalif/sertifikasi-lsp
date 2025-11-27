"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    role: zod_1.z.enum(['admin', 'peminjam']),
});
exports.registerSchema = zod_1.z.object({
    nama: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
});
