var urlApi = 'http://mover.com.co/ruta/Controller';

//var urlApi = 'http://69.175.103.163/~mariocorpas/ruta/Controller';

var selectedItems = [];
var dataStudent;
var valid;
var route = function(idRoute, indIn, identification, idVehicle, observation) {
    this.idRoute = idRoute;
    this.indIn = indIn;
    this.identification = identification;
    this.dVehicle = idVehicle;
    this.observation = observation;
}

function loginViewModel() {
    var self = this;

    self.nombreUsuario = ko.observable();
    self.password = ko.observable();
    self.selectedPerfil = ko.observable();
    self.usertype = ko.observable(null, {persist: 'usertype'});
    self.idruta = ko.observable(null, {persist: 'ruta'});
    self.nombreCon = ko.observable(null, {persist: 'nombreCon'});
    self.nombreUsuario = ko.observable(null, {persist: 'nombreUsuario'});
    self.idUsuario = ko.observable(null, {persist: 'idUsuario'});
    self.identificacionCon = ko.observable(null, {persist: 'identificacionCon'});
    //evento inicializar

    self.login = function () {
        if (self.selectedPerfil() == 0) {
            $("#msjRequerido").html("Debe seleccionar un perfil!");
            $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
            return;
        }
       $.ajax({
            url: urlApi + '/RestController.php?view=login&nombre='+self.nombreUsuario()+ '&password=' + self.password()+
                            '&perfilId='+self.selectedPerfil(),
            type: "GET",
            success: function (data) {
                if (data != null) {
                     var datos = data.data;
                    self.usertype(datos[0].idTipoUsuario);
                    if(self.usertype() == "2"){
                        self.idruta(datos[0].idRuta);
                        self.findriver();
                        self.idUsuario(datos[0].id);
                        window.localStorage.setItem("ruta",datos[0].idRuta);
                        window.location.href="../Views/Inbox.html";
                    }else if(self.usertype() == "3"){                      
                         self.idruta(datos[0].idRuta);
                         self.nombreCon(datos[0].nombres+ ' ' + datos[0].apellidos);
                         self.identificacionCon(datos[0].identificacion);
                         self.idUsuario(datos[0].id);
                         window.localStorage.setItem("ruta",datos[0].idRuta);
                          window.location.href="../Views/StudentsList.html";
                    }
                }
                else {
                  $("#msjRequerido").html("Usuario o Contraseña Inválidos!");
                  $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#msjRequerido").html("Usuario o Contraseña Inválidos!");
                $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
    }

    self.loginPage = function () {
        
       $.ajax({
            url: urlApi + '/RestController.php?view=login&nombre='+self.nombreUsuario()+ '&password=' + self.password()+
                            '&perfilId=4',
            type: "GET",
            success: function (data) {
                if (data != null) {
                     var datos = data.data;
                    self.usertype(datos[0].idTipoUsuario);
                   
                        
                        self.idUsuario(datos[0].id);
                        window.location.href="../Views/Novedades.html";
                }
                else {
                  $("#msjRequerido").html("Usuario o Contraseña Inválidos!");
                  $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#msjRequerido").html("Usuario o Contraseña Inválidos!");
                $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
    }

    self.findriver= function(){
                 $.ajax({
            url: urlApi + '/RestController.php?view=driver&idRuta='+ self.idruta(),
            type: "GET",
            success: function (data) {
                if (data != null) {
                    var datos = data.data;
                    self.nombreCon(datos[0].nombres+ ' ' + datos[0].apellidos);
                    self.identificacionCon(datos[0].identificacion);
                }
                else {
                  $("#msjRequerido").html("Coordenadas Inválidas!");
                  $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#msjRequerido").html("Coordenadas Inválidas!");
                $(".alert-box").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
    }

   
}

