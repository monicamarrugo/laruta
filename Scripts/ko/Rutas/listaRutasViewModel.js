//var urlApi = 'http://69.175.103.163/~mariocorpas/ruta/Controller';
var urlApi = 'http://mover.com.co/ruta/Controller';
//var urlApi = 'http://69.175.103.163/~mariocorpas/ruta/Controller';

function listaRutasViewModel() {
    var self = this;
    self.idUsuario = ko.observable(null, { persist: 'idUsuario' });
    self.listaRutas = ko.observable();

    //evento inicializar
    self.Init = function () {
        if (self.idUsuario() == null) {
            window.location.href="../Views/LoginPage.html";
            return;
        }
        self.GetRutas();
    }
    self.GetRutas = function () {
         $.ajax({
            url: urlApi + '/RestController.php?view=allVechicles',
            type: "GET",
            success: function (data) {
                if (data != null) {
                    var datos = data.data;
                    var print = '<div class="row">';
                    $.each(datos, function (idx,val) {
                       var remainder = idx % 4;
                       if(remainder == 0 && idx != 0){
                           print = print + '</div><div class="row">';
                       }
                                    print = print 
                                    + 
                                    ' <div class="col-sm-3">'+
                                        '<div class="thumbnail">'+
                                        '<img src="../Content/Custom/img/avatarDefault.png" alt=""/>'+
                                        '<div class="caption">'+
                                            '<a href="Recorrido.html?idRoute=1"><h3>'+ val.nombre +'</h3></a>'+
                                            '<p>Vehiculo de placas <b>'+ val.placaRuta +'</b></p>'+
                                            '<p>'+
                                            ' <button onclick="hola('+val.id+')" class="btn btn-sm btn-primary btnUbicacion">Ver Ubicación</button>'+
                                            '</p>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>';  

                    if((remainder == 0 && idx != 0)|| (datos.lenght == idx + 1)){
                           print = print + '</div>';
                       }    
                                });
                    

                    self.listaRutas(print);
                }
                else {
                    alert("La consulta no produjo resultados");
                }
            },
            error: function () {
                $('#errorMessage').html("Error al cargar las rutas");
                $("#errorMessage").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
    }

   
    
    //Punto de arranque
    self.Init();
}

function hola(idruta){
    window.localStorage.setItem("ruta",idruta);
    var win = window.open('../Views/MapaAcudiente.html', '_blank');
if (win) {
    //Browser has allowed it to be opened
    win.focus();
} else {
    //Browser has blocked it
    alert('Please allow popups for this website');
}
        
}

