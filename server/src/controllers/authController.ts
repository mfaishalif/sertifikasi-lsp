import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { loginSchema, registerSchema } from '../utils/validationSchemas';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, role } = loginSchema.parse(req.body);
        const result = await authService.login(username, password, role);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Parse body manually or use a library that handles FormData validation
        const body = {
            nama: req.body.nama,
            username: req.body.username,
            password: req.body.password
        }
        const validatedData = registerSchema.parse(body);
        const result = await authService.register(validatedData, req.file);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};
