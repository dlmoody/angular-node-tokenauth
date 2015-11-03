'use strict';
var _ = require('underscore');

var config = require('../config');
var jwt = require('jwt-simple');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'Job Finder',
    subTitle: 'Thanks for signing up!',
    body: 'please verify'
};


exports.send = function (email) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var mail = require("nodemailer").mail;

    mail({
        from: "moody.david@gmail.com", // sender address
        to: "moody.david@gmail.com", // list of receivers
        subject: "Hello ?", // Subject line
        html: getHtml(token)
    });

    //var transporter = nodemailer.createTransport({
    //    service: 'gmail',
    //    auth: {
    //        user: 'moody.david@gmail.com',
    //        pass: 'g00glej0hnnywh1te'
    //    }
    //});
    //transporter.sendMail({
    //    from: 'moody.david@gmail.com',
    //    to: email,
    //    subject: 'hello',
    //    html: getHtml(token)
    //}, function (error, info) {
    //    if (error) {
    //        return console.log(error);
    //    }
    //    console.log('Message sent: ' + info.response);
    //
    //});
};

function getHtml(token) {
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, 'utf8');
    var template = _.template(html);

    model.verifyUrl += token;

    return template(model).toString();
}


_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

