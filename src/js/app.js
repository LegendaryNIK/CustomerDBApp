
var app = angular.module('CustomerApp',['firebase','ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template:'<login></login>'
                //controller: 'authCtrl as au'
            })
            .state('dashboard',{
                url:'/dashboard',
                template:'<dashboard></dashboard>',
                resolve: {
                    'currentAuth' : ['Auth',  (Auth) => Auth.$requireSignIn()]
                }
            });
        $urlRouterProvider.otherwise('/login');

    })
    .service('vbService',function () {
        this.editMode = false;
        this.url={};
    })

    .run(["$rootScope", "$state", function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go('login',true);
            }
        });
    }])
    .component('dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: dashboardCtrl
    })
    .component('dashboardform',{
        templateUrl: '/templates/dashboard-comp.html',
        controller: dashboardFormCtrl,
        bindings:   {
            data: '<',
            editMode: '<'
        }
    })
    .component('customer',{
        templateUrl: '/templates/customer.html',
        controller: customerCtrl,
        bindings: {
            customer: '<',
            data: '<'
        }
    })
    .component('login',{
        templateUrl:'/templates/login-comp.html',
        controller: loginCtrl
    })
    .component('logoutbtn',{
        template: '<span ng-click="$ctrl.logout()" class="btn btn-default">Logout</span>',
            controller: function (Auth, $state) {
            this.logout = function () {
                $state.go('login');
                Auth.$signOut();
            };
        }
    });


function dashboardCtrl($firebaseArray, vbService) {
    var ref = firebase.database().ref().child('customers');
    this.data  = $firebaseArray(ref);
    /*this.delete = function (id) {
     console.log(id);
     this.data.$remove(this.data.$getRecord(id));
     };
     this.getOldItem = function (id) {
     itemId = id;
     editMode = true;
     this.name = this.data.$getRecord(id).name;
     this.email = this.data.$getRecord(id).email;
     this.phone = this.data.$getRecord(id).phone;
     this.city = this.data.$getRecord(id).city;
     };
     this.editSubmit = function (id) {
     newItem = this.data.$getRecord(id);
     newItem.name = this.name;
     newItem.email = this.email;
     newItem.phone = this.phone;
     newItem.city = this.city;
     this.data.$save(newItem).then(editMode = false).then(this.reset());
     };
     this.submit = () => {editMode ?  this.editSubmit(itemId) : this.add(this.name, this.email, this.phone, this.city)};
     this.logout = function () {
     $state.go('login');
     Auth.$signOut();
     };
     this.reset = function(){
     console.log('hello');
     this.name = '';
     this.email = '';
     this.phone = '';
     this.city = '';
     }*/
}

function dashboardFormCtrl(vbService, Auth, $state) {
    //this.test = false;
    this.add =  () => {
        let addCustomer = new Customer(this.name, this.email, this.phone, this.city, this.url);
        this.data.$add(addCustomer).then(this.reset());
        vbService.editMode = false;
    };
    function Customer(name, email, phone, city, photo = ''){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.photo = photo
    }
    this.editSubmit = (id) => {
        let newItem = this.data.$getRecord(id);
        if(this.name!=null) newItem.name = this.name;
        if(this.email!=null) newItem.email = this.email;
        if(this.phone!=null) newItem.phone = this.phone;
        if(this.city!=null) newItem.city = this.city;
        if(this.url!=null) newItem.photo = this.url;
        this.data.$save(newItem).then(vbService.editMode = false).then(this.reset());
    };
    this.submit = () => {
        vbService.editMode ? this.editSubmit(vbService.itemId) : this.add(this.name, this.email, this.phone, this.city, this.url)
    };
    this.reset = () => {
            console.log('hello');
            this.name = undefined;
            this.email = undefined;
            this.phone = undefined;
            this.city = undefined;
            this.url = null;
            document.getElementById('nameImg').files[0] = null;
            console.log(this.url);
    };
    this.uploadFile = () => {
        //this.sync();
        console.log(this.editMode);
        this.selectedFile = document.getElementById('nameImg').files[0];
        console.log(this.selectedFile);
        if (this.selectedFile) {
            this.test = true;
            var filename = this.selectedFile.name + Math.random();
            var storageRef = firebase.storage().ref('/customers/' + filename);
            var uploadTask = storageRef.put(this.selectedFile)
                .then(() => this.url = storageRef.getDownloadURL().then((alert('Image loaded'))));
            console.log(this.url);
        } else alert('Please choose a photo');
    }
}

function customerCtrl(vbService) {
    this.delete = (id) => {
        console.log(id);
        this.data.$remove(this.data.$getRecord(id));
    };
    this.getOldItem =  (id) => {
        vbService.itemId = id;
        vbService.editMode = true;
        alert('Entering edit mode');
    };
}
function loginCtrl($state, Auth) {
    //watch authState
    Auth.$onAuthStateChanged(firebaseUser => {
        this.firebaseUser = firebaseUser;
        if (firebaseUser) {
            console.log(firebaseUser);
            $state.go('dashboard');
        } else {
            console.log('not logged in');
        }
    });
    //log in
    this.message = '';
    this.login = function () {
        Auth.$signInWithEmailAndPassword(this.mail, this.pass).then(function (firebaseUser) {
            console.log('Signed as', firebaseUser);
            $state.go('dashboard');
        }).catch(function (error) {
            console.error("Authentication failed:", error);
            alert(error);
        })
    };
    //register new
    this.register = function () {
        Auth.$createUserWithEmailAndPassword(this.mail, this.pass)
            .then(function (firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
                this.login();
            }).catch(function (error) {
            console.error("Error: ", error);
        });
    };
    //log out
    this.logout = function () {
        Auth.$signOut();
    };
}


