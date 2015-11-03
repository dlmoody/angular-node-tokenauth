'use strict';


angular.module('angularNodeTokenauthApp')
    .controller('LoginCtrl', function (alert, $auth, $state) {
        var vm = this;
        vm.submit = function () {
            $auth.login({
                email: vm.email,
                password: vm.password,
                method: 'POST'
            }).then(function (res) {
                alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.email + '!');
                $state.go('main');
            }).catch(function (err) {
                alert('warning', 'Opps!', err.message);
            });
        };
        vm.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (res) {
                alert('success', 'Thanks for returning ', 'Welcome, ' + res.data.user.displayName + '!');
                $state.go('main');
            }, function (err) {
                alert('warning', 'something went wrong. :(', err.message);
            });
        };
    });
