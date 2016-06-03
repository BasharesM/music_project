
angular.module("mycontrollers", [])
    
//$route, $location, $routeParams, $routeProvider


.controller("LibrairieController", function($rootScope, $http, $interval, $location)
{    
    //$scope.songs = mp3Model.librairie.songs;
    
    //if ($rootScope.songs == undefined){
        getMedia();

        $interval(getMedia,5000);
        

        function getMedia(){
            $http.get("/medias").success(function(data){
                $rootScope.songs = data;
                
            });
        }


     // coder la suppression d'un mp3
    $rootScope.$on("remove", function(event, song){
        
       $rootScope.songs.removeItemByID(song); 
       $http.delete("/medias/" + song.id);
       
    });

    function playNewSong(songId)
    {
        var urlOfApi = "http://localhost:3000/files/"+songId;
        $rootScope.audio = new Audio(urlOfApi);
        $rootScope.audio.play();
    }

    // jouer une musique
    $rootScope.$on("play", function(event, song){

        console.log(event);

        if ($rootScope.audio)
        {
            $rootScope.audio.pause();
            setTimeout(function () {      
               playNewSong(song.id);
            }, 150);
        }
        else
            playNewSong(song.id);

    });

    $rootScope.$on("pause", function(event, song){

        if ($rootScope.audio)
        {
            $rootScope.audio.pause();
        }

    });

    $rootScope.$on("update", function(event, song){

        
     $location.path("/song/"+song.id);

    });
})


.controller("ContactController", function(){
    
    
    
})


.controller("SongController", function($scope, $rootScope, $routeParams, $location, $http){
    
    var songid = $routeParams.id;
    
    var song;
    for (var i = 0; i < $rootScope.songs.length; i++)
    {
        if ($rootScope.songs[i].id == songid)
        {
            song = $rootScope.songs[i];
            break;
        }
    }
    
    if (song)
    {
        $scope.song = angular.copy(song);
    }
    else
        $location.path("/");
   
    
    $scope.onCancel = function()
    {
        $location.path("/"); 
    };

    $scope.onSave = function()
    {
        for (var i = 0; i < $rootScope.songs.length; i++)
        {
            if ($rootScope.songs[i].id == songid)
            {
                $rootScope.songs[i] = $scope.song;
                break;
            }
        }

        $http.put("/medias/" + songid, {previousSong : song, newSong : $scope.song} ).success( function(){
            $location.path("/");
        })
        
        
    }
    
});






