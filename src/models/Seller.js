import mongoose from 'mongoose';
import { STATUS } from '../constants.js';


const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Seller name is required'],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        phone: {
            type: String,
            trim: true,
        },
        status: {
            type: Number,
            enum: [STATUS.ACTIVE, STATUS.INACTIVE],
            default: STATUS.INACTIVE,
        },
    },
    {
        timestamps: true,
        collection: process.env.SELLERS_COLLECTION,
    }
);

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;