
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
            data: '<',
            editMode: '='
        }
    })
    .component('login',{
        templateUrl:'/templates/login-comp.html',
        controller: loginCtrl
    });


function dashboardCtrl($firebaseArray,$state, Auth) {
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

function dashboardFormCtrl(Auth, $state) {
    //editMode = false;
    this.add = function () {
        let addCustomer = new Customer(this.name, this.email, this.phone, this.city, this.Url);
        this.data.$add(addCustomer).then(this.reset());
    };
    function Customer(name, email, phone, city, photo = null){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.photo = photo
    }
    this.editSubmit = function (id) {
        let newItem = this.data.$getRecord(id);
        if(this.name!=null) newItem.name = this.name;
        if(this.email!=null) newItem.email = this.email;
        if(this.phone!=null) newItem.phone = this.phone;
        if(this.city!=null) newItem.city = this.city;
        if(this.Url!=null) newItem.photo = this.Url;
        this.data.$save(newItem).then(this.editMode = false).then(this.reset());
    };
    this.submit = () => {Auth.editMode ?  this.editSubmit(Auth.itemId) : this.add(this.name, this.email, this.phone, this.city, this.Url)};
    this.reset = function(){
            console.log('hello');
            this.name = undefined;
            this.email = undefined;
            this.phone = undefined;
            this.city = undefined;
    }
    this.logout = function () {
        $state.go('login');
        Auth.$signOut();
    };
    this.uploadFile = function() {
        this.selectedFile = document.getElementById('nameImg').files[0];
        console.log(this.selectedFile);
        if (this.selectedFile) {
            var filename = this.selectedFile.name + Math.random();
            var storageRef = firebase.storage().ref('/customers/' + filename);
            var uploadTask = storageRef.put(this.selectedFile)
                .then(() => storageRef.getDownloadURL()
                    .then(this.Url = storageRef.getDownloadURL().then(console.log('go next'))));
            console.log(this.Url);
        }
    }

}

function customerCtrl(Auth) {
    this.delete = function (id) {
        console.log(id);
        this.data.$remove(this.data.$getRecord(id));
    };
    this.getOldItem = function (id) {
        Auth.itemId = id;
        Auth.editMode = true;
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
    this.login = function () {
        Auth.$signInWithEmailAndPassword(this.mail, this.pass).then(function (firebaseUser) {
            console.log('Signed as', firebaseUser);
            $state.go('dashboard');
        }).catch(function (error) {
            console.error("Authentication failed:", error);
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


