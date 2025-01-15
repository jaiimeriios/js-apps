const express = require('express');
const router = express.Router();
const {
    getAllTodos,
    getSingleTodo,
    postTodo,
    updateTodo,
    deleteTodo,
} = require('./todos-controllers');

router.get('/', getAllTodos);
router.get('/:id', getSingleTodo);
router.post('/', postTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
