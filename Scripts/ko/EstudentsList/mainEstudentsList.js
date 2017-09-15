$(document).ready(function () {  
    ko.applyBindings(new estudentListViewModel($("#ModalConfirm")));

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});