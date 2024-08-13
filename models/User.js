// user model for social api
const { Schema, model } = require('mongoose');

//user schema
const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// create the User model using the user schema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;