app.service('vbService',function () {
    var editMode = false;
    return {
        setValue: function(newValue){
            editMode = newValue;
        },
        getValue: function(){
            return editMode;
        }
    }
});