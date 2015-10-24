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

    }
  });
