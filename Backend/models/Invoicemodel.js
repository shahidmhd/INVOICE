import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  gst18: {
    type: Number,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  selectedCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company', // Assuming you have a 'Company' model for the selected company
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  paidamount:{
    type: Number,
    default: 0, // Default value set to 0
  },
  Dueamount:{
    type: Number,
    default: 0, // Default value set to 0
  },
  selecteDuedDate:{
    type: Date,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  Duedate:{
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  tableRows: [{
    id: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    Gst:{
      type: Number,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    HSNCode: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    total:{
        type: Number,
      required: true,

    }

    // Add more properties if needed
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  isdeleted:{
    type:Boolean,
    required: true,
}
}, {
  timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
