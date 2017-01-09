app.controller('testCtrl', function(){
    this.message = 'Hola!';
});

app.factory('Auth', function ($firebaseAuth) {
    var config = {
        apiKey: "AIzaSyAEA_TcUq4sXhMP3PrrrnZhPjD4NEXVork",
        authDomain: "customerdbapp.firebaseapp.com",
        databaseURL: "https://customerdbapp.firebaseio.com/",
    };
    firebase.initializeApp(config);
    return $firebaseAuth();
});

app.controller('authCtrl',function (Auth) {

    Auth.$onAuthStateChanged(firebaseUser => {
        this.firebaseUser = firebaseUser;
        if(firebaseUser){
            console.log(firebaseUser);
        } else{
            console.log('not logged in');
        }
    });

    this.login = function(){
        Auth.$signInWithEmailAndPassword(this.mail, this.pass).then(function (firebaseUser) {
            console.log('Signed as', firebaseUser);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        })
    };

    this.register = function () {
        Auth.$createUserWithEmailAndPassword(this.mail, this.pass)
            .then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
            }).catch(function(error) {
            console.error("Error: ", error);
        });
    };

    this.logout = function () {
        Auth.$signOut();
    }

})