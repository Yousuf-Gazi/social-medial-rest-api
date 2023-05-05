const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();

dotenv.config();

const PORT = 4000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(e => {
        console.log(e)
    });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/', (req, res) => {
    res.send('Welcome to homepage');
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});