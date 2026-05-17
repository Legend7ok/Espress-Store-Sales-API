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

export default router;
