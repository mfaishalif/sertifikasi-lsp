import * as loanRepository from '../repositories/loanRepository';

export const createLoan = async (idPeminjam: number, bookIds: number[]) => {
    if (bookIds.length === 0) {
        throw { statusCode: 400, message: 'No books selected' };
    }
    return loanRepository.createLoan(idPeminjam, bookIds);
};

export const getLoansByPeminjam = async (idPeminjam: number) => {
    return loanRepository.getLoansByPeminjam(idPeminjam);
};

export const getAllLoans = async () => {
    return loanRepository.getAllLoans();
};

export const getLoanById = async (kodePinjam: number) => {
    const loan = await loanRepository.getLoanById(kodePinjam);
    if (!loan) throw { statusCode: 404, message: 'Loan not found' };
    return loan;
};

export const updateLoanStatus = async (kodePinjam: number, status: string, idAdmin: number) => {
    await getLoanById(kodePinjam);
    return loanRepository.updateLoanStatus(kodePinjam, status, idAdmin);
};

export const removeBookFromLoan = async (kodePinjam: number, idBuku: number) => {
    const loan = await getLoanById(kodePinjam);
    if (loan.statusPinjam !== 'diproses') {
        throw { statusCode: 400, message: 'Cannot modify processed loan' };
    }
    return loanRepository.removeBookFromLoan(kodePinjam, idBuku);
};
