import mongoose from 'mongoose';
// Document Schema
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    phone: Number,
    pincode: String,
});

const postUser = mongoose.model('user', userSchema);

export default postUser;