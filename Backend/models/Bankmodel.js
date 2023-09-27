import mongoose from 'mongoose';
// Define the schema
const accountSchema = new mongoose.Schema({
  Accountno: {
    type: String,
    required: true,
  },
  BankName: {
    type: String,
    required: true,
  },
  ifsccode: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Account = mongoose.model('Account', accountSchema);

export default Account;