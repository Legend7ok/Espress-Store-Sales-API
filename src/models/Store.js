import mongoose from 'mongoose';
import { STATUS } from '../constants.js';


const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Store name is required'],
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        status: {
            type: Number,
            enum: {
            values: [STATUS.ACTIVE, STATUS.INACTIVE],
            message: 'Invalid status value',
        },
            default: STATUS.INACTIVE,
        },
    },
    {
        timestamps: true,
        collection: process.env.STORES_COLLECTION,
    }
);

const Store = mongoose.model('Store', storeSchema);

export default Store;