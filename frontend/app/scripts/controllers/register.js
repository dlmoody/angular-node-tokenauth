'use strict';

/**
 * @ngdoc function
 * @name angularNodeTokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularNodeTokenauthApp
 */
angular.module('angularNodeTokenauthApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function () {

      auth.register($scope.email, $scope.password)
        .success(function (res) {
          alert('success', 'Account Created! ', 'Welcome, ' + res.user.email + '!');
        })
        .error(function (err) {
          alert('warning', 'Opps!', err.message);
        });



    }
  });
