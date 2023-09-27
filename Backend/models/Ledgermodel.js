import mongoose from 'mongoose';

const Ledgerschema=new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    balance:{
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    isdeleted:{
        type:Boolean,
        required: true
    }
},{
    timestamps:true
})


const Ledger=mongoose.model('Ledger',Ledgerschema)
export default Ledger;