const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

//random secret code
const JWT_SECRET = 'jasdfu98u9sfhkjsdfkj';

async function register(email, password) {
    //check if email is taken
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('Email is taken')
    }
    //has password
    const hashedPassword = await bcrypt.hash(password, 10);

    //store user
    const user = new User({
        email,
        hashedPassword
    });

    await user.save();

    //create session token
    //return result
    return createSession(user);
}


async function login(email, password) {
    // check if user exist
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error('Incorrect email or password')
    }
    //verify password
    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password')
    }
    //create session token
    //return result
    return createSession(user);
}

function createSession(user) {
    //create and sign payload
    const payload = {
        email: user.email,
        _id: user._id
    }
    //expire in 2 days
    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '2d'
    });
    //return token
    return {
        email: user.email,
        accessToken,
        _id: user._id
    }
}

function validateToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    login,
    register,
    validateToken
}
