'use strict';

angular.module('angularNodeTokenauthApp')
  .service('alert', function ($rootScope, $timeout) {
    var alertTimeout;
    return function (type, title, message, timeout) {
      $rootScope.alert = {
        type: type,
        title: title,
        message: message,
        show: true,
        hasBeenShown: true
      };
      $timeout.cancel(alertTimeout);
      alertTimeout = $timeout(function () {
        $rootScope.alert.show = false;
      }, timeout || 2000);

    }
  });
