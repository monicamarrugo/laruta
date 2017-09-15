$(document).ready(function () {  
    ko.applyBindings(new alertasViewModel($("#ModalConfirm")));

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});