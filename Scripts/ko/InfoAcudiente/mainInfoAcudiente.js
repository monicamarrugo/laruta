$(document).ready(function () {  
    ko.applyBindings(new infoAcudienteViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});