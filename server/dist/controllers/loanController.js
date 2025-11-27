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
exports.removeBookFromLoan = exports.updateLoanStatus = exports.getLoanById = exports.getAllLoans = exports.getMyLoans = exports.createLoan = void 0;
const loanService = __importStar(require("../services/loanService"));
const createLoan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookIds } = req.body;
        const idPeminjam = req.user.id;
        const loan = yield loanService.createLoan(idPeminjam, bookIds);
        res.status(201).json(loan);
    }
    catch (error) {
        next(error);
    }
});
exports.createLoan = createLoan;
const getMyLoans = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPeminjam = req.user.id;
        const loans = yield loanService.getLoansByPeminjam(idPeminjam);
        res.json(loans);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyLoans = getMyLoans;
const getAllLoans = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loanService.getAllLoans();
        res.json(loans);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllLoans = getAllLoans;
const getLoanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loanService.getLoanById(Number(req.params.id));
        res.json(loan);
    }
    catch (error) {
        next(error);
    }
});
exports.getLoanById = getLoanById;
const updateLoanStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const idAdmin = req.user.id;
        const loan = yield loanService.updateLoanStatus(Number(req.params.id), status, idAdmin);
        res.json(loan);
    }
    catch (error) {
        next(error);
    }
});
exports.updateLoanStatus = updateLoanStatus;
const removeBookFromLoan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loanService.removeBookFromLoan(Number(req.params.id), Number(req.params.bookId));
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.removeBookFromLoan = removeBookFromLoan;
