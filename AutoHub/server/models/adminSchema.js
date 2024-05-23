const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

adminSchema.pre('save', async function(next) {
    if (this.isModified('adminPassword') || this.isNew) {
        try {
            this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
            this.cPassword = await bcrypt.hash(this.cPassword, 12);
        } catch (error) {
            next(error);
        }
    }
    next();
});

adminSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to generate auth token');
    }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
