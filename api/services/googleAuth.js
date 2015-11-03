/**
 * Created by 35376 on 11/2/2015.
 */

var request = require('request');
var User = require('../model/User');
var createSendToken = require('./jwt').createSendToken;
var config = require('../config');


module.exports = function(req, res) {
    var params = tokenParams(req);
    var url = 'https://www.googleapis.com/oauth2/v3/token?';
    request.post(url, {
        json: true,
        form: params
    }, function(err, response, body) {
        if(!err && response.statusCode == 200) {
            var accessToken = body.access_token;
            var apiUrl = 'https://www.googleapis.com/plus/v1/people/me';
            var headers = {
                Authorization: 'Bearer ' + accessToken
            }

            request.get({
                url: apiUrl,
                headers: headers,
                json: true
            }, function(error, response, profile) {
                if(!err && response.statusCode == 200){

                    var email = profile.emails[0].value;
                    var name = profile.displayName;
                    User.findOne({googleId: profile.id}, function(err, user) {
                        if(user) return createSendToken(user,res);

                        var newUser = new User();
                        newUser.googleId = profile.id;
                        newUser.displayName = name;
                        newUser.save(function(err) {
                            if(err){
                                return res.status(500).send({
                                    message: 'Problem occurred creating user.'
                                });
                            }
                            createSendToken(newUser, res);
                        })

                    })
                }
                else{
                    return res.status(response.statusCode).send({
                        message: 'RuhRoh!!. sumpins wrong wif da googles problem getting profile'
                    });
                }

            })
        }
        else{
            return res.status(response.statusCode).send({
                message: 'RuhRoh!!. sumpins wrong wif da googles problem getting access'
            });
        }
    })
};

function tokenParams(req) {
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    }
    console.log(params)
    return params

}