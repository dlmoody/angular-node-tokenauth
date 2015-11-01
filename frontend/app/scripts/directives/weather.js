'use strict'

var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
var key = '730960791d3bd7f756526bff133db63e';

angular.module('angularNodeTokenauthApp')
.directive('ngSparkline', function() {
  return {
   restrict: 'A',
   require: '^ngCity',
   transclude: true,
   scope: {
     ngCity: '@'
   },
   template: '<div class="sparkline"><div ng-transclude></div><div class="graph"></div></div>',
   controller: ['$scope', '$http', function($scope, $http) {
     $scope.getTemp = function(city) {
       console.log('getting weather for: ' + city);
       $http.jsonp( url + city + '&APPID=' + key + '&callback=JSON_CALLBACK').success(function(data) {

         var weather = [];
         angular.forEach(data.list, function(value) {
           weather.push(value);
         })
         $scope.weather = weather;
         console.log(weather);

       })
     }
   }],
   link: function(scope, iElem, attrib, ctrl) {
     //get weather details
     scope.getTemp(attrib.ngCity);
     scope.$watch('weather', function(newValue) {
       if(newValue) {
         var dataValues = [],
            width = 600,
            height = 200;

            angular.forEach(scope.weather,function(value) {
              dataValues.push( value.temp.max );
            });


            chartGraph(iElem,dataValues,{width: width, height: height})


       }
     });

   }
 }
})
.directive('ngCity', function() {
  return {
    controller: function($scope) {}
  }
});


var chartGraph = function(element, data, opts) {
  var width = opts.width || 200,
      height = opts.height || 80,
      padding = opts.padding || 30;

  // chart
  var svg     = d3.select(element[0])
                  .append('svg:svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('class', 'sparkline')
                  .append('g')
                    .attr('transform', 'translate('+padding+', '+padding+')');

  svg.selectAll('*').remove();

  var maxY    = d3.max(data),
      x       = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, width]),
      y       = d3.scale.linear()
                  .domain([0, maxY])
                  .range([height, 0]),
      yAxis = d3.svg.axis().scale(y)
                    .orient('left')
                    .ticks(5);

  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

  var line    = d3.svg.line()
                  .interpolate('linear')
                  .x(function(d,i){return x(i);})
                  .y(function(d,i){return y(d);}),
      path    = svg.append('svg:path')
                    .data([data])
                    .attr('d', line)
                    .attr('fill', 'none')
                    .attr('stroke-width', '1')
                    .attr('stroke', 'black');
}
