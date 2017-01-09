'use strict';

require('angular');
require('angular-ui-router');
require('firebase');

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
'use strict';

app.controller('testCtrl', function(){
    this.message = 'Hola!';
});

