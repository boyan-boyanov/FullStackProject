const { expect } = require('chai');
const Item = require('../../src/models/Item');
const itemService = require('../../src/services/furnitureService');

describe('Item Service', () => {
    describe('getAll()', () => {
        it('should return all items when no query is provided', async () => {
            const expectedItems = [{ make: 'Make 1' }, { make: 'Make 2' }];
            Item.find = () => Promise.resolve(expectedItems);

            const result = await itemService.getAll();

            expect(result).to.deep.equal(expectedItems);
        });

        it('should return items filtered by user ID when query is provided', async () => {
            const userId = '123456';
            const afterSplice = '2345';
            const expectedItems = [{ make: 'Make 1' }, { make: 'Make 2' }];
            const query = `?userId=${userId}`;
            Item.find = (filter) => {
                expect(filter).to.deep.equal({ _ownerId: afterSplice });
                return Promise.resolve(expectedItems);
            };

            const result = await itemService.getAll(query);

            expect(result).to.deep.equal(expectedItems);
        });
    });

    describe('create()', () => {
        it('should create a new item', async () => {
            let newItem = {
                make: 'Make',
                model: 'Model',
                year: 2022,
                description: 'Description',
                price: 100,
                img: 'image.jpg',
                material: 'Material',
                _id: '123456',
            };
            const expectedItem = { ...newItem };
            Item.prototype.save = () => Promise.resolve(expectedItem);

            const result = await itemService.create(newItem);
            expectedItem._id = result._id

            expect(result.make).to.be.equal(expectedItem.make);
            expect(result.model).to.be.equal(expectedItem.model);
            expect(result.year).to.be.equal(expectedItem.year);
            expect(result.description).to.be.equal(expectedItem.description);
            expect(result.price).to.be.equal(expectedItem.price);
            expect(result.img).to.be.equal(expectedItem.img);
            expect(result.material).to.be.equal(expectedItem.material);

        });
    });

    describe('getById()', () => {
        it('should return an item by ID', async () => {
            const itemId = '123456';
            const expectedItem = { _id: itemId, make: 'Make' };
            Item.findById = (id) => {
                expect(id).to.equal(itemId);
                return Promise.resolve(expectedItem);
            };

            const result = await itemService.getById(itemId);

            expect(result).to.deep.equal(expectedItem);
        });
    });

    describe('updateById()', () => {
        it('should update an existing item by ID', async () => {
            const itemId = '123456';
            const existingItem = { _id: itemId, make: 'Old Make' };
            const updatedItem = { make: 'New Make' };
            existingItem.save = () => Promise.resolve(updatedItem);
            Item.findById = (id) => {
                expect(id).to.equal(itemId);
                return Promise.resolve(existingItem);
            };

            const result = await itemService.updateById(existingItem, updatedItem);

            expect(result.make).to.equal(updatedItem.make);
        });
    });

    describe('deleteById()', () => {
        it('should delete an item by ID', async () => {
            const itemId = '123456';
            const expectedItem = { _id: itemId, make: 'Make' };
            Item.findByIdAndDelete = (id) => {
                expect(id).to.equal(itemId);
                return Promise.resolve(expectedItem);
            };

            const result = await itemService.deleteById(itemId);
           
            expect(result).to.be.undefined;
        });
    });
});
