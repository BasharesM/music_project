
angular.module("mydirectives", [])

.directive("row", function(){
             
              return {
                  restrict : 'A',
                  replace : true,
                  templateUrl: "row.html",
                  /*link: function(scope, element, attr)
                  {
                      //console.log( scope.$parent );
                      //console.log( element );
                      var counter = 0;
                      element.find("input").on("click", function(){
                          counter++;
                          if (counter == 1)
                          {
                             element.css("background-color", "red");
                          }
                          else
                          if (counter == 2)
                          {
                             scope.$emit('remove', scope.song);
                          }
                      });
                      
                      //$watch, $digest, $apply
                  }*/
              };
              
          });