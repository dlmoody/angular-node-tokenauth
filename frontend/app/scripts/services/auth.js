'use strict';

angular.module('angularNodeTokenauthApp')
  .service('auth', function auth($http, API_URL, authToken, $state, $window, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loginUrl = API_URL + 'login';
    var registerUrl = API_URL + 'register';
    var googleUrl = [
      'https://accounts.google.com/o/oauth2/auth?',
      'scope=email%20profile&',
      'redirect_uri=http%3A%2F%2Flocalhost:9000&',
      'response_type=code&',
      'client_id=889774383226-g2css862t42gkj1mr869v3s8rd2mh9ln.apps.googleusercontent.com'
    ].join('');

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

    this.googleAuth = function() {
      var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ", top=" + ($window.outerHeight - 500) / 2.5 ;
      //$window.open(googleUrl, 'auth', options);
      var popup = $window.open(googleUrl, 'Google', options);
      $window.focus();

      var deferred = $q.defer();

      $window.addEventListener('message', function(event) {
        if(event.origin === $window.location.origin){
          var code = event.data ;
          popup.close();

          $http.post(API_URL + 'auth/google', {
            code: code,
            client_id: '889774383226-g2css862t42gkj1mr869v3s8rd2mh9ln.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:9000'
          }).success(function(jwt) {
            //console.log('jwt ' + jwt);
            authSuccessful(jwt);
            deferred.resolve(jwt);
          });
        }
      });

      return deferred.promise;
    }




  });
