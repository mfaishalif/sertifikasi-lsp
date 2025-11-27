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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanController = __importStar(require("../controllers/loanController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Peminjam Routes
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['peminjam']), loanController.createLoan);
router.get('/my', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['peminjam']), loanController.getMyLoans);
// Admin Routes
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['admin']), loanController.getAllLoans);
router.put('/:id/status', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['admin']), loanController.updateLoanStatus);
router.delete('/:id/books/:bookId', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['admin']), loanController.removeBookFromLoan);
// Shared Routes (or Admin only depending on requirements, but usually detail is visible to owner too)
// For simplicity, let's allow both to view detail if they have access (logic in service/controller could refine this)
router.get('/:id', authMiddleware_1.authenticateToken, loanController.getLoanById);
exports.default = router;
