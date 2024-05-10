import mongoose from "mongoose";


const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: [true, "Goal is required"],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    description: {
        type: String,
        required: [false,""],
    },
    goalType: {
        type: String,
        required: [true, "Transaction Type is required"],
        
    },
    targetdate: {
        type: Date,
        required: [true, "Date is required"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;