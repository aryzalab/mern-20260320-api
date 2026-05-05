import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transactionId: String,
});

export default mongoose.model("Payment", paymentSchema);
