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
    Deleteexpense: async (req, res) => {
        try {
            const { id } = req.params
            // await invoice.findByIdAndDelete({ _id: id });
            const updatedExpense = await Expense.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            if (!updatedExpense) {
                return res.json({
                    success: false,
                    message: "Expense not found",
                });
            }
            res.json({
                success: true,
                message: "Expense deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetSelectedexpense: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await Expense.findById(id).populate('selctedledgerId');
            if (response) {
                res.json({
                    success: true,
                    message: "Expense data found",
                    Data: response
                });
            } else {
                throw new Error("Expense not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            });
        }
    },
    Editexpense: async (req, res) => {
        try {
            const { id } = req.params;    
            const Invoice = await Expense.findById(id);
            if (!Invoice) {

                // If the company with the given ID is not found, throw an error
                throw new Error("Expense not found.");
            }

            // Update the invoice with the new data
            await Expense.findByIdAndUpdate(
                { _id: id },
                {...req.body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Expense Edited successfully.",
            });


        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit Expense.",
                error: err.message,
            });
        }
    },
}