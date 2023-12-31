const Item = require('../models/Item')

async function getAll(query) {
    //use this query and if statement to return only isers publication
    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        return Item.find({ _ownerId: userId });
    }
    return Item.find({});
}

async function create(item) {
    const result = new Item({
        make: item.make,
        model: item.model,
        year: item.year,
        description: item.description,
        price: item.price,
        img: item.img,
        material: item.material,
        _ownerId: item._ownerId
    });

    // console.log(result);

    await result.save();

    return result;
};

async function getById(id) {
    const item = await Item.findById(id);

    return item
}

async function updateById(existing, item) {
    //existing = if res.locals.item exist  
    existing.make = item.make,
        existing.model = item.model,
        existing.year = item.year,
        existing.description = item.description,
        existing.price = item.price,
        existing.img = item.img,
        existing.material = item.material

    await existing.save();
    return existing;
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
};

