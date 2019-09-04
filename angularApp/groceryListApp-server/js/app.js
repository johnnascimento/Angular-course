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

app.service("GroceryService", function($http){

    var groceryService = {};

    groceryService.title = "John's grocery List";
    groceryService.version = "App version 0.2";

    groceryService.groceryItems = [];

    $http.get("data/server_data.json")
        .success(function(data) {
            console.log("%c Success", "font-size:14px; font-weight: bold; color:#252585;")
            groceryService.groceryItems = data;

            for(var item in groceryService.groceryItems) {
                groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date)
            }
        })
        .error(function(data, status){
            console.log("%c Error", "font-size:14px; color:#850252;", status)
        });


    groceryService.findById = function(id) {
        console.log("Find By Id is working!");
        for(var item in groceryService.groceryItems) {
            console.log("Find By Id FOR LOOP");
            if(groceryService.groceryItems[item].id === id) {
                console.log("Find By Id IF STATEMENT");
                console.log("%c Find By Id IF STATEMENT", "font-size:14px; color:lightsalmon;", groceryService.groceryItems[item]);
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

        // This works for http-server angular, although the right way of doing this was to use DELETE of POST method
        $http.get("data/delete_item.json", {id: entry.id})
            .success(function(data){

                if(data.status) {
                    var idx = groceryService.groceryItems.indexOf(entry);
                    groceryService.groceryItems.splice(idx, 1);
                }

            })

            .error(function(data, status){
                console.log('Delete request is not working');
            })
    };


    groceryService.save = function(entry) {
        console.log("Went into the service");

        var updatedItem = groceryService.findById(entry.id);

        if(updatedItem) {
            console.log("%c Updating entry", "font-size:14px; color:#227722;");

            //Creating a request to the server in order to get the app updated based on updated_item.json's response.
            // The correct way of doing this is by using pPOST method. Hwever, due to technical limitation I'm using GET
            $http.get("data/updated_item.json", entry)
                .success(function(data){
                    if(data.status == 1) {
                        updatedItem.completed = entry.completed;
                        updatedItem.itemName = entry.itemName;
                        updatedItem.date = entry.date;
                    }
                })

                .error(function(data, status){
                    console.log('This is not returning anything', 'font-size: 16px; color: #770022;');
                });

        } else {
            console.log("%c Creating a new entry", "font-size:14px; color:#772222;");

            // $http.post("data/added_item.json", entry) ------The correct way of doing this is passing the data along with post methd----------
            $http.get("data/added_item.json", entry)
                .success(function(data, entry) {
                    entry.id = response.data.newId; // New method of doing things by using a server-side technique
                })

                .error(function(data, status) {
                    console.log('Sorry buddy! This is an error message.');
                });

            // Another way of doing the above task:
            /*$http({
                    method: "GET",
                    url: "data/added_item.json",
                    params: "entry"
                }).then(function successCallback(data) {
                    entry.id = data.newId; // New method of doing things by using a server-side technique
                }, function errorCallback(data, status) {
                    console.log('Sorry buddy! This is an error message.');
                });*/

            // entry.id = groceryService.getNewId(); Local code as was done before
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

    $scope.$watch( function() { return GroceryService.groceryItems; }, function(groceryItems) {
        $scope.groceryItems = groceryItems;
    })
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