$(document).ready(function () {  
    ko.applyBindings(new mapaViewModel());
    
    var bootstrapButton = $.fn.button.noConflict()
    $.fn.bootstrapBtn = bootstrapButton
});

document.addEventListener("focus",function()
{
setTimeout(coordinates, 10000);
   // animar();
},false);