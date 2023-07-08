const { expect } = require('chai');
const { model } = require('mongoose');
const Item = require('../../src/models/Item.js');

describe('Item Model', function() {
  describe('Validation', function() {
    it('should return an error if the year is below the minimum value', function() {
      const item = new Item({
        make: 'Brand',
        model: 'Model',
        year: 1949,
        description: 'Description',
        price: 10.99,
        img: 'image.jpg',
        material: 'Material'
      });

      item.validate(function(error) {
        expect(error.errors.year).to.exist;
        expect(error.errors.year.message).to.equal('Year must be between 1950 and 2050');
      });
    });

    it('should return an error if the year is above the maximum value', function() {
      const item = new Item({
        make: 'Brand',
        model: 'Model',
        year: 2051,
        description: 'Description',
        price: 10.99,
        img: 'image.jpg',
        material: 'Material'
      });

      item.validate(function(error) {
        expect(error.errors.year).to.exist;
        expect(error.errors.year.message).to.equal('Year must be between 1950 and 2050');
      });
    });

    it('should return an error if the price is below the minimum value', function() {
      const item = new Item({
        make: 'Brand',
        model: 'Model',
        year: 2000,
        description: 'Description',
        price: 0,
        img: 'image.jpg',
        material: 'Material'
      });

      item.validate(function(error) {
        expect(error.errors.price).to.exist;
        expect(error.errors.price.message).to.equal('Price must be a positive number!');
      });
    });

    it('should not return an error if all fields are valid', function() {
      const item = new Item({
        make: 'Brand',
        model: 'Model',
        year: 2000,
        description: 'Description',
        price: 10.99,
        img: 'image.jpg',
        material: 'Material'
      });

      item.validate(function(error) {
        expect(error).to.be.null;
      });
    });
  });
});
