import { Request, Response, NextFunction } from 'express';
import * as loanService from '../services/loanService';

export const createLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookIds } = req.body;
        const idPeminjam = (req as any).user.id;
        const loan = await loanService.createLoan(idPeminjam, bookIds);
        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
};

export const getMyLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idPeminjam = (req as any).user.id;
        const loans = await loanService.getLoansByPeminjam(idPeminjam);
        res.json(loans);
    } catch (error) {
        next(error);
    }
};

export const getAllLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loans = await loanService.getAllLoans();
        res.json(loans);
    } catch (error) {
        next(error);
    }
};

export const getLoanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loan = await loanService.getLoanById(Number(req.params.id));
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

export const updateLoanStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        const idAdmin = (req as any).user.id;
        const loan = await loanService.updateLoanStatus(Number(req.params.id), status, idAdmin);
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

export const removeBookFromLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loanService.removeBookFromLoan(Number(req.params.id), Number(req.params.bookId));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
