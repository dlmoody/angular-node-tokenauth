'use strict';


angular.module('angularNodeTokenauthApp')
  .factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var tokenName = 'userToken';

    var authToken = {
      setToken: function (token) {
        cachedToken = token;
        storage.setItem(tokenName, token)
      },
      getToken: function () {
        if (!cachedToken) {
          cachedToken = storage.getItem(tokenName);
        }
        return cachedToken;
      },
      isAuthenticated: function () {
        return !!authToken.getToken();
      },
      removeToken: function(){
        cachedToken = null;
        storage.removeItem(tokenName)
      }
    };

    return authToken;
  });
