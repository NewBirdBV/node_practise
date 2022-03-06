const express = require('express'),
    app = express.createServer(),
    mongoose = require('mongoose');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'my secret '}));


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first: String,
    last: String,
    /* cause error why?*/
   /* email: { type: String, unique: true },
    password: { type: String, index: true },*/
    email: { type: String },
    password: { type: String }
});

const User = mongoose.model('User', UserSchema);

app.use(function (req, res, next) {
    if (req.session.loggedIn) {
        res.local('authenticated', true);
        User.findById(req.session.loggedIn, function (err, doc) {
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

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login', { signupEmail: false });
});

app.get('/signup', function (req, res, next) {
    res.render('signup');
});

app.post('/signup', function (req, res, next) {
    var user = new User(req.body.user);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(`/login/${req.body.user.email}`)
    });
});

app.get('/login/:signupEmail', function (req, res, next) {
    res.render('login', {
        signupEmail: req.params.signupEmail
    })
});

app.post('/login', function (req, res, next) {
    User.findOne({
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

mongoose.connect('mongodb://admin:zaq1@WSX@localhost:27017/my-site');

app.listen(3000, function () {
    console.log('app listening on 3000');
});
