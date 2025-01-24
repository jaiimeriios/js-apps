import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

import userRoutes from './src/routes/userRoutes.js';
import quoteRoutes from './src/routes/quoteRoutes.js';

const PORT = process.env.PORT || 666;

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Authorization'
//     );
//     next();
// });

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//     })
// );

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello from server!');
});

// Routes
app.use('/users', userRoutes);
app.use('/quotes', quoteRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
