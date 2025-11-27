import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.enum(['admin', 'peminjam']),
});

export const registerSchema = z.object({
    nama: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(6),
});
