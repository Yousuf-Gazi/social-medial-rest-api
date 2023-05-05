const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
    {
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
            required: true,
            min: 8,
            max: 16,
        },
        profilePicture: {
            type: String,
            default: ''
        },
        coverPicture: {
            type: String,
            dafault: ''
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true
    }
);

const User = model('User', UserSchema);

module.exports = User;