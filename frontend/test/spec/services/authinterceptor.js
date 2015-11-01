'use strict';

describe('Service: authInterceptor', function () {

  // load the service's module

  beforeEach(function(){
    module(function($provide){
      $provide.service('authToken', function(){
        this.getToken = function(){ return 'thiscrazystring';}
      });
    });

  });

  var authInterceptor, authToken;
  beforeEach(module('angularNodeTokenauthApp'));
  beforeEach(module(function ($provide) {
    authToken = {};

    $provide.value('authToken', authToken);
  }));

  // instantiate service

  beforeEach(inject(function (_authInterceptor_) {
    authInterceptor = _authInterceptor_;

  }));

  describe('authIntercepter', function() {
    it('if token exists request(config) returns headers.Authorization with Bearer ', function () {
      authToken.getToken = function(){return "hdhdhdhdhdhd"; }
      var obj = {headers: {}};

      var actual =  authInterceptor.request(obj);

      expect(actual.headers.Authorization.indexOf('Bearer')).toBeGreaterThan(-1);

    });
    it('if token does not exist request(config) returns config ', function () {
      authToken.getToken = function(){return ""; }
      var obj = {headers: {}};

      var actual =  authInterceptor.request(obj)

      expect(actual).toBe(obj);

    });

    it('response(res) returns res ', function () {

      var obj = {headers: {}};

      var actual =  authInterceptor.response(obj);

      expect(actual).toBe(obj);

    });


  });



});
