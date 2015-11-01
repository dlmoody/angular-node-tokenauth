'use strict';

angular.module('angularNodeTokenauthApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;
  });
