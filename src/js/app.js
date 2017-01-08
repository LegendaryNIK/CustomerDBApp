'use strict';

require('angular');
require('angular-ui-router');

var app = angular.module('CustomerApp',['ui.router'])
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