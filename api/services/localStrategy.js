/**
 * Created by 35376 on 11/2/2015.
 */
'use strict';
var User = require('../model/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {usernameField: 'email'};

exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {

    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {message: 'Wrong Email/Password'});
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) return done(err);

            if (!isMatch) {
                return done(null, false, {message: 'Wrong Email/Password'});
            }

            return done(null, user);

        });

    })

});

exports.register = new LocalStrategy(strategyOptions, function (email, password, done) {
    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            var newUser = new User({
                email: email,
                password: password
            });

            newUser.save(function (err) {
                return done(null, newUser);
            });
        }
        else {
            return done(null, false, {
                message: 'email already exists'
            });
        }

    })

});