const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    profielPic: { type: String, default: "/images/profile.png"}
},
    {timestamps: true}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;