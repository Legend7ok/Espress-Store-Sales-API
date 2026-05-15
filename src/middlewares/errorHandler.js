import { HTTP } from '../constants.js';


const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP.SERVER_ERROR;
    const message = err.isOperational ? err.message : 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message,
    });
};

export default errorHandler;