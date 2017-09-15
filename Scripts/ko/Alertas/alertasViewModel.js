//var urlApi = 'http://www.inffinitun.com/ruta/Controller';
var urlApi = 'http://mover.com.co/ruta/Controller';


function alertasViewModel(modalConfirm) {
    var self = this;
    self.description = ko.observable();
    self.typeReport =  ko.observable();
    self.currentDate = ko.observable(new Date());
    self.idruta = ko.observable(null, {persist: 'idruta'});

    self.init= function(){
        if (self.idruta() == null) {
            window.location.href="../Views/Login.html";
            return;
        }
    }
    self.clickCrash =  function(){
        modalConfirm.modal("show");
        self.typeReport(1);
    }
    self.clickFailure =  function(){
        modalConfirm.modal("show");
        self.typeReport(2);
    }

    self.clickTraffic =  function(){
        modalConfirm.modal("show");
        self.typeReport(3);
    }
    self.report = function () {
        
        $.ajax({
            url: urlApi + "/RestController.php?view=notification",
            type: "POST",
            data: JSON.stringify({ "descripcion": self.description(), "estado":1, "dt_fechaNotificacion": moment(self.currentDate()).format('YYYY-MM-DD HH:mm:ss'), "idTipoNotificacion": self.typeReport(), "idRuta": self.idruta() }),
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    $('div.success').html("Notificación creada exitosamente!");
                    $("div.success").fadeIn(300).delay(2500).fadeOut(200);
                    modalConfirm.modal("hide");
                }
                else {
                    $('#errorMessage').html("Error al crear notificación.");
                    $("#errorMessage").fadeIn(300).delay(2500).fadeOut(200);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var erro = JSON.parse(jqXHR.responseText)
                $('#errorMessage').html(erro.ExceptionMessage + erro.Message);
                $("#errorMessage").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
    }
    self.init();
    
}