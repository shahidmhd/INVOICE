import mongoose from 'mongoose';
// Define the schema
const termsSchema = new mongoose.Schema({
    termsAndConditions: {
        type: String,
        required: true,
    }
});

// Create a model based on the schema
const Terms = mongoose.model('Terms', termsSchema);

export default Terms;