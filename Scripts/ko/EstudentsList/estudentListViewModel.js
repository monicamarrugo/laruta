//var urlApi = 'http://www.inffinitun.com/ruta/Controller';

var urlApi = 'http://mover.com.co/ruta/Controller';

var selectedItems = [];
var dataStudent;
var validSi;
var route = function(idRoute, indIn, identification, idVehicle, observation) {
    this.idRoute = idRoute;
    this.indIn = indIn;
    this.identification = identification;
    this.dVehicle = idVehicle;
    this.observation = observation;
}

function estudentListViewModel(modalConfirm) {
    var self = this;

    self.observationText = ko.observable();
    self.idruta = ko.observable(null, {persist: 'ruta'});
    //evento inicializar
    self.Init = function () {
        if (self.idruta() == null) {
            window.location.href="../Views/Login.html";
            return;
        }
        self.InitTableEstudent();
    }

    self.Register = function () {
        $.ajax({
                url: urlApi + '/RestController.php?view=updateRecorrido',
                type: "POST",
                data:JSON.stringify({ "idRoute": dataStudent.idIngreso, 
                                      "identification": dataStudent.identificacion,
                                      "idVehicle" : self.idruta(),
                                      "observation" : self.observationText(),
                                      "registerIn" : true,
                                      "nombres": dataStudent.nombres,   
                                      "valorSi": validSi,
                                    }),
                success: function () {
                    modalConfirm.modal("hide");
                    $('#tblEstudents').DataTable().ajax.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var erro = JSON.parse(jqXHR.responseText)
                    ("#msjRequerido").html(erro.ExceptionMessage);
                    (".alert-box").fadeIn(300).delay(2500).fadeOut(400);
                }
            });
    }

    self.InitTableEstudent = function () {
        $('#tblEstudents').DataTable({
            ajax: {
                url: urlApi + "/RestController.php?view=all&idRuta=" + self.idruta(),
                dataSrc: 'data'
            },
            order: [[0, "desc"]],
            columns: [
				{ "data": "valor"},
                { "data": "nombres" },
                { "data": "identificacion" },
				{ "data": "apellidos" },
				{ "data": "direccion" },
				{ "data": "telefono" },
                { "data": "observacionEntrega"},
                { "data": "idIngreso"}
            ],
            responsive: true,
            select: true,
			columnDefs: [
                {
                    "targets": 0,
                    "mRender": function (data) {
                        var buttons;
                        if(data=='1')
                        {
                            buttons = '<button id="btnSi" type="button" class="btnGrid btn-primary activesi" data-toggle="button" aria-pressed="true" autocomplete="off">'+
                                        'Si' +'</button>'+
                                        '<button id="btnNo" type="button" class="btnGrid btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">'+
                                        'No' +'</button>';
                        }
                        else if (data=='0'){
                               buttons= '<button id="btnSi" type="button" class="btnGrid btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">'+
                                        'Si' +'</button>'+
                                        '<button id="btnNo" type="button" class="btnGrid btn-primary active activeno" data-toggle="button" aria-pressed="true" autocomplete="off">'+
                                        'No' +'</button>';
                        }else{
                            buttons= '<button id="btnSi" type="button" class="btnGrid btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">'+
                                        'Si' +'</button>'+
                                        '<button id="btnNo" type="button" class="btnGrid btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">'+
                                        'No' +'</button>';
                        }
                        return buttons;
                    },
                    "width": "30%"
                }

            ],
            lengthChange: false,
            language: {
                lengthMenu: "Mostrar _MENU_ Estudiantes",
                search: "Buscar:",
                info: "Mostrando _START_ a _END_ de _TOTAL_ Estudiantes",
                infoFiltered: "(filtrado de _MAX_ Estudiantes en total)",
                infoEmpty: "",
                zeroRecords: "No se encontraron estudiantes que cumplan con el criterio de busqueda establecido",
                paginate: {
                    first: "<< Primero",
                    previous: "< Anterior",
                    next: "Siguiente >",
                    last: "Ultimo >>"
                },
                processing: "Procesando..."
            },
            iDisplayLength: 5
        }); 

        $('#tblEstudents').DataTable().columns([7]).visible(false, false);

        $('#tblEstudents tbody').on('click', '#btnSi', function (e, dt, node, config) {
            dataStudent = $('#tblEstudents').DataTable().row($(this).parents('tr')).data();
            validSi = 1;
            self.observationText(dataStudent.observacionEntrega);
            modalConfirm.modal("show");             
        });

          $('#tblEstudents tbody').on('click', '#btnNo', function (e, dt, node, config) {
            dataStudent = $('#tblEstudents').DataTable().row($(this).parents('tr')).data();
            validSi = 0;
            self.observationText(dataStudent.observacionEntrega);
            modalConfirm.modal("show");             
        });
    }
    //Punto de arranque
    self.Init();
}

