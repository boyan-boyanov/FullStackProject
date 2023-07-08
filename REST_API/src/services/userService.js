const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

//random secret code
const JWT_SECRET = 'jasdfu98u9sfhkjsdfkj';

async function register(email, password) {
    //check if email is taken
    const existing = await User.find({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('Email is taken')
    }
    //has password
    const hashedPassword = await bcrypt.hash(password, 10);

    //store user
    const user = new User({
        email,
        password
    });

    await user.save();

    //create session token
    //return result
    return createSession(user);
}


async function login(email, password) {
    // check if user exist

    //verify password

    //create session token

    //return result
}

function createSession(user) {
    //create and sign payload
    const payload = {
        email: user.email,
        _id: user._id
    }

    const accessToken = jwt.sign(payload, JWT_SECRET);
    //return token
    return {
        email: user.email,
        accessToken,
        _id: user._id
    }
}

module.exports = {
    login,
    register
}
