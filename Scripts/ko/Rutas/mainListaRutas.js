$(document).ready(function () {  
    ko.applyBindings(new listaRutasViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});