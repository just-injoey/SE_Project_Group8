import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    const db = process.env.MONGO_URL;

    const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);
}

// import mongoose from "mongoose";
// import User from "../models/UserSchema.js";

// export const connectDB = async (req, res) => {
//     try {
//         const db = process.env.MONGO_URL;

//         const { connection } = await mongoose.connect(db, { useNewUrlParser: true });

//         console.log(`MongoDB Connected to ${connection.host}`);

//         // Create a new user object
//         const newUser = new User({
//             name: "John Doe",
//             email: "john@example.com",
//             password: "password123",
//             transactions: [],
//             createdAt: new Date()
//         });

//         // Save the user to the database
//         const savedUser = await newUser.save();
//         console.log("User added successfully:", savedUser);
//     } catch (error) {
//         console.error("Error connecting to MongoDB or adding user:", error);
//     }
// }
