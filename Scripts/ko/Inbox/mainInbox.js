$(document).ready(function () {  
    ko.applyBindings(new inboxViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});