
console.log("otherPagesControlModule was loaded sound");

angular.module("otherPagesControlModule", [])

.controller("OtherPagesCtrl", ["$scope", function($scope){
    $scope.otherPagesComp = "This is another page for testing purposes";
}]);