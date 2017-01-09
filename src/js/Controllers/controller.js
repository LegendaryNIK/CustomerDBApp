//firebaseAuth factory service
(function () {
    var config = {
        apiKey: "AIzaSyAEA_TcUq4sXhMP3PrrrnZhPjD4NEXVork",
        authDomain: "customerdbapp.firebaseapp.com",
        databaseURL: "https://customerdbapp.firebaseio.com/"
    };
    firebase.initializeApp(config);
})();
/*
app.factory('Auth', function ($firebaseAuth) {
    var config = {
        apiKey: "AIzaSyAEA_TcUq4sXhMP3PrrrnZhPjD4NEXVork",
        authDomain: "customerdbapp.firebaseapp.com",
        databaseURL: "https://customerdbapp.firebaseio.com/"
    };
    firebase.initializeApp(config);
    return $firebaseAuth();
});
*/
app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]);




// authentification controller
app.controller('authCtrl', function (Auth) {
    //watch authState
    Auth.$onAuthStateChanged(firebaseUser => {
        this.firebaseUser = firebaseUser;
        if(firebaseUser){
            console.log(firebaseUser);
        } else{
            console.log('not logged in');
        }
    });

    //log in
    this.login = function(){
        Auth.$signInWithEmailAndPassword(this.mail, this.pass).then(function (firebaseUser) {
            console.log('Signed as', firebaseUser);
            //$state.go('dashboard');
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        })
    };

    //register new
    this.register = function () {
        Auth.$createUserWithEmailAndPassword(this.mail, this.pass)
            .then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
                //this.login();
            }).catch(function(error) {
            console.error("Error: ", error);
        });
    };

    //log out
    this.logout = function () {
        Auth.$signOut();
    }

});




app.controller('dbController', function ($firebaseArray, Auth) {
    var ref = firebase.database().ref().child('customers');
    this.data  = $firebaseArray(ref);
    let add = function () {
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

    this.delete = function (id) {
        console.log(id);
        this.data.$remove(this.data.$getRecord(id));
    };

    this.edit = function (id) {
        let item = this.data.$getRecord(id);
        console.log(id);
        item.name = this.name;
        item.email = this.email;
        item.phone = this.phone;
        item.city = this.city;
        this.data.$save(item);
    };
    //TODO: сделать всё нормально


    this.logout = function () {
        Auth.$signOut();
    }
});