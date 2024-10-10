// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    supplierName: { type: String, required: true }, // Change to ObjectId if referencing a Supplier model
    orderDate: { type: Date, default: Date.now },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        packingUnit: { type: String, required: true },
        orderQty: { type: Number, required: true },
        netAmount: { type: Number, required: true },
    }],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
