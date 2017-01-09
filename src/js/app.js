
var app = angular.module('CustomerApp',['firebase','ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login.html',
                //controller: 'authCtrl as au'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl:'dashboard.html',
                resolve: {
                    'currentAuth' : ['Auth',  (Auth) => Auth.$requireSignIn()]
                }
            });
        $urlRouterProvider.otherwise('/login');
             
    })

    .run(["$rootScope", "$state", function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go('login',true);
            }
        });
    }]);
