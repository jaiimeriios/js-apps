import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const getTodos = async (user_id) => {
    const result = pool.query(
        'SELECT * FROM auth_todos WHERE user_id = ?',
        [user_id],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching todos' });
            } else {
                console.log(results);
                res.json(results);
            }
        }
    );
    return result;
};

export const postTodos = async (user_id, todo) => {
    const result = pool.query(
        'INSERT INTO auth_todos (user_id, todo) VALUES (?,?)',
        [user_id, todo],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching todos' });
            } else {
                console.log(results);
                res.json(results);
            }
        }
    );
    return result;
};

export const updateTodos = async (newTodo, todo_id) => {
    const result = pool.query(
        'UPDATE auth_todos SET todo = ? WHERE id = ?',
        [newTodo, todo_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error updating todo' });
            } else {
                res.json({ message: 'Todo updated successfully' });
            }
        }
    );
    return result;
};

export const deleteTodos = async (todo_id) => {
    const result = pool.query(
        'DELETE FROM auth_todos WHERE id = ?',
        [todo_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error deleting todo' });
            } else {
                res.sendStatus(204); // No content
            }
        }
    );
    return result;
};
