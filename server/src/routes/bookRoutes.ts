import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/', authenticateToken, authorizeRole(['admin']), bookController.createBook);
router.put('/:id', authenticateToken, authorizeRole(['admin']), bookController.updateBook);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), bookController.deleteBook);

export default router;
