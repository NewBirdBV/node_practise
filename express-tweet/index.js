const express = require('express'),
    app = express.createServer(),
    search = require('./search'),
    blog = require('./blog');

const mockData = [
    {
        text: 'This is a message',
        'from_user': 'tim'
    }, {
        text: 'Are you ok?',
        'from_user': 'peter'
    }, {
        text: 'How are you?',
        'from_user': 'mike'
    }, {
        text: 'How old are you?',
        'from_user': 'nerlson'
    }
];

app.configure('production', function () {
    app.enable('view cache');
});

app.set('view engine', 'ejs');
app.set('view',`${__dirname}/views`);
app.set('view options', { layout: false });

app.get('/', function (req, res, next ) {
    res.render('index');
});

app.get('/api', function (req, res, next) {
    const { q } = req.query;
    res.send(mockData.filter(it => it.text.indexOf(q) !== -1));
})

app.get('/search', function (req, res, next) {
    search(req.query.keyword, function (err, tweets) {
        if (err) return next(err);
        res.render('search', { results: tweets, search: req.query.keyword });
    });
});

app.use('/blog', blog);

app.error(function (err, req, res, next) {
    if (err.message) {
        res.render('error', { errorMsg: err.message });
    } else {
        next();
    }
});

app.listen(3001);
