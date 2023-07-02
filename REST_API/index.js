//Инициализация на express приложение
const express = require('express');

const app = express();

//тест дали работи
app.get('/', (req, res) => {
    res.json({message: 'Hello'});
})

app.listen(3000, () => console.log('App listening on port 3000'));