(function () {
    'use strict';
 
    angular
        .module('app', ['ngRoute', 'ngCookies','ui.router','dt-hamburger-menu'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$stateProvider'];
    function config($routeProvider, $locationProvider, $stateProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
 
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
 
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            
            .when('/mainmenu', {
                controller: 'MainMenuController',
                templateUrl: 'main-menu/mainmenu.view.html',
                controllerAs: 'vm'
            })
            
            .when('/browsesetlists', {
                controller: 'BrowseSetListsController',
                templateUrl: 'browse-setlists/browsesetlists.view.html',
                controllerAs: 'vm'
            }) 
            
            .when('/browsesongs', {
                controller: 'BrowseSongsController',
                templateUrl: 'browse-songs/browsesongs.view.html',
                controllerAs: 'vm'
            })
            
            .when('/viewsong', {
                controller: 'ViewSongController',
                templateUrl: 'view-song/viewsong.view.html',
                controllerAs: 'vm'
            }) 
            .otherwise({ redirectTo: '/login' });
            
    }
 
    run.$inject = ['$rootScope', '$location', '$cookies', '$http','$state'];

    function run($rootScope, $location, $cookies, $http, $state) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
        
        $rootScope.state = $state;
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/mainmenu','/browsesetlists','/browsesongs','/viewsong']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
        $rootScope.$on('$viewContentLoaded', 
        function(event, toState, toParams, fromState, fromParams, options){ 
            //alert("Hello"+event+toState+fromState+options);

        });        
        
        
    }
 
})();