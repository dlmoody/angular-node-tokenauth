'use strict';

angular.module('angularNodeTokenauthApp')
.config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){

  $authProvider.loginUrl = API_URL + 'login';
  $authProvider.signupUrl = API_URL + 'register';

  $authProvider.google({
     clientId: '889774383226-g2css862t42gkj1mr869v3s8rd2mh9ln.apps.googleusercontent.com',
     url: API_URL + 'auth/google',
   });


  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl as login'
    })

    .state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    })
    .state('weather', {
      url: '/weather',
      templateUrl: '/views/weather.html'
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
  console.log('running run');
  var params = $window.location.search.substring(1);
  console.log(params);
  if(params && $window.opener && $window.opener.location.origin === $window.location.origin){

    var code = qs["code"];
    $window.opener.postMessage(code, $window.location.origin);
  }

});
