// Main javascript app

console.log('groceryListApp was loaded sound!');

var app = angular.module('groceryListApp', ['ngRoute']);

// Fix the problem with the forward slash
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);