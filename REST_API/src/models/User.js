const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true }
});

const User = model("User", userSchema);

moduele.exports = User;