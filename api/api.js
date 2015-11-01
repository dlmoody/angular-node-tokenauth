var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./model/User');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');


var app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  console.log('user ' + user);
  done(null, user.id);
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

var strategyOptions = {usernameField: 'email'};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

  User.findOne({email: email}, function(err, user) {
    if(err) return done(err);

    if(!user) {
      return done(null, false, {message:'Wrong Email/Password'});
    }

    user.comparePasswords(password, function(err, isMatch) {
      if(err) return done(err);

      if(!isMatch) {
        return done(null, false, {message:'Wrong Email/Password'});
      }

      return done(null, user);

    });

  })

});

var registerStrategy = new LocalStrategy(strategyOptions,function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if(err) {
      return done(err);
    }

    if(!user) {
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

})

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);



app.post('/register', passport.authenticate('local-register'), function (req, res) {
  createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login') ,function(req, res) {
  createSendToken(req.user,res);
});

function createSendToken(user, res) {
  var payload = {
    sub: user.id
  };

  var token = jwt.encode(payload, "shhh...");

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });


}

var jobs = [
  'Cook',
  'Super Hero',
  'Unicorn Whisperer',
  'Toast Inspector'
];

app.get('/jobs', function(req, res) {
  if(!req.headers.authorization){
    return res.status(401).send({
      message: 'You are not authorized.'
    });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, 'shhh...');

  if(!payload.sub) {
    res.status(401).send({
      message: 'Authentication Failed!'
    });
  }
  res.json(jobs);
})

app.post('/auth/google', function(req, res) {
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
          console.log(profile)
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
})


function tokenParams(req) {
  var params = {
    code: req.body.code,
    client_id: req.body.client_id,
    client_secret: 'XKdNNbACtGuF2bl3D3hpIa8x',
    redirect_uri: req.body.redirect_uri,
    grant_type: 'authorization_code'
  }
  return params
  //return 'https://www.googleapis.com/oauth2/v3/token?' + requestUrl;

}


mongoose.connect('mongodb://localhost/psjwt');


var server = app.listen(3000, function () {
  console.log('api listening on ', server.address().port);
});
