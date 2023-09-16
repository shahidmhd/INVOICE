import mongoose from 'mongoose';

const userchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    passsword: {
        type: String,
        required: true,
        trim: true
    }
})


const User=mongoose.model('Users',userchema)
export default User;