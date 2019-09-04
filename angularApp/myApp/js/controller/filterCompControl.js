// Filter component controller created to add more functionality to our tutorial

console.log('filterCompControlModule was loaded sound');

angular.module("filterCompControlModule", [])

.controller("FilterCompCtrl", ["$scope", function($scope){
    $scope.filterCompObject = {};
    $scope.filterCompObject.title = "Filter component section";
    $scope.filterCompObject.subTitle = "This section englobe a few filter components demonstration";
    $scope.filterCompObject.upperCaseText = "This text is in a full blow uppercase";
    $scope.filterCompObject.lowerCaseText = "This text is in a full blow lowercase";
    $scope.filterCompObject.limitedTextField = "This field is limited to";
    $scope.filterCompObject.limitedTextNumber = 20;
    $scope.filterCompObject.limitedTextCropped = "The number of character of this field is controlled for the number displayed on the input above";


    // Product card
    $scope.filterCompObject.productName = "T-shirt";
    $scope.filterCompObject.productSize = [
        { 'size' : 'small', 'colour' : 'blue' },
        { 'size' : 'medium', 'colour' : 'pink' },
        { 'size' : 'large', 'colour' : 'brown'}
        ];

    $scope.filterCompObject.productPrice = 150;
    $scope.filterCompObject.imageSrc = "cdn-images-1.medium.com/max/1200/1*GmMtKznzJ1dS8sSzxzR3ow.png";
    $scope.filterCompObject.imageTitle = "Angular course title";
    $scope.filterCompObject.imageDescription = "Angular course description";
    $scope.filterCompObject.imageSize = 200;
}]);