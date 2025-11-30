import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';

import { dbconnect } from './config/database.config.js';
dbconnect();
const app = express();
app.use(express.json());


import { fileURLToPath } from 'url';
import path from 'path';


app.use (cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'],
    })
);

// **NEW CODE TO SERVE UPLOADED FILES**
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})