$(document).ready(function () {  
    ko.applyBindings(new loginViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});