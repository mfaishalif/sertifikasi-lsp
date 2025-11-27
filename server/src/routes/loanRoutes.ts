import { Router } from 'express';
import * as loanController from '../controllers/loanController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

// Peminjam Routes
router.post('/', authenticateToken, authorizeRole(['peminjam']), loanController.createLoan);
router.get('/my', authenticateToken, authorizeRole(['peminjam']), loanController.getMyLoans);

// Admin Routes
router.get('/', authenticateToken, authorizeRole(['admin']), loanController.getAllLoans);
router.put('/:id/status', authenticateToken, authorizeRole(['admin']), loanController.updateLoanStatus);
router.delete('/:id/books/:bookId', authenticateToken, authorizeRole(['admin']), loanController.removeBookFromLoan);

// Shared Routes (or Admin only depending on requirements, but usually detail is visible to owner too)
// For simplicity, let's allow both to view detail if they have access (logic in service/controller could refine this)
router.get('/:id', authenticateToken, loanController.getLoanById);

export default router;
