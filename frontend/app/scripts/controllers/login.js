'use strict';


angular.module('angularNodeTokenauthApp')
  .controller('LoginCtrl', function ($scope, alert, $auth) {

    $scope.submit = function () {
      $auth.login({
        email: $scope.email,
        password: $scope.password,
        method: 'POST'
      })
        .then(function (res) {
          alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.email + '!');
        })
        .catch(function (err) {
          alert('warning', 'Opps!', err.message);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(res) {
        console.log(res.user)
        alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.displayName + '!');
      }, function(err) {
        alert('warning', 'something went wrong. :(', err.message);
      });
    }
  });
