// Main javascript app

console.log('angularApp was loaded sound');

var app = angular.module("angularApp" ,["ngRoute", "tutorialControlModule", "filterCompControlModule", "otherPagesControlModule"]);

// Fix the problem with the forward slash
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

// Set the rotuting feature
app.config(function($routeProvider){
    $routeProvider

        .when("/", {
            templateUrl: "views/tutorialTests.html",
            controller: "TutorialCtrl"
        })

        .when("/anotherPageTest", {
            templateUrl: "views/anotherPageTest.html",
            controller: "OtherPagesCtrl"
        })

        .when("/page2", {
            templateUrl: "views/page2.html",
            controller: "OtherPagesCtrl"
        })

        .when("/page3", {
            templateUrl: "views/page3.html",
            controller: "OtherPagesCtrl"
        })

        .otherwise({
            redirectTo: "/"
        });
});