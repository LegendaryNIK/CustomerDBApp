app.component('login',{
    templateUrl:'/templates/login-comp.html',
    controller: loginCtrl
});

function loginCtrl($state, Auth) {
    
    //watch authState
    Auth.$onAuthStateChanged(firebaseUser => {
        this.firebaseUser = firebaseUser;
        if (firebaseUser) {
            //console.log(firebaseUser);
            $state.go('dashboard');
        } else {
            //console.log('not logged in');
        }
    });
    
    //log in
    this.login = function () {
        Auth.$signInWithEmailAndPassword(this.mail, this.pass).then(function (firebaseUser) {
            //console.log('Signed as', firebaseUser);
            //$state.go('dashboard');
        }).catch(function (error) {
            console.error("Authentication failed: ", error);
            alert("Authentication failed: " + error);
        })
    };
    
    //register new
    this.register = function () {
        Auth.$createUserWithEmailAndPassword(this.mail, this.pass)
            .then(function (firebaseUser) {
                //console.log("User " + firebaseUser.uid + " created successfully!");
                //this.login();
            }).catch(function (error) {
            console.error("Error: ", error);
            alert("User not registered: " + error);
        });
    };
    
    //log out
    this.logout = function () {
        Auth.$signOut();
    };
}
