import { authenticateToken } from '../middleware/authMiddleware.js';
import {
    getTodos,
    postTodos,
    updateTodos,
    deleteTodos,
} from '../models/todosModels.js';

export const getAllTodos = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await getTodos(req.userId);
        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting todos' });
    }
};

export const createTodo = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await postTodos(req.userId, req.body.todo);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating Todo' });
    }
};

export const updateTodo = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await updateTodos(req.body.todo, req.params.id);
        res.status(201).json(req.body.todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating todo' });
    }
};

export const deleteTodo = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await deleteTodos(req.params.id);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting todo' });
    }
};
