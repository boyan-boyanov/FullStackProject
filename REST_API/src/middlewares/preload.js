const { getById } = require("../services/furnitureService");

module.exports = () => async (req, res, next) => {
    const id = req.params.id;

    const item = await getById(id);
    if (item) {
        res.locals.item = item;
        next();
    } else {
        res.status(404).json({ message: `Item ${id} not found` })
    }
}