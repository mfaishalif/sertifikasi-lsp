import * as bookRepository from '../repositories/bookRepository';

export const getAllBooks = async () => {
    return bookRepository.getAllBooks();
};

export const getBookById = async (id: number) => {
    const book = await bookRepository.getBookById(id);
    if (!book) throw { statusCode: 404, message: 'Book not found' };
    return book;
};

export const createBook = async (data: any) => {
    return bookRepository.createBook({
        ...data,
        tglTerbit: new Date(data.tglTerbit),
    });
};

export const updateBook = async (id: number, data: any) => {
    await getBookById(id);
    return bookRepository.updateBook(id, {
        ...data,
        tglTerbit: data.tglTerbit ? new Date(data.tglTerbit) : undefined,
    });
};

export const deleteBook = async (id: number) => {
    await getBookById(id);
    return bookRepository.deleteBook(id);
};
