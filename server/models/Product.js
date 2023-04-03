import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   buyer: {
        type: String,
    },
    amount: {
        type: mongoose.Types.Currency,
        currency: "PHP",
        get: (v) => v/100
    },
    productIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
  },
  { timestamps: true, toJSON: {getters: true}}
)

const Product = mongoose.model("Product", ProductSchema);

export default Product;