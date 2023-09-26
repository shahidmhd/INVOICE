import mongoose from 'mongoose';


// Define the Expense schema
const expenseSchema = new mongoose.Schema({
    VoucherNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String, // You may want to use Date type if you store dates as Date objects
        required: true,
    },
    selectedDate: {
        type: Date, // Assuming you want to store selectedDate as a Date object
        required: true,
    },
    selctedledgerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ledger', // Assuming you have a 'Company' model for the selected company
        required: true,
    },
    isdeleted: {
        type: Boolean,
        required: true,
      },
    tableRows: [
        {
            amount: {
                type: Number,
                required: true,
            },
            perticulars: {
                type: String,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
});

// Create a model from the schema
const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
