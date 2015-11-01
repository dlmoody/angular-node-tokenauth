'use strict';


angular.module('angularNodeTokenauthApp')
  .controller('LoginCtrl', function ($scope, alert, auth) {
    $scope.submit = function () {

      auth.login($scope.email, $scope.password)
        .success(function (res) {
          alert('success', 'Thanks for returning ', 'Welcome, ' + res.user.email + '!');
        })
        .error(function (err) {
          alert('warning', 'Opps!', err.message);
        });
    };
    $scope.google = function() {
      auth.googleAuth().then(function(res) {
        console.log(res.user)
        alert('success', 'Thanks for returning ', 'Welcome, ' + res.user.displayName + '!');
      }, function(err) {
        alert('warning', 'something went wrong. :(', err.message);
      });
    }
  });
