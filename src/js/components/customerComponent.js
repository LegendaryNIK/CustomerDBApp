app.component('customer',{
    templateUrl: '/templates/customer.html',
    controller: customerCtrl,
    bindings: {
        customer: '<',
        data: '<'
    }
});

function customerCtrl(vbService) {
    let editMode = vbService;
    
    this.delete = (id) => {
        this.data.$remove(this.data.$getRecord(id));
    };
    
    this.getOldItem =  (id) => {
        editMode.setValue(true);
        editMode.itemId = id;
    };
}