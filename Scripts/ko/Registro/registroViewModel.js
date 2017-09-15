var urlApi = 'http://mover.com.co/ruta/Controller';


function registroViewModel() {
    var self = this;

    self.identification = ko.observable();
    self.formatCode = ko.observable();
    self.idruta = ko.observable(null, {persist: 'ruta'});
    self.nombreUsuario = ko.observable();

    self.readCode  = function(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("Barcode\n" +
                    "Codigo: " + result.text + "\n" +
                    "Formato: " + result.format);
                    self.identification(result.text);
                    self.formatCode(result.format);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }
    self.Register = function () {
        $.ajax({
                url: urlApi + '/RestController.php?view=updateRecorrido',
                type: "POST",
                data:JSON.stringify({ "idRoute": null, 
                                      "identification":  self.identification(),
                                      "idVehicle" : self.idruta(),
                                      "observation" : "",
                                      "registerIn" : true,
                                      "nombres": "",   
                                      "valorSi": 1,
                                    }),
                success: function () {
                    self.readCode();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var erro = JSON.parse(jqXHR.responseText)
                    ("#msjRequerido").html(erro.ExceptionMessage);
                    (".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            });
    }
}

