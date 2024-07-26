import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import todosRoutes from './routes/todos.js';

const app = express();
const PORT = 666;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page - Users API!</h1>
        <br>
        <a href="users">Users</a>
        <br><br>
        <a href="todos">Todos</a>
        `)
    // console.log('[TEST]')
    // console.log(req)
});

app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);

app.all('*', (req, res) => {
    res.send("You've tried reaching a route that doesn't exist.")
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});