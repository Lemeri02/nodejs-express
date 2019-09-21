const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app
.use(cors())
.use('/api', require('./api')(express))
.get('/', (req, res) => {
    res
    .status(200)
    .set({
        'Content-Type':'text/html; charset=utf-8'
    })
    .send('Привет!');
})
.get('/src', (req, res) => {
    res
    .status(200)
    .set({
        'Content-Type':'text/javascript; charset=utf-8'
    })
    fs.createReadStream('./index.js').pipe(res);
})
.use((req, res) => {
    res
    .status(404)
    .set({
        'Content-Type':'text/html; charset=utf-8'
    })
    .send('<h1>Не найдено</h1>');
})
.listen(PORT, ()=>console.log(`${process.pid} on ${PORT}`));