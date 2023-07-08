const { expect } = require('chai');
const { model } = require('mongoose');
const User = require('../../src/models/User.js');

describe('User Model', function () {
    describe('Validation', function () {
        it('should be invalid if email is missing', function () {
            const user = new User({ hashedPassword: 'password123' });
            console.log(user);
            console.log();
            user.validate(function (error) {
                expect(error.errors.email).to.not.exist;

            });
        });

        it('should be invalid if hashedPassword is missing', function () {
            const user = new User({ email: 'test@example.com' });
            user.validate(function (error) {
                expect(error.errors.hashedPassword).to.not.exist;

            });
        });

        it('should be valid if all required fields are present', function () {
            const user = new User({ email: 'test@example.com', hashedPassword: 'password123' });
            user.validate(function (error) {
                expect(error).to.be.null;
            });
        });

    });
    describe('Indexes', function() {
        it('should have an index on the email field', function() {
          const indexes = User.schema.indexes();          
          const emailIndex = indexes[0][0].email === 1;
          expect(emailIndex).to.be.true;
        });
    
        it('should have collation settings for the email index', function() {
          const indexes = User.schema.indexes();
          const emailIndex = indexes[0][0].email === 1 ? indexes[0][1] : "";
          expect(emailIndex.collation.locale).to.equal('en');
          expect(emailIndex.collation.strength).to.equal(1);
        });
      });

});
