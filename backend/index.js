const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);


const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Database connected successfully');
        console.log(`Server listening on port ${PORT}`);
    });
})
