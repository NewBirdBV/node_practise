const express = require('express');

const app = express.createServer();

app.get('/', function (req, res, next) {
    res.send('<h2>Blog Index</h2>')
});
app.get('/categories', function (req, res, next) {
    res.send('<h2>Blog categories</h2>')
});
app.get('/search', function (req, res, next) {
    res.send('<h2>Blog search</h2>')
});

module.exports = app;
