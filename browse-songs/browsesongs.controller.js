(function () {
    'use strict';

    angular
        .module('app')
        .controller('BrowseSongsController', BrowseSongsController);

    BrowseSongsController.$inject = ['$scope','GoogleSpreadSheetService', '$rootScope', '$location'];
    function BrowseSongsController($scope,GoogleSpreadSheetService, $rootScope, $location) {
        var vm = this;

        if(!$rootScope.currentState) {
            $rootScope.previousState = "";
            $rootScope.currentState = "browsesongs";
        }
        else {
            $rootScope.previousState = $rootScope.currentState;
            $rootScope.currentState = "browsesongs";
            
        }
        //console.log("Current State:"+$rootScope.currentState+"Previous State:"+$rootScope.previousState);        

        vm.songs = [];
        vm.artist = [];

        initController();

        $rootScope.go = function ( path ) {
            $rootScope.clickedSong = path.split('/')[2];
            $location.path( '/'+path.split('/')[1] );
            
        };
        function initController() {
            if(!$rootScope.clickedSongList){
                loadSongs();
            }
            else
            {
                loadSetListSongs($rootScope.clickedSongList);
                //delete $rootScope.clickedSongList;
            }
        }
        function loadSongs() {
            GoogleSpreadSheetService.GetSongs().then(
                function(response) {
                    for(var i = 0; i < response.rows.length; i++) {
                        vm.songs.push(response.rows[i].cellsArray[0]);
                        vm.artist.push(response.rows[i].cellsArray[1]);
                    }
                     $scope.$apply();
                },
                // failure
                function(error) {
                    // handle failure
                }
            );
        }
        function loadSetListSongs(songList) {
            GoogleSpreadSheetService.GetSetListSongs('',songList).then(
                function(response) {
                    for(var i = 0; i < response.rows.length; i++) {
                        vm.songs.push(response.rows[i].cellsArray[0]);
                        vm.artist.push(response.rows[i].cellsArray[1]);
                    }
                     $scope.$apply();
                },
                // failure
                function(error) {
                    // handle failure
                }
            );
        }

    }

})();