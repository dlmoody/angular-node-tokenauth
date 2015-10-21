'use strict';

/**
 * @ngdoc function
 * @name angularNodeTokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularNodeTokenauthApp
 */
angular.module('angularNodeTokenauthApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {
    $scope.submit = function () {
      console.log("Registering new user");

      var url = 'http://localhost:3000/register';

      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .success(function (res) {
          alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
          authToken.setToken(res.token);
        })
        .error(function (err) {
          alert('warning', 'Opps!', 'could not register');
        });

    }
  });
