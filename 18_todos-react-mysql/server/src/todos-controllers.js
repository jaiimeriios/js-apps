const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo',
    password: 'SQL12345',
});

// Get All
const getAllTodos =
    ('/todos',
    (req, res) => {
        const query = 'SELECT * FROM todos';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching todos:', err);
                return res
                    .status(500)
                    .json({ message: 'Error fetching todos', error: err });
            }
            res.json(results);
        });
    });

// GET Single
const getSingleTodo =
    ('/todos/:id',
    (req, res) => {
        const todoID = req.params.id;
        const query = 'SELECT * FROM todos WHERE id = ?';

        db.query(query, [todoID], (err, results) => {
            if (err) {
                console.error('Error fetching todo:', err);
                return res
                    .status(500)
                    .json({ message: 'Error fetching todo', error: err });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.json(results[0]); // Return the single todo as JSON
        });
    });

// POST
const postTodo =
    ('/todos',
    (req, res) => {
        const { todo, description, important } = req.body;

        if (!todo) {
            return res.status(400).json({ message: 'Todo is required' });
        }

        const query =
            'INSERT INTO todos (todo, description, important) VALUES (?, ?, ?)';

        db.query(
            query,
            [todo, description, important || false],
            (err, results) => {
                if (err) {
                    console.error('Error creating todo:', err);
                    return res
                        .status(500)
                        .json({ message: 'Error creating todo', error: err });
                }
                res.status(201).json({
                    todo,
                    description,
                    important,
                });
            }
        );
    });

// UPDATE
const updateTodo =
    ('/todos/:id',
    (req, res) => {
        const todoID = req.params.id;
        const { todo, description, important } = req.body;

        if (!todo) {
            return res.status(400).json({ message: 'Todo is required' });
        }

        const query =
            'UPDATE todos SET todo = ?, description = ?, important = ? WHERE id = ?';
        db.query(
            query,
            [todo, description, important || false, todoID],
            (err, results) => {
                if (err) {
                    console.error('Error updating todo:', err);
                    return res
                        .status(500)
                        .json({ message: 'Error updating todo', error: err });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: 'Todo not found' });
                }

                res.json({
                    id: todoID,
                    todo,
                    description,
                    important,
                });
            }
        );
    });

// Delete
const deleteTodo =
    ('/todos/:id',
    (req, res) => {
        const todoID = req.params.id;

        const query = 'DELETE FROM todos WHERE id = ?';
        db.query(query, [todoID], (err, results) => {
            if (err) {
                console.error('Error deleting todo:', err);
                return res
                    .status(500)
                    .json({ message: 'Error deleting todo', error: err });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.status(204).json();
        });
    });

module.exports = {
    getAllTodos,
    getSingleTodo,
    postTodo,
    updateTodo,
    deleteTodo,
};
