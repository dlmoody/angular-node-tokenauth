'use strict';

/**
 * @ngdoc function
 * @name angularNodeTokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularNodeTokenauthApp
 */
angular.module('angularNodeTokenauthApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function () {

      $auth.signup({
        email: $scope.email,
        password: $scope.password,
        method: 'POST'
      })
        .then(function (res) {
          alert('success', 'Account Created! ', 'Welcome, ' + res.data.user.email + '!');
        })
        .catch(function (err) {
          alert('warning', 'Opps!', err.message);
        });



    }
  });
