// Tutorial controller created for demonstration purposes

console.log('tutorialControlModule was loaded sound');

angular.module("tutorialControlModule", [])

// Controllers
.controller("TutorialCtrl", ["$scope", "Calculations", function($scope, Calculations){

    $scope.tutorialObject = {};
    $scope.tutorialObject.title = "Main page";
    $scope.tutorialObject.subtitle = "Something important";
    $scope.tutorialObject.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    $scope.tutorialObject.bindOutput = 1;
    $scope.tutorialObject.bindBasketItem = 1;

    // START Objects created to be used in our ng-model directives
    $scope.tutorialObject.firstName = "John lenon";
    $scope.tutorialObject.lastName = "Nascimento da Silva";

    $scope.tutorialObject.bindGreatCalculationTitle = "Insert numbers on the underlying input fields and push the button calculate to do the following equation: (A * A) + (B * B)."
    $scope.tutorialObject.bindGreatCalculation = 0;
    $scope.tutorialObject.bindGreatCalculationFieldA = 0;
    $scope.tutorialObject.bindGreatCalculationFieldB = 1;

    // START Creating functions to be used in the ng-click directive
    $scope.timesTwo = function() {
        $scope.tutorialObject.bindOutput = Calculations.timesTwo($scope.tutorialObject.bindOutput);
    }

    $scope.addOne = function() {
        $scope.tutorialObject.bindBasketItem = Calculations.addOne($scope.tutorialObject.bindBasketItem);
    }

    $scope.greatMultiplication = function() {
        $scope.tutorialObject.bindGreatCalculation = Calculations.greatMultiplication($scope.tutorialObject.bindGreatCalculationFieldA, $scope.tutorialObject.bindGreatCalculationFieldB);
    }

}])

// Custom Directives
.directive("jlWarmWelcome", function(){
    return {
        restrict: "AE",
        template: "<div class=\"directiveCreated\"><p>Welcome!<br />I\'am glad you came."
    }
})

.directive("jlFarewell", function(){
    return {
        restrict: "AE",
        template: "<div class=\"directiveCreated\"><p>Catch you up later!"
    }
})

// Services
.factory("Calculations", function() {
    var calculations = {};

    calculations.timesTwo = function(a){
        return a * 2;
    };

    calculations.addOne = function(a){
        return a += 1;
    };

    calculations.greatMultiplication = function(a, b) {
        return (a * a) + (b * b);
    }

    return calculations;
});