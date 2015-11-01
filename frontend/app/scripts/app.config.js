angular.module('angularNodeTokenauthApp').config(function($urlRouterProvider, $stateProvider, $httpProvider){

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
      controller: 'LoginCtrl'
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
  console.log('running run')
  var params = $window.location.search.substring(1);
  console.log(params);
  if(params && $window.opener && $window.opener.location.origin === $window.location.origin){

    var code = qs["code"];
    $window.opener.postMessage(code, $window.location.origin)
  }

});
