
var app = angular.module('CustomerApp',['firebase','ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/templates/login.html'
                //controller: 'authCtrl as au'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl:'/templates/dashboard.html',
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
    }])

    .component('customer-form',{
        restrict: 'E',
        templateUrl: 'dashboard-form.html',
        controller: 'dashboardFormCtrl'
    });

function dashboardFormCtrl($firebaseArray, Auth) {
    let df = this;
    df.add = function () {
        let addCustomer = new Customer(this.name, this.email, this.phone, this.city);
        this.data.$add(addCustomer)
            .then(function(ref){
                var id = ref.key;
                console.log('added record with id ${id}');
            });
    };
    function Customer(name, email, phone, city){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city
    }
    df.getOldItem = function (id) {
        itemId = id;
        editMode = true;
        this.name = this.data.$getRecord(id).name;
        this.email = this.data.$getRecord(id).email;
        this.phone = this.data.$getRecord(id).phone;
        this.city = this.data.$getRecord(id).city;
    };
    df.editSubmit = function (id) {
        newItem = this.data.$getRecord(id);
        newItem.name = this.name;
        newItem.email = this.email;
        newItem.phone = this.phone;
        newItem.city = this.city;
        this.data.$save(newItem).then(editMode = false);
    };
    df.submit = () => {editMode ?  df.editSubmit(itemId) : this.add(this.name, this.email, this.phone, this.city)};
}