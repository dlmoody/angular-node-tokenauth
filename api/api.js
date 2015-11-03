var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var LocalStrategy = require('./services/localStrategy');
var createSendToken = require('./services/jwt').createSendToken;
var emailVerification = require('./services/emailVerification');

//emailVerification.send('moody.david@gmail.com')

// route functions
var jobs = require('./services/jobs');
var googleAuth = require('./services/googleAuth');
var facebookAuth = require('./services/facebookAuth');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    console.log('user ' + user);
    done(null, user.id);
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);


app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

app.get('/jobs', jobs);

app.post('/auth/google', googleAuth);

app.post('/auth/facebook', facebookAuth);


mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
