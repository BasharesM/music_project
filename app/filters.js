
angular.module("myFilters",[] )

.filter("duree", function(){
       return function(secondes){

           var minutes = Math.floor(secondes / 60);

           var reste = secondes - (minutes * 60);

           return minutes + "mn " + reste + "s";

       }; 
});