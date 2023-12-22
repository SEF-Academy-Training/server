const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { deleteUploadedFile } = require("../utils/deleteUploadedFile");

const userSchema = new Schema({        
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true },
    company: { type: String }, 
    date: { type: Date , default: Date.now,  },    
    userNumber: { type: Number }, 
    image:{type:String},
    role: { type: String, enum: ["Admin",  "User"], default: "User" },
    blog: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    paper: [{ type: Schema.Types.ObjectId, ref: "Paper" }], 
    chat: [{ type: Schema.Types.ObjectId, ref: "Chat" }], 
    services: [{ type: Schema.Types.ObjectId, ref: "Services" }],
}, { timestamps: true });

userSchema.pre('findOneAndUpdate', deleteUploadedFile)
userSchema.pre('findOneAndDelete', deleteUploadedFile)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, genSalt);
        this.password = hashedPassword;
        next(); 
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateTokens = function () {
    const accessToken = jwt.sign({ _id: this._id, role: this.role, userEmail: this.userEmail, userName: this.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ _id: this._id, role: this.role, userEmail: this.userEmail, userName: this.userName }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });
    return {
        accessToken,
        refreshToken
    }
}


userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = model("User", userSchema);
module.exports = { User }

