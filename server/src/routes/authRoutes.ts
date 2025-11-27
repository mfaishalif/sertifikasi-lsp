import { Router } from 'express';
import * as authController from '../controllers/authController';
import { upload } from '../middlewares/multerConfig';

const router = Router();

router.post('/login', authController.login);
router.post('/register', upload.single('foto'), authController.register);

export default router;
