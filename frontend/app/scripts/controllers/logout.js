'use strict';


angular.module('angularNodeTokenauthApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    console.log('logging out..')
    $auth.logout();
    $state.go('main');
  });
