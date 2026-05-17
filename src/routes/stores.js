import { Router } from 'express';
import Store from '../models/Store.js';
import { validateId } from '../middlewares/validate.js';
import AppError from '../utils/AppError.js';
import { STATUS, HTTP } from '../constants.js';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const stores = await Store.find({ status: STATUS.ACTIVE });
        res.status(HTTP.OK).json({ status: 'success', data: stores });
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const store = await Store.findOne({_id: req.params.id, status: STATUS.ACTIVE});
        if (!store) return next(new AppError('Store not found', HTTP.NOT_FOUND));

        res.status(HTTP.OK).json({status: 'success', data: store});
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { name, address, status } = req.body
        if (!name) return next(new AppError('Field is required', HTTP.BAD_REQUEST));

        const store = await Store.create({ name, address, status });
        res.status(HTTP.CREATED).json({ status: 'success', data: store });
    } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(e => e.message).join('; ');
      return next(new AppError(message, HTTP.BAD_REQUEST));
    }
    next(err);
  }
});


router.patch('/:id', validateId, async (req, res, next) => {
    try {
        const allowed = ['name', 'address', 'status'];
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowed.includes(key))
        );

        const store = await Store.findOneAndUpdate(
            { _id: req.params.id, status: STATUS.ACTIVE },
            updates,
            { new: true, runValidators: true }
        );

        if (!store) return next(new AppError('Store not found', HTTP.NOT_FOUND));

        res.status(HTTP.OK).json({ status: 'success', data: store });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(e => e.message).join('; ');
            return next(new AppError(message, HTTP.BAD_REQUEST));
        }
        next(err);
    }
});


router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const store = await Store.findOneAndUpdate(
            { _id: req.params.id, status: STATUS.ACTIVE },
            { status: STATUS.INACTIVE },
        );

        if(!store) return next(new AppError('Store not found', HTTP.NOT_FOUND));
        res.status(HTTP.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export default router;