
var app = angular.module('CustomerApp',['firebase','ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateURL: ''
            })
            .state('dashboard',{
                url:'/dashboard',
                templateURL:''
            })
    });