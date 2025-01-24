import express from 'express';
const router = express.Router();
import { getAllTodos } from '../controllers/todosControllers.js';

router.get('/todos', getAllTodos);


export default router;





