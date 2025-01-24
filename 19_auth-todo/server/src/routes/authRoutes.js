import express from 'express';
const router = express.Router();
import { register, loginUser } from '../controllers/authControllers.js';

router.post('/register', register);
router.post('/login', loginUser);

export default router;
