app.component('customer',{
    templateUrl: '/templates/customer.html',
    controller: customerCtrl,
    bindings: {
        customer: '<',
        data: '<'
    }
});

function customerCtrl(vbService) {
    this.delete = (id) => {
        this.data.$remove(this.data.$getRecord(id));
    };
    
    this.getOldItem =  (id) => {
        vbService.itemId = id;
        vbService.editMode = true;
        alert('Entering edit mode');
    };
}