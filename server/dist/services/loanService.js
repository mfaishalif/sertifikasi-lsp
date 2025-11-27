"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookFromLoan = exports.updateLoanStatus = exports.getLoanById = exports.getAllLoans = exports.getLoansByPeminjam = exports.createLoan = void 0;
const loanRepository = __importStar(require("../repositories/loanRepository"));
const createLoan = (idPeminjam, bookIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (bookIds.length === 0) {
        throw { statusCode: 400, message: 'No books selected' };
    }
    return loanRepository.createLoan(idPeminjam, bookIds);
});
exports.createLoan = createLoan;
const getLoansByPeminjam = (idPeminjam) => __awaiter(void 0, void 0, void 0, function* () {
    return loanRepository.getLoansByPeminjam(idPeminjam);
});
exports.getLoansByPeminjam = getLoansByPeminjam;
const getAllLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    return loanRepository.getAllLoans();
});
exports.getAllLoans = getAllLoans;
const getLoanById = (kodePinjam) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield loanRepository.getLoanById(kodePinjam);
    if (!loan)
        throw { statusCode: 404, message: 'Loan not found' };
    return loan;
});
exports.getLoanById = getLoanById;
const updateLoanStatus = (kodePinjam, status, idAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getLoanById)(kodePinjam);
    return loanRepository.updateLoanStatus(kodePinjam, status, idAdmin);
});
exports.updateLoanStatus = updateLoanStatus;
const removeBookFromLoan = (kodePinjam, idBuku) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield (0, exports.getLoanById)(kodePinjam);
    if (loan.statusPinjam !== 'diproses') {
        throw { statusCode: 400, message: 'Cannot modify processed loan' };
    }
    return loanRepository.removeBookFromLoan(kodePinjam, idBuku);
});
exports.removeBookFromLoan = removeBookFromLoan;
