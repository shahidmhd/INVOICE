import jwt from 'jsonwebtoken'
import User from '../models/Authmodel.js'

export default {
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }).exec();
            if (user) {
                let validaPassword;
                if (req.body.password === user.passsword) { // Corrected field name
                    validaPassword = true;
                } else {
                    validaPassword = false;
                }
                if (!validaPassword) {
                    throw new Error("Invalid password !");
                } else {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });
                    res.json({
                        success: true,
                        message: "user logged in successfully",
                        data: token
                    })
                }
            } else {
                throw new Error("user not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    changepassword: async (req, res) => {
        try {
            const {newPassword, email } = req.body;
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            user.passsword = newPassword;
            await user.save();

            return res.status(200).json({ success: true, message: 'Password changed successfully' });
        } catch (err) {
            console.error('Error changing password:', err);
            return res.status(500).json({ success: false, message: 'An error occurred while changing the password' });
        }
    }


}