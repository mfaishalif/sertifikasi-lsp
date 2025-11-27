import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository';

const SALT_ROUNDS = 10;

export const login = async (username: string, password: string, role: 'admin' | 'peminjam') => {
    let user;
    if (role === 'admin') {
        user = await authRepository.findAdminByUsername(username);
    } else {
        user = await authRepository.findPeminjamByUsername(username);
    }

    if (!user) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const dbPassword = role === 'admin' ? (user as any).passAdmin : (user as any).passPeminjam;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
        { id: role === 'admin' ? (user as any).idAdmin : (user as any).idPeminjam, role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    return { token, user };
};

export const register = async (data: any, file?: Express.Multer.File) => {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const existingUser = await authRepository.findPeminjamByUsername(data.username);
    if (existingUser) {
        throw { statusCode: 400, message: 'Username already exists' };
    }

    const newUser = await authRepository.createPeminjam({
        namaPeminjam: data.nama,
        userPeminjam: data.username,
        passPeminjam: hashedPassword,
        fotoPeminjam: file ? file.filename : null,
    });

    return newUser;
};
