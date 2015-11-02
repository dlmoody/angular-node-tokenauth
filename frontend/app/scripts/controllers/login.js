'use strict';


angular.module('angularNodeTokenauthApp')
  .controller('LoginCtrl', function (alert, $auth) {
    var vm = this;
    vm.submit = function () {
      $auth.login({
        email: vm.email,
        password: vm.password,
        method: 'POST'
      })
        .then(function (res) {
          alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.email + '!');
        })
        .catch(function (err) {
          alert('warning', 'Opps!', err.message);
        });
    };
    vm.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(res) {
        console.log(res.user)
        alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.displayName + '!');
      }, function(err) {
        alert('warning', 'something went wrong. :(', err.message);
      });
    }
  });
