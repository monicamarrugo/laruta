$(document).ready(function () {  
    ko.applyBindings(new infoViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});