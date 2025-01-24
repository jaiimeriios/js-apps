import express from 'express';
const router = express.Router();
import {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from '../controllers/todosControllers.js';

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;
