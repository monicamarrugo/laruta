//var urlApi = 'http://www.inffinitun.com/ruta/Controller';

var urlApi = 'http://mover.com.co/ruta/Controller';

var selectedItems = [];
var dataStudent;
var valid;


function infoAcudienteViewModel() {
    var self = this;

    self.infoRuta = ko.observable();
    self.idruta = ko.observable(null, {persist: 'idruta'});
    self.nombreCon = ko.observable(null, {persist: 'nombreCon'});
    self.identificacionCon = ko.observable(null, {persist: 'identificacionCon'});
    //evento inicializar

    self.init = function () {
        if (self.idruta() == null) {
            window.location.href="../Views/Login.html";
            return;
        }
        self.infoRuta(self.nombreCon() + '<br/>' + 'CONDUCTOR RUTA No.'+ self.idruta()+'<br/>'+ 'CC. '+ self.identificacionCon());
    }
    self.logout = function(){
        self.idruta(null);
        window.location.href="../Views/Login.html";
    }

   self.init();
}

