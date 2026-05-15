import { isValidObjectId } from 'mongoose';
import AppError from '../utils/AppError.js';
import { HTTP } from '../constants.js';


export const validateId = (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        return next(new AppError('Invalid id', HTTP.BAD_REQUEST));
    }
    next();
};