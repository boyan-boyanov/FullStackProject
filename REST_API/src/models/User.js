const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true }
});

//Helper for check if email is valid --> email: 1 or -1 for ASC or DESC order
userSchema.index({ email: 1 },{
    collation: {
        locale: 'en',
        strength: 1
    }
})

const User = model("User", userSchema);

module.exports = User;