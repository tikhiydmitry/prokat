'use strict';

/* Controllers */
var carApp = angular.module('carApp', ['ngRoute', 'ngResource']);

/* Config */
carApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
          templateUrl:'template/home.html',
          controller:'CarListCtrl'
        })
        .when('/about',{
          templateUrl:'template/about.html',
          controller:'AboutCtrl'
        })
        .when('/contact',{
          templateUrl:'template/contact.html',
          controller:'ContactCtrl'
        })
        .when('/cars/:carId', {
          templateUrl:'template/car-detail.html',
          controller:'CarDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }
]);

/* Factory */
carApp.factory('Car', [
  '$resource', function($resource) {
    return $resource('cars/:carId.:format', {
      carId: 'cars',
      format: 'json',
      apiKey: 'someKeyThis'
      /* http://localhost:8888/phones/phones.json?apiKey=someKeyThis */
    }, {
      // action: {method: <?>, params: <?>, isArray: <?>, ...}
      update: {method: 'PUT', params: {carId: '@car'}, isArray: true}
    });
    //Phone.update(params, successcb, errorcb);
  }
]);

/* Filter */
carApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

carApp.controller('CarListCtrl',[
  '$scope','$http', '$location', 'Car',
  function($scope, $http, $location, Car) {

    Car.query({carId: 'cars'}, function(data) {
      $scope.cars = data;
    });

    //Phone.query(params, successcb, errorcb)

    //Phone.get(params, successcb, errorcb)

    //Phone.save(params, payloadData, successcb, errorcb)

    //Phone.delete(params, successcb, errorcb)

  }
]);

/* About Controller */
carApp.controller('AboutCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Contact Controller */
carApp.controller('ContactCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Phone Detail Controller */
carApp.controller('CarDetailCtrl',[
  '$scope','$http', '$location', '$routeParams', 'Car',
  function($scope, $http, $location, $routeParams, Car) {
    $scope.carId = $routeParams.carId;

    Car.get({carId: $routeParams.carId}, function(data) {
      $scope.car = data;
      $scope.mainImageUrl = data.images[0];
      //data.$save();
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  }
]);


