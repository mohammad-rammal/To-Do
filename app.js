const express = require('express');
const morgan = require('morgan');
const {Date} = require('./middlewares/Date');
const taskRouter = require('./routes/taskRouter');
const {notFound, errorHandler} = require('./middlewares/Error');
const {notFoundPage} = require('./middlewares/notFoundPage');

const app = express();

// Middleware: Date
app.use(Date);

// Middleware: Logger
app.use(morgan('dev'));

// Serve static files
app.use(express.static('./public'));

// Middleware: Parse JSON
app.use(express.json());

// Routes
app.use('/api/v1/task', taskRouter);
// app.use(notFoundPage); 

// Middleware: Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app; 
