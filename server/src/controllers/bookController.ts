import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookService.getBookById(Number(req.params.id));
        res.json(book);
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookService.updateBook(Number(req.params.id), req.body);
        res.json(book);
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await bookService.deleteBook(Number(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
