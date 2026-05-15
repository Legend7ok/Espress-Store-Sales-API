import mongoose from 'mongoose';
import { STATUS } from '../constants.js';


const saleSchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller',
            required: [true, 'Seller ID is required'],
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: [true, 'Store ID is required'],
        },
        amount: {
            type: Number,
            required: [true, 'Sale amount is required'],
            min: [0.01, 'Amount must be greater than 0'],
        },
        itemsCount: {
            type: Number,
            required: [true, 'Items count is required'],
            min: [1, 'Items count must be greater than 0'],
            validate: {
                validator: Number.isInteger,
                message: 'Items count must be an integer',
            },
        },
        status: {
            type: Number,
            enum: {
                values: [STATUS.ACTIVE, STATUS.INACTIVE],
                message: 'Invalid status value',
            },
            default: STATUS.ACTIVE,
        },
        date: {
            type: Date,
            required: [true, 'Sale date is required'],
        },
    },
    {
        timestamps: true,
        collection: process.env.SALES_COLLECTION,
    }
);

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;