const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app
.use(cors())
.use('/api', require('./api')(express))
.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})
.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'about.html'))
})
.get('/static_pdf_file_one', (req, res) => {
    res
    .status(200)
    .set({
        'Content-Type':'application/pdf'
    })
    .sendFile(path.join(__dirname, 'public', 'static.pdf'));
})
.get('/static_pdf_file_two', (req, res) => {
    res
    .status(200)
    .set({
        'Content-Type':'application/pdf'
    })
    .sendFile(path.join(__dirname, 'public', 'mimetypes.pdf'));
})
.use((req, res) => {
    res
    .status(404)
    .set({
        'Content-Type':'text/html; charset=utf-8'
    })
    .send('<h1 color="red">Не найдено 404</h1>');
})
.listen(PORT, ()=>console.log(`${process.pid} on ${PORT}`));