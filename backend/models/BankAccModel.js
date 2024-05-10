import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  accNum: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0 // Default balance is set to 0
  },
  accType: {
    type: String,
    required: [true, "Account Type is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

export default BankAccount;
