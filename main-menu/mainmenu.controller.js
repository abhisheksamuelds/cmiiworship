(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainMenuController', MainMenuController);

    MainMenuController.$inject = ['$location','UserService', '$rootScope'];
    function MainMenuController($location,UserService, $rootScope) {
        var vm = this;
        
        if(!$rootScope.currentState) {
            $rootScope.previousState = "";
            $rootScope.currentState = "mainmenu";
        }
        else {
            $rootScope.previousState = $rootScope.currentState;
            $rootScope.currentState = "mainmenu";
            
        }
        //console.log("Current State:"+$rootScope.currentState+"Previous State:"+$rootScope.previousState);
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        if(!$rootScope.clickedSongList){
          delete $rootScope.clickedSongList;
        }
        
        initController();
        
        $rootScope.go = function ( path ) {
            $location.path( path );

             //$rootScope.state.transitionTo('browsesetlists',{ reload: true });
            
        };

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();