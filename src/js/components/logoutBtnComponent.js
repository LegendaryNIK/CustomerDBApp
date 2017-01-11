app.component('logoutbtn',{
    template: '<span ng-click="$ctrl.logout()" class="btn btn-default">Logout</span>',
    controller: function (Auth, $state) {
        this.logout = function () {
            $state.go('login');
            Auth.$signOut();
        };
    }
});