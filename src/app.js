import express from 'express';
import sanitize from './middlewares/sanitize.js';
import errorHandler from './middlewares/errorHandler.js';
import sellersRouter from './routes/sellers.js';
import storesRouter from './routes/stores.js';
import salesRouter from './routes/sales.js';
import { HTTP } from './constants.js';


const app = express();

app.use(express.json());
app.use(sanitize);


app.get('/', (req, res) => {
    res.json({
        message: 'Server works',
    });
});


app.use('/api/v1/sellers', sellersRouter);
app.use('/api/v1/stores', storesRouter);
app.use('/api/v1/sales', salesRouter);


app.use((req, res) => {
    res.status(HTTP.NOT_FOUND).json({
        status: 'error',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

export default app;