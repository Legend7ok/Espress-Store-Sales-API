import { Router } from 'express';
import Seller from '../models/Seller.js';
import { validateId } from '../middlewares/validate.js';
import AppError from '../utils/AppError.js';
import { STATUS, HTTP } from '../constants.js';


const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const sellers = await Seller.find({ status: STATUS.ACTIVE });
        res.status(HTTP.OK).json({ status: 'success', data: sellers });
    } catch (err) {
        next(err);
    }
});


router.get('/:id', validateId, async (req, res, next) => {
    try {
        const seller = await Seller.findOne({ _id: req.params.id, status: STATUS.ACTIVE });
        if (!seller) return next(new AppError('Seller not found', HTTP.NOT_FOUND));
        res.status(HTTP.OK).json({ status: 'success', data: seller });
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { name, email, phone, status } = req.body;

        if (!name) return next(new AppError('Field name is required', HTTP.BAD_REQUEST));

        const seller = await Seller.create({ name, email, phone, status });
        res.status(HTTP.CREATED).json({ status: 'success', data: seller });
    } catch (err) {
       if (err.code === 11000) {
           return next(new AppError('Seller with this email already exists', HTTP.BAD_REQUEST));
       }
       if (err.name === 'ValidationError') {
           const message = Object.values(err.errors).map(e => e.message).join('; ');
           return next(new AppError(message, HTTP.BAD_REQUEST));
       }
       next(err);
   }
});


router.patch('/:id', validateId, async (req, res, next) => {
    try {
        const allowed = ['name', 'email', 'phone', 'status'];
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowed.includes(key))
        );

        const seller = await Seller.findOneAndUpdate(
            { _id: req.params.id, status: STATUS.ACTIVE },
            updates,
            { new: true, runValidators: true }
        );

        if (!seller) return next(new AppError('Seller not found', HTTP.NOT_FOUND));

        res.status(HTTP.OK).json({ status: 'success', data: seller });

    } catch (err) {
        if (err.code === 11000) {
            return next(new AppError('Seller with this email already exists', HTTP.BAD_REQUEST));
        }
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(e => e.message).join('; ');
            return next(new AppError(message, HTTP.BAD_REQUEST));
        }
        next(err);
    }
});


router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const seller = await Seller.findOneAndUpdate(
            { _id: req.params.id, status: STATUS.ACTIVE },
            { status: STATUS.INACTIVE }
        );

        if (!seller) return next(new AppError('Seller not found', HTTP.NOT_FOUND));
        res.status(HTTP.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export default router;