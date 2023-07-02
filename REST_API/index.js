//Инициализация на express приложение
const express = require('express');

const app = express();

//тест дали работи
app.get('/', (req, res) => {
    res.json({message: 'It works'});
})

app.listen(3030, () => console.log('Rest Services started on port 3030'));