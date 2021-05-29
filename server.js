const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const guests = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/api/guests', (req, res) => res.json(guests));
app.post('/reserve', (req, res) => {

    const newGuest = req.body;
    console.log(newGuest);
    guests.push(newGuest);
    res.json(newGuest);
});





app.listen(PORT);