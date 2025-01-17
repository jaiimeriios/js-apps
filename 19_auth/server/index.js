const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config();

const userRoutes = require('./src/routes/userRoutes.js')

const PORT = process.env.PORT || 666;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello from server!');
});

// Routes
app.use('/users', userRoutes);
// app.use('/quotes', quoteRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
