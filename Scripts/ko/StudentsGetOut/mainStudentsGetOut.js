$(document).ready(function () {  
    ko.applyBindings(new StudentGetOutViewModel($("#ModalConfirm")));

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});