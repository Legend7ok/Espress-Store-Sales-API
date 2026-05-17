import { Router } from 'express';
import Sale from '../models/Sale.js';
import Seller from '../models/Seller.js';
import Store from '../models/Store.js';
import { validateId } from '../middlewares/validate.js';
import AppError from '../utils/AppError.js';
import { STATUS, HTTP } from '../constants.js';
import { isValidObjectId } from 'mongoose';
import {populate} from "dotenv";


const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const sales = await Sale.find({ status: STATUS.ACTIVE })
            .populate('sellerId', 'name email')
            .populate('storeId', 'name address');
    } catch (err) {
        next(err);
    }
});


router.get('/:id', validateId, async (req, res, next) => {
    try {
        const sale = await Sale.findOne({ _id: req.params.id, status: STATUS.ACTIVE })
            .populate('sellerId', 'name email')
            .populate('storeId', 'name address');

        if (!sale) return next(new AppError('Sale not found', HTTP.NOT_FOUND));
        res.status(HTTP.OK).json({ status: 'success', data: sale });
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { sellerId, storeId, amount, itemsCount, date, status } = req.body;

        if (!sellerId || !storeId || !amount || !itemsCount || !date) {
            return next(new AppError('Fields sellerId, storeId, amount, itemsCount, date are required', HTTP.BAD_REQUEST));
        }

        if (!isValidObjectId(sellerId) || !isValidObjectId(storeId)) {
            return next(new AppError('Invalid sellerId або storeId', HTTP.BAD_REQUEST));
        }

        const [seller, store] = await Promise.all([
            Seller.findOne({ _id: sellerId, status: STATUS.ACTIVE }).select('_id'),
            Store.findOne({ _id: storeId, status: STATUS.ACTIVE }).select('_id'),
        ]);

        if (!seller) return next(new AppError('Seller not found', HTTP.NOT_FOUND));
        if (!store) return next(new AppError('Store not found', HTTP.NOT_FOUND));

        const sale = await Sale.create({ sellerId, storeId, amount, itemsCount, date, status });
        res.status(HTTP.CREATED).json({ status: 'success', data: sale });
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
       const allowed = ['sellerId', 'storeId', 'amount', 'itemsCount', 'date', 'status'];
       const updates = Object.fromEntries(
           Object.entries(req.body).filter(([key]) => allowed.includes(key))
       );

       if (updates.sellerId) {
           if (!isValidObjectId(updates.sellerId)) {
               return next(new AppError('Invalid sellerId', HTTP.BAD_REQUEST));
           }
           const seller = await Seller.findOne({ _id: updates.sellerId, status: STATUS.ACTIVE }).select('_id');
           if (!seller) return next(new AppError('Seller not found', HTTP.NOT_FOUND));
       }

       if (updates.storeId) {
           if (!isValidObjectId(updates.storeId)) {
               return next(new AppError('Invalid storeId', HTTP.BAD_REQUEST));
           }
           const store = await Store.findOne({ _id: updates.storeId, status: STATUS.ACTIVE }).select('_id');
           if (!store) return next(new AppError('Store not found', HTTP.NOT_FOUND));
       }

       const sale = await Sale.findOneAndUpdate(
           { _id: req.params.id, status: STATUS.ACTIVE },
           updates,
           { new: true, runValidators: true }
       );

       if (!sale) return next(new AppError('Sale not found', HTTP.NOT_FOUND));
       res.status(HTTP.OK).json({ status: 'success', data: sale });

   } catch (err) {
       if (err.name === 'ValidationError') {
           const message = Object.values(err.errors).map(e => e.message).join('; ');
           return next(new AppError(message, HTTP.BAD_REQUEST));
       }
       next(err);
   }
});

export default router;
