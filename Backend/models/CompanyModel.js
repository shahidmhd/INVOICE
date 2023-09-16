import mongoose from 'mongoose';

const Companychema=new mongoose.Schema({
    companyname: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    person: {
        type: String,
        required: true,
        trim: true
    },
    contactNo: {
        type:Number,
        required: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type:Number,
        required: true
    },
    isdeleted:{
        type:Boolean,
        required: true
    }
},{
    timestamps:true
})


const Company=mongoose.model('company',Companychema)
export default Company;