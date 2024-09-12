const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');
require('dotenv').config();

const {Date} = require('./middlewares/Date');
const taskRouter = require('./routes/taskRouter');
const {notFound, errorHandler} = require('./middlewares/Error');

const app = express();

// Date
app.use(Date);

// Logger
app.use(morgan('dev'));

app.use(express.static('./public'));

// Middleware (get data from req.body)
app.use(express.json());

// Routes
app.use('/api/v1/task', taskRouter);

const port = 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, console.log(`Server is running on port ${port}...➡️‍`));
    } catch (error) {
        console.log(error);
    }
};

app.use(notFound);

app.use(errorHandler);

start();
