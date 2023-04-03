import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
   price: {
        type: mongoose.Types.Currency,
        currency: "PHP",
        get: (v) => v/100
    },
    expense: {
        type: mongoose.Types.Currency,
        currency: "PHP",
        get: (v) => v/100
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
    },
  },
  { timestamps: true, toJSON: {getters: true}}
)

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;