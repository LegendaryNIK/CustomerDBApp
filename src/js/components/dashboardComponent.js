app.component('dashboard', {
    templateUrl: '/templates/dashboard.html',
    controller: dashboardCtrl
});

function dashboardCtrl($firebaseArray, vbService) {
    this.editMode = vbService;
    var ref = firebase.database().ref().child('customers');
    this.data  = $firebaseArray(ref);
}