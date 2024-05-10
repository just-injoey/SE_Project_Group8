import Goal from "../models/GoalModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";

export const addGoalController = async (req, res) => {
  try {
    console.log(req.body);
    const {
      goal,
      amount,
      description,
      targetdate,
      category,
      goalType,
      userId
    } = req.body;

    // console.log(title, amount, description, date, category, userId, goalType);

    if (
      !goal ||
      !amount ||
      !description ||
      !category ||
      !goalType ||
      !targetdate) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let newGoal = await Goal.create({
      goal: goal,
      amount: amount,
      category: category,
      description: description,
      targetdate: targetdate,
      user: userId,
      goalType: goalType,
    });

    user.goals.push(newGoal);

    user.save();

    return res.status(200).json({
      success: true,
      message: "Goal Added Successfully!",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const getAllGoalController = async (req, res) => {
  try {
    console.log("GET FUNCTION !")
    console.log(req.body)
    const { userId, type, frequency, startDate, endDate } = req.body;
    console.log(userId, type, frequency, startDate, endDate);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // Create a query object with the user and type conditions
    const query = {
      user: userId
    };
    if (type !== 'all') {
      query.goalType = type;
    }
    // Add date conditions based on 'frequency' and 'custom' range
    if (frequency !== 'custom') {
      query.date = {
        $gt: moment().add(Number(frequency), "days").toDate()
      };
    } else if (startDate && endDate) {
      query.date = {
        $gte: moment(startDate).toDate(),
        $lte: moment(endDate).toDate(),
      };
    }
    // console.log(query);
    const goals = await Goal.find(query);

    // console.log(goals);

    return res.status(200).json({
      success: true,
      goals: goals,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};


export const deleteGoalController = async (req, res) => {
  try {
    const goalId = req.params.id;
    const userId = req.body.userId;

    // console.log(goalId, userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const goalElement = await Goal.findByIdAndDelete(
      goalId
    );

    if (!goalElement) {
      return res.status(400).json({
        success: false,
        message: "goal not found",
      });
    }

    const goalArr = user.goals.filter(
      (goal) => goal._id === goalId
    );

    user.goals = goalArr;

    user.save();

    // await goalElement.remove();

    return res.status(200).json({
      success: true,
      message: `Goal successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const updateGoalController = async (req, res) => {
  try {
    const goalId = req.params.id;

    const { goal, amount, description, targetdate, category, goalType } =
      req.body;

    console.log(goal, amount, description, targetdate, category, goalType);

    const goalElement = await Goal.findById(goalId);

    if (!goalElement) {
      return res.status(400).json({
        success: false,
        message: "Goal not found",
      });
    }

    if (goal) {
      goalElement.goal = goal;
    }

    if (description) {
      goalElement.description = description;
    }

    if (amount) {
      goalElement.amount = amount;
    }

    if (category) {
      goalElement.category = category;
    }
    if (goalType) {
      goalElement.goalType = goalType;
    }

    if (targetdate) {
      goalElement.targetdate = targetdate;
    }

    await goalElement.save();

    // await goalElement.remove();

    return res.status(200).json({
      success: true,
      message: `Goal Updated Successfully!`,
      goal: goalElement,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};