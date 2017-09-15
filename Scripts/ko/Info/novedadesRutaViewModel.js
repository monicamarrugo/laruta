var urlApi = 'http://localhost/ruta/Controller';

//var urlApi = 'http://69.175.103.163/~mariocorpas/ruta/Controller';

var selectedItems = [];
var dataStudent;
var valid;


function novedadesRutaViewModel(modalConfirm) {
    var self = this;

    self.anews = ko.observableArray([]);
    self.idruta = ko.observable(null, { persist: 'idruta' });
    self.contentNews = ko.observable();
    //evento inicializar

    self.init = function () {
        self.showNoReads();
    }
    self.readNews = function (news) {
        self.contentNews(news.mensaje);
        modalConfirm.modal("show");
        if (news.indLeido == 0) {
            $.ajax({
                url: urlApi + '/RestController.php?view=markRead',
                type: "POST",
                data: JSON.stringify({
                    "idNovedad": news.id
                }),
                success: function () {
                    self.showNoReads();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var erro = JSON.parse(jqXHR.responseText)
                        ("#msjRequerido").html(erro.ExceptionMessage);
                    (".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            });
        }
    }
    self.showNoReads = function () {
        $.ajax({
            url: urlApi + '/RestController.php?view=getNewsRead&idRuta=' + self.idruta() + '&indLeido=0',
            type: "GET",
            success: function (data) {
                if (data != null) {
                    datos = data.data;
                    self.anews(datos);
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
    self.showReads = function () {
        $.ajax({
            url: urlApi + '/RestController.php?view=getNewsRead&idRuta=' + self.idruta() + '&indLeido=1',
            type: "GET",
            success: function (data) {
                if (data != null) {
                    datos = data.data;
                    if (datos.length == 0) {
                        self.anews([{ asunto: "No existen datos para mostrar", mensaje: "No existen datos para mostrar" }])
                    } else {
                        self.anews(datos);
                    }
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

