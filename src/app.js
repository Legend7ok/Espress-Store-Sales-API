import express from 'express';
import errorHandler from './middlewares/errorHandler.js';


const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'Server works',
    });
});


app.use((req, res) => {
    res.status(HTTP.NOT_FOUND).json({
        status: 'error',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

export default app;