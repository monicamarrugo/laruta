$(document).ready(function () {  
    ko.applyBindings(new novedadesRutaViewModel($("#ModalConfirm")));

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});