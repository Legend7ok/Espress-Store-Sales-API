import express from 'express';
import sanitize from './middlewares/sanitize.js';
import errorHandler from './middlewares/errorHandler.js';
import sellersRouter from './routes/sellers.js';


const app = express();

app.use(express.json());
app.use(sanitize);


app.get('/', (req, res) => {
    res.json({
        message: 'Server works',
    });
});


app.use('/api/v1/sellers', sellersRouter);


app.use((req, res) => {
    res.status(HTTP.NOT_FOUND).json({
        status: 'error',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

export default app;