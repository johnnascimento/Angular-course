/**
 * Created by Thomas on 5/28/2015.
 */
console.log("%c App file has just been loaded", "font-size: 16px; font-weight: 700; color: #319F92");

var app = angular.module('groceryListApp', ["ngRoute"]); // Injecting routing dependecy into our app

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "views/groceryList.html",
        controller: "HomeController"
    })

    .when("/addItem", {
        templateUrl: "views/addItem.html",
        controller: "GorceryListItemController"
    })

    .when("/addItem/edit/:id/", {
        templateUrl: "views/addItem.html",
        controller: "GorceryListItemController"
    })

    .otherwise({
        redirectTo: "/"
    })
});

app.service("GroceryService", function(){

    var groceryService = {};

    groceryService.title = "John's grocery List";
    groceryService.version = "App version 0.2";

    groceryService.groceryItems = [
        {id: 1, completed: false, itemName: 'milk', date: new Date("October 1, 2019 11:13:00")},
        {id: 2, completed: false, itemName: 'cookies', date: new Date("October 1, 2019 12:30:00")},
        {id: 3, completed: false, itemName: 'ice cream', date: new Date("October 2, 2019 10:13:00")},
        {id: 4, completed: false, itemName: 'potatoes', date: new Date("January 20, 2019 18:13:00")},
        {id: 5, completed: false, itemName: 'cereal', date: new Date("January 20, 2019 20:25:00")},
        {id: 6, completed: false, itemName: 'bread', date: new Date("November 2, 2019 05:33:25")},
        {id: 7, completed: false, itemName: 'eggs', date: new Date("September 24, 2019 21:13:00")},
        {id: 8, completed: false, itemName: 'tortillas', date: new Date("March 18, 2019 11:13:00")},
        {id: 9, completed: false, itemName: 'Chocolicia', date: new Date("July 1, 2019 00:01:00")}
    ];

    groceryService.findById = function(id) {
        console.log("Find By Id is working!");
        for(var item in groceryService.groceryItems) {
            console.log("Find By Id FOR LOOP");
            if(groceryService.groceryItems[item].id === id) {
                console.log("Find By Id IF STATEMENT");
                console.log("%c Find By Id IF STATEMENT", "font-size14px; color:lightsalmon;", groceryService.groceryItems[item]);
                return groceryService.groceryItems[item];
            }
        }
    };

    groceryService.getNewId = function() {

        if(groceryService.newId) {
            console.log("%c Grocery Service dot new id", "font-size:14px; color:#227722;");
            groceryService.newId++;
            return groceryService.newId;
        } else {
            console.log("%c Grocery Service dot matched id", "font-size:14px; color:#227722;");
            var maxId = _.max(groceryService.groceryItems, function(entry){ return entry.id; });
            groceryService.newId = maxId.id + 1;
            return groceryService.newId;
        }
    };

    groceryService.markCompleted = function(entry) {
        entry.completed = !entry.completed;
    }

    groceryService.removeItem = function(entry) {
        var idx = groceryService.groceryItems.indexOf(entry);

        groceryService.groceryItems.splice(idx, 1);
    };

    groceryService.save = function(entry) {
        console.log("Went into the service");

        var updatedItem = groceryService.findById(entry.id);

        if(updatedItem) {
            console.log("%c Updating entry", "font-size:14px; color:#227722;");

            updatedItem.completed = entry.completed;
            updatedItem.itemName = entry.itemName;
            updatedItem.date = entry.date;
        } else {
            console.log("%c Creating a new entry", "font-size:14px; color:#772222;");

            entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
        }
    };

    return groceryService;
});

app.controller("HomeLabelsController", ["$scope", "GroceryService", function($scope, GroceryService){
    $scope.appTitle = GroceryService.title;
    $scope.appVersion = GroceryService.version;
}]);


app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService) {

    console.log("%c Home controller is working", "font-size:14px; color:#662222;");

    $scope.groceryItems = GroceryService.groceryItems;

    console.log($scope.groceryItems);

    $scope.removeItem = function(entry) {
        GroceryService.removeItem(entry);
    };

    $scope.markCompleted = function(entry){
        GroceryService.markCompleted(entry);
    };
}]);


app.controller("GorceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){

    if(!$routeParams.id) {
        console.log("%c The route passed in already exists", "font-size:14px; color:#006600;");
        $scope.groceryItem = { id: 0, completed: false, itemName: '', date: new Date() };
    } else {
        console.log("%c The route passed in DOESN'T exists. So, let's create it!", "font-size:14px; color:#022066;");
        $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
    }


    $scope.rp = "Route Parameter Value: " + $routeParams.id + " | Class: " + $routeParams.class + " | Category: " + $routeParams.category;
    // $scope.groceryItem = { id: 0, completed: true, itemName: "", date: new Date() }

    $scope.save = function() {
        console.log("Went into the controller");
        GroceryService.save( $scope.groceryItem );
        $location.path("/");
    }
}])

// This directive below is, basically, used to create a custom html tag to turn our code into something more readable

app.directive("tbGroceryItem", function(){
    return {
        restrict: "E",
        templateUrl: "views/groceryItem.html"
    }
});