//var urlApi = 'http://www.inffinitun.com/ruta/Controller';

var urlApi = 'http://mover.com.co/ruta/Controller';

var map;

function mapaViewModel() {
    var self = this;
    self.latitud = ko.observable();
    self.longitud = ko.observable();
    self.usertype = ko.observable(null, {persist: 'usertype'});
    self.idruta = ko.observable(null, {persist: 'idruta'});
    self.nombreCon = ko.observable(null, {persist: 'nombreCon'});
    self.nombreUsuario = ko.observable(null, {persist: 'nombreUsuario'});
    self.identificacionCon = ko.observable(null, {persist: 'identificacionCon'});
    
    //evento inicializar
    self.init = function(){
        var mapOptions = {
        zoom: 15,//zoom empieza el mapa
        };
  
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);//creamos un nuevo objeto de las librerias

  // Try HTML5 geolocation
        if(navigator.geolocation) //si acepta la geolocalizacion
        {
                navigator.geolocation.getCurrentPosition(function(position) 
                {
                    var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);//generamos una nueva posicion en 
                    //formato  latitude,longitude
                        
                var goldStar = {//creamos las propiedades para un nuevo marcador
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#276ED0',
                    fillColor: '#276ED0',
                    fillOpacity: .9,
                    strokeWeight: 1,
                    scale: 6,
                };
                var marker = new google.maps.Marker({//creamos un nuevo marcador con las propiedades de goldstar
                        position: pos,//lo posicionamos con alguna ubicacion
                        icon: goldStar,//con las propiedades previemente creadas
                        draggable: true,//le dmos la propiedad de arrastrar el marcador
                        animation: google.maps.Animation.DROP,//propiedad de animacion
                        map: map,
                });
            
                map.setCenter(pos);//pocisionamos el marcador en el centro
                

                }, function() //excepciones
                {
                    handleNoGeolocation(true);
                });
        } 
        else 
        {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }

        setTimeout(self.coordinates, 10000);
        
    }

    self.coordinates = function () {
        if (self.idruta() == null) {
            window.location.href="../Views/Login.html";
            return;
        }
       $.ajax({
            url: urlApi + '/RestController.php?view=coordinate&idRuta='+ self.idruta(),
            type: "GET",
            success: function (data) {
                if (data != null) {
                    var datos = data.data;
                    self.latitud(datos[0].latitud);
                    self.longitud(datos[0].longitud);
                    self.graphic();
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

    self.graphic =  function(){
        navigator.geolocation.getCurrentPosition(function(position) 
	    {
		
		var pos = new google.maps.LatLng(self.latitud(),self.longitud());			
        map.panTo(pos);
        
            var goldStar = {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: '#FF4E51',
                fillColor: '#FF4E51',
                fillOpacity: .9,
                strokeWeight: 1,
                scale: 5,
            };
            var marker = new google.maps.Marker({
                position: pos,
                icon: goldStar,
                draggable: true,
                map: map
            });		
		
	        var options = {//opciones de la nueva pocision
                map: map,
                position: pos,
		    };

            send(position.coords.latitude+","+position.coords.longitude);	//enviamos al socket la nueva pocision	  
            map.setCenter(options.position);//poicionamos el mapa al centro de la nueva locacion
  
  });
    }

    self.init();

   
}

