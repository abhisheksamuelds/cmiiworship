(function () {
    'use strict';

    angular
        .module('app')
        .controller('BrowseSetListsController', BrowseSetListsController);

    BrowseSetListsController.$inject = ['$scope','GoogleSpreadSheetService', '$rootScope','$location'];
    function BrowseSetListsController($scope,GoogleSpreadSheetService, $rootScope, $location) {
        var vm = this;
        
        if(!$rootScope.currentState) {
            $rootScope.previousState = "";
            $rootScope.currentState = "browsesetlist";
        }
        else {
            $rootScope.previousState = $rootScope.currentState;
            $rootScope.currentState = "browsesetlist";
            
        }
        //console.log("Current State:"+$rootScope.currentState+"Previous State:"+$rootScope.previousState);        
        vm.setListDates = [];
        vm.setListItems = [];

        initController();
        
        $rootScope.go = function ( path ) {
            $rootScope.clickedSongList = path.split('/')[2];
            $location.path( '/'+path.split('/')[1] );
            
        };
 
        function initController() {
            loadSetLists();
            
        }
        function loadSetLists() {
            GoogleSpreadSheetService.GetSetLists().then(
                function(response) {
                    for(var i = 0; i < response.rows.length; i++) {
                        vm.setListDates.push(response.rows[i].cellsArray[0]);
                        vm.setListItems.push(response.rows[i].cellsArray[1]);
                    }
                    $scope.$apply();
                },
                // failure
                function(error) {
                    // handle failure
                    console.log("Error"+error);
                }
            );
        }

    }

})();