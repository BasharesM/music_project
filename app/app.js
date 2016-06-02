var app = angular.module("MyApp", ["ngRoute", "mycontrollers", "mydirectives", "myFilters"]);


app.config(function($routeProvider){
    
    $routeProvider
    .when("/", {
        templateUrl : "librairie.html",
        controller : "LibrairieController"
    })
    .when("/song/:id", {
        templateUrl : "song.html",
        controller : "SongController"
    })
    .when("/contact", {
        templateUrl : "contact.html",
        controller : "ContactController"
    })
    .otherwise("/");
});