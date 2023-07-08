const router = require('express').Router()
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/furnitureService');
const errorMapper = require('../util/errorMapper');


router.get('/', async (req, res) => {
    try {
        res.json(await api.getAll(req.query.where));
    } catch (error) {
        res.status(400).json({message: 'Bad request'})
    }
   
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        _ownerId: req.user._id
    };

    try {
        const result = await api.create(item);
        res.json(result);
    } catch (error) {
        console.error(error);
        const message = errorMapper(error);
        res.status(400).json({ message: message });
    }
});

router.get('/:id', preload(api), (req, res) => {
    res.json(res.locals.item);

    //All is now in PRELOAD
    // const id = req.params.id;

    // const item = await api.getById(id);

    // if (item) {
    //     res.json(item);
    // } else {
    //     res.status(404).json({ message: `Item ${id} not found` })
    // }
})

router.put('/:id', preload(api), isOwner(), async (req, res) => {
    const id = req.params.id;

    // res.locals.item == item
    // const item = {
    //     make: req.body.make,
    //     model: req.body.model,
    //     year: req.body.year,
    //     description: req.body.description,
    //     price: req.body.price,
    //     img: req.body.img,
    //     material: req.body.material
    // };

    try {
        const result = await api.updateById(res.locals.item, req.body);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: '-Request error-' });
    }
})

router.delete('/:id', preload(api), isAuth(), isOwner(), async (req, res) => {
    const id = req.params.id;

    try {
        const result = await api.deleteById(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Item ${id} not found` })
    }
})

module.exports = router;