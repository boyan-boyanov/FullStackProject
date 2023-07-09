const { expect } = require('chai');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const api = require('../../src/services/userService');
const User = require('../../src/models/User');

describe('User Service', () => {
    describe('register()', () => {
        
        it('should throw an error if email is taken', async () => {
            const email = 'test@example.com';
            const password = 'password';
            const existingUser = { email, hashedPassword: 'hashedPassword' };

            User.findOne = () => Promise.resolve(existingUser);

            try {
                await api.register(email, password);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Email is taken');
            }
        });
    });

    describe('login()', () => {
       
        it('should throw an error for incorrect email or password', async () => {
            const email = 'test@example.com';
            const password = 'password';
            const user = null;

            User.findOne = () => Promise.resolve(user);

            try {
                await api.login(email, password);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Incorrect email or password');
            }
        });

        it('should throw an error for incorrect password', async () => {
            const email = 'test@example.com';
            const password = 'password';
            const hashedPassword = 'wrongHashedPassword';
            const user = { email, hashedPassword };

            User.findOne = () => Promise.resolve(user);
            bcrypt.compare = () => Promise.resolve(false);

            try {
                await api.login(email, password);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Incorrect email or password');
            }
        });
    });


});
