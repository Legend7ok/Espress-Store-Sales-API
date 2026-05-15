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
        const seller = await Seller.findOne({ id: req.params.id, status: STATUS.ACTIVE });
        if (!seller) return next(new AppError('No such seller found', HTTP.NOT_FOUND));
        res.status(HTTP.OK).json({ status: 'success', data: seller });
    } catch (err) {
        next(err);
    }
});