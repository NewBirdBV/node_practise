const express = require('express'),
    app = express.createServer(),
    mongodb = require('mongodb'),
    ObjectID = mongodb.ObjectID;

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'my secret '}));

app.use(function (req, res, next) {
    if (req.session.loggedIn) {
        res.local('authenticated', true);
        app.users.findOne({ _id: new ObjectID(req.session.loggedIn) }, function (err, doc) {
            if (err) return next(err);
            res.local('me', doc);
            next();
        })
    } else {
        res.local('authenticated', false);
        next();
    }
})

app.set('view engine', 'jade');
app.set('view options', { layout: false });

const server = new mongodb.Server('127.0.0.1', 27017);

new mongodb.Db('my-site', server).open(function (err, client) {
    if (err) {
        throw err;
    }
    console.log('connected to mongodb');
    app.users = new mongodb.Collection(client, 'users');
    app.listen(3000, function () {
        console.log('app listening on 3000');
    });
    /*client.ensureIndex('users', 'email', function (err) {
        if (err) throw err;
        client.ensureIndex('users', 'password', function (err) {
            if (err) throw err;
            console.log('ensured index');
            app.listen(3000, function () {
                console.log('app listening on 3000');
            });

        });
    })*/
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/signup', function (req, res, next) {
    res.render('signup');
});

app.post('/signup', function (req, res, next) {
    app.users.insert(req.body.user, function (err, doc) {
        if (err) {
            return next(err);
        }
        res.redirect(`/login/${doc[0].email}`)
    });
});

app.get('/login/:signupEmail', function (req, res, next) {
    res.render('login', {
        signupEmail: req.params.signupEmail
    })
});

app.post('/login', function (req, res, next) {
    app.users.findOne({
        email: req.body.user.email,
        password: req.body.user.password
    }, function (err, doc) {
        if (err) throw err;
        if (!doc) {
            return res.send('<p>User not found, go back and try again</p>')
        }
        req.session.loggedIn = doc._id.toString();
        res.redirect('/');
    });
});


app.get('/logout', function (req, res, next) {
    req.session.loggedIn = null;
    res.redirect('/')
});

