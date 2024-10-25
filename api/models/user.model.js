import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://img1.pnghut.com/17/13/23/QmMUHXb6nW/avatar-login-symbol-black-and-white-share-icon.jpg"
        
    },
},
    
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;