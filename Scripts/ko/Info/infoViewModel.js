var urlApi = 'http://mover.com.co/ruta/Controller';

//var urlApi = 'http://69.175.103.163/~mariocorpas/ruta/Controller';

var selectedItems = [];
var dataStudent;
var valid;


function infoViewModel() {
    var self = this;

    self.infoRuta = ko.observable();
    self.idruta = ko.observable(null, {persist: 'idruta'});
    self.nombreCon = ko.observable(null, {persist: 'nombreCon'});
    self.identificacionCon = ko.observable(null, {persist: 'identificacionCon'});
    
    //evento inicializar

    self.init = function () {
        self.infoRuta(self.nombreCon() + '<br/>' + 'CONDUCTOR RUTA No.'+ self.idruta()+'<br/>'+ 'CC. '+ self.identificacionCon());
        self.showNoReads();
    }
    self.logout = function(){
        self.idruta(null);
        window.location.href="../Views/Login.html";
    }

    self.showNoReads = function () {
        $.ajax({
            url: urlApi + '/RestController.php?view=getNewsRead&idRuta=' + self.idruta() + '&indLeido=0',
            type: "GET",
            success: function (data) {
                if (data != null) {
                    datos = data.data;
                     $(".badge").text(datos.length);
                }
                else {
                    alert("Error al cargar novedades");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var erro = JSON.parse(jqXHR.responseText)
                    ("#msjRequerido").html(erro.ExceptionMessage);
                (".alert-box").fadeIn(300).delay(2500).fadeOut(400);
            }
        });

    }

   self.init();
}

