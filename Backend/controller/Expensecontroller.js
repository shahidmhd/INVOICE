import Expense from '../models/Expensemodel.js'

export default {
    AddExpense: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const ExpenseData = req.body;
            ExpenseData.isdeleted = false
            const newservice = new Expense(ExpenseData);
            // Save the new company to the database
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "Expense added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add Expense.",
                error: err.message,
            });
        }
    },
    GetAllExpense: async (req, res) => {
        try {
            const response = await Expense.find().sort({ createdAt: -1 }).populate('selctedledgerId');
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Expense",
                    Data: response
                })
            } else {
                throw new Error(" Expense not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    Getnotdeletedexpense: async (req, res) => {
        try {
            const response = await Expense.find({ isdeleted: false }).sort({ createdAt: -1 }).populate('selctedledgerId');
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Expense",
                    Data: response
                })
            } else {
                throw new Error(" Expense not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
}