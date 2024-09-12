const { CustomAPIError } = require('../errors/custom-error');

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

    // Catch any other errors and respond with a generic message
    res.status(500).json({ msg: 'Something went wrong, please try again.' });
};

module.exports = {
    notFound,
    errorHandler,
};
