app.component('dashboardform',{
    templateUrl: '/templates/dashboard-comp.html',
    controller: dashboardFormCtrl,
    bindings:   {
        data: '<',
        editMode: '<'
    }
});

function dashboardFormCtrl(vbService) {
    
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
        this.name = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.city = undefined;
        this.url = null;
        document.getElementById('nameImg').files[0] = null;
    };
    
    this.uploadFile = () => {
        this.selectedFile = document.getElementById('nameImg').files[0];
        if (this.selectedFile) {
            this.test = true;
            var filename = this.selectedFile.name + Math.random();
            var storageRef = firebase.storage().ref('/customers/' + filename);
            var uploadTask = storageRef.put(this.selectedFile)
                .then(() => this.url = storageRef.getDownloadURL().then((alert('Image loaded'))));
        } else alert('Please choose a photo');
    }
}