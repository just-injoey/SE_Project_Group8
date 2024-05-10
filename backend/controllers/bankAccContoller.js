import BankAccount from "../models/BankAccModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";

export const addBankAccController = async (req, res) => {
  try {
    const {
      bankName,
      accNum,
      amount,
      accType,
      userId,
    } = req.body;
    console.log("inside addBankAcc controller")
    console.log(bankName, userId);
    // console.log(title, amount, description, date, category, userId, transactionType);

    if (
      !bankName ||
      !accNum ||
      !amount ||
      !accType
    ) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }

    const user = await User.findById(userId);

    console.log("user is:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Bank Account not found",
      });
    }

    let newbankaccount = await BankAccount.create({
      bankName: bankName,
      accNum: accNum,
      amount: amount,
      accType: accType,
      user: userId,
    });

    console.log("newbankaccount: ", newbankaccount)

    user.bankaccounts.push(newbankaccount);

    user.save();

    return res.status(200).json({
      success: true,
      message: "Bank Account Added Successfully",
    });
  } catch (err) {
    console.log("inisde addBankAcc error");
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};


export const getAllBankAccController = async (req, res) => {
    // const bankAccounts = await BankAccount.find().populate('user', 'name email');
    // if(!bankAccounts?.length){
    //     return res.status(400).json({message: "No bank Accounts found"})
    // }
    // res.json(bankAccounts)
    const userId = req.body.userId; // Assuming user ID is passed in the request params
    try {
        const bankAccounts = await BankAccount.find({ user: userId });
        if (!bankAccounts?.length) {
            return res.status(404).json({ message: "No bank accounts found for the user" });
        }
        res.json({success:true,bankAccounts:bankAccounts});
    } catch (error) {
        console.error("Error fetching bank accounts:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};


export const deleteBankAccController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    // console.log(transactionId, userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const transactionElement = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }

    const transactionArr = user.transactions.filter(
      (transaction) => transaction._id === transactionId
    );

    user.transactions = transactionArr;

    user.save();

    // await transactionElement.remove();

    return res.status(200).json({
      success: true,
      message: `Transaction successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const updateBankAccController = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const { title, amount, description, date, category, transactionType } =
      req.body;

    console.log(title, amount, description, date, category, transactionType);

    const transactionElement = await Transaction.findById(transactionId);

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }

    if (title) {
      transactionElement.title = title;
    }

    if (description) {
      transactionElement.description = description;
    }

    if (amount) {
      transactionElement.amount = amount;
    }

    if (category) {
      transactionElement.category = category;
    }
    if (transactionType) {
      transactionElement.transactionType = transactionType;
    }

    if (date) {
      transactionElement.date = date;
    }

    await transactionElement.save();

    // await transactionElement.remove();

    return res.status(200).json({
      success: true,
      message: `Transaction Updated Successfully`,
      transaction: transactionElement,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};
