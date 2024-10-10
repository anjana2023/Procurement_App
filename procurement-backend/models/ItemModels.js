// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemNo: { type: String, required: true, unique: true },
    itemName: { type: String, required: true },
    inventoryLocation: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    supplier: { type: String, required: true }, // Change to ObjectId if referencing a Supplier model
    stockUnit: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    itemImages: [{ type: String }], // Array of image URLs
    status: { type: String, default: "Enabled" },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
