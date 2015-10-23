'use strict';

angular.module('angularNodeTokenauthApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {
    $http.get(API_URL + 'jobs')
      .success(function(jobs) {
        $scope.jobs = jobs;
      })
      .error(function(err) {
        console.log('an error occured: ' + err.message);
        alert('warning', 'unable to get jobs!', err.message);
      })

  });
