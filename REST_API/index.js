//Инициализация на базата
const mongoose = require('mongoose');
//Инициализация на express приложение
const express = require('express');
//Добавяне на imports
const cors = require('./src/middlewares/cors');
const auth = require('./src/middlewares/auth');

const furnitureController = require('./src/controllers/furniture');
const usersController = require('./src/controllers/users');


async function start() {
    try {
        const db = mongoose.connect('mongodb://localhost:27017/RestFurniture')
        console.log('DB Ready')
    } catch (error) {
        console.log('Error connecting to database');
        return process.exit(1);

    }

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(auth());

    app.use('/data/catalog', furnitureController);
    app.use('/users', usersController);

    //тест дали работи
    // app.get('/', (req, res) => {
    //     res.json({message: 'It works'});
    // })
    app.listen(3030, () => console.log('Rest Services started on port 3030'));
}


start();