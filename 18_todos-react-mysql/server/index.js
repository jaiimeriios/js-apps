const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 666;
const todosRoutes = require('./src/todos-routes');

app.use(cors());
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    res.send('Home Page');
});

app.use('/todos', todosRoutes)


// Server
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
