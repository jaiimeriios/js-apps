import express from 'express';
const router = express.Router();
import { getAllTodos, createTodo } from '../controllers/todosControllers.js';

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);

export default router;
