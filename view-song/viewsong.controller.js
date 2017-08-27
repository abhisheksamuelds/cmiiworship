(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewSongController', ViewSongController);

    ViewSongController.$inject = ['$scope','GoogleSpreadSheetService', '$rootScope', '$location'];
    function ViewSongController($scope,GoogleSpreadSheetService, $rootScope, $location) {
        var vm = this;

        if(!$rootScope.currentState) {
            $rootScope.previousState = "";
            $rootScope.currentState = "viewsong";
        }
        else {
            $rootScope.previousState = $rootScope.currentState;
            $rootScope.currentState = "viewsong";
            
        }
        console.log("Current State:"+$rootScope.currentState+"Previous State:"+$rootScope.previousState);  
                    if($rootScope.previousState == $rootScope.currentState) {
                $location.path('/browsesongs');
            }

        vm.songName = null;
        vm.songArtist = null;
        vm.songChords = null;
        vm.songScale = null;

        initController();

        function initController() {
            viewSong($rootScope.clickedSong);
        }
        function viewSong(songName) {
            GoogleSpreadSheetService.ViewSong('',songName).then(
                function(response) {
                    for(var i = 0; i < response.rows.length; i++) {
                        vm.songName = response.rows[i].cellsArray[0];
                        vm.songArtist = response.rows[i].cellsArray[1];
                        vm.songChords = response.rows[i].cellsArray[2];
                        vm.songScale = response.rows[i].cellsArray[3];
                    }
                    $scope.$apply();
                    GoogleSpreadSheetService.LoadScaleList();
                },
                // failure
                function(error) {
                    // handle failure
                }
            );
        }

    }

})();