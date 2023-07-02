//Инициализация на базата
const mongoose = require('mongoose');
//Инициализация на express приложение
const express = require('express');
//Добавяне на imports
const cors = require('./src/middlewares/cors');
const furnitureController = require('./src/controllers/furniture');


async function start() {
    try {
        const db = mongoose.connect('mongodb://localhost:27017/RestFurniture')
        console.log('DB Ready')
    }catch (error) {
        console.log('Error connecting to database');
        return process.exit(1);

    }
   
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/data/catalog', furnitureController);
    //тест дали работи
    // app.get('/', (req, res) => {
    //     res.json({message: 'It works'});
    // })
    app.listen(3030, () => console.log('Rest Services started on port 3030'));
}


start();