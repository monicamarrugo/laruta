$(document).ready(function () {
    app.initialize();
    

    ko.applyBindings(new registroViewModel());

    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});