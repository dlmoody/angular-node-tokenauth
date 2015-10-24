'use strict';

angular.module('angularNodeTokenauthApp')
  .service('auth', function auth($http, API_URL, authToken, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loginUrl = API_URL + 'login';
    var registerUrl = API_URL + 'register';

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function(email, password) {
      return $http.post(loginUrl, {email: email, password: password})
      .success(authSuccessful);
    }

    this.register = function(email, password) {
      return $http.post(registerUrl, {email: email, password: password})
      .success(authSuccessful);
    }


  });
