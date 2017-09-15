//var urlApi = 'http://www.inffinitun.com/ruta/Controller';

var urlApi = 'http://mover.com.co/ruta/Controller';

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

function inboxViewModel() {
    var self = this;
    self.messageContent = ko.observable();
    self.messageDate = ko.observable();
    self.idUsuario = ko.observable(null, {persist: 'idUsuario'});
    //evento inicializar
    self.Init = function () {
        self.InitTableMessages();
    }

   
     self.GetMessages = function () {

          $.ajax({
            url: urlApi + '/RestController.php?view=getmessages&idUsuario=1',
            type: "GET",
            success: function (data) {
                if (data != null) {
                    var datos = data.data;
                    var print = '';
                    $.each(datos, function (idx,val) {
                                    print = print + '<a href="#"><div><strong>Conductor Ruta</strong> <span class="pull-right text-muted"><em>' 
                                    + val.fechaMensaje + "</em></span></div><div>" + val.mensaje +'</div></a><li class="divider"></li>';
                                });

                    self.messageContent(print);
                }
                else {
                    alert("La consulta no produjo resultados");
                }
            },
            error: function () {
                $('#errorMessage').html("Error al cargar los items del producto");
                $("#errorMessage").fadeIn(300).delay(2500).fadeOut(400);
            }
        });
     }

      function formatDetail(d) {
        
        var table = '<div><strong>Conductor Ruta</strong><span class="pull-right text-muted">';
        var table2 = '</tbody></table></div>'
        var format = table.concat(d, table2);
        return format;
    }

     self.InitTableMessages = function () {
        $('#tblMessages').DataTable({
            ajax: {
                url: urlApi + "/RestController.php?view=getmessages&idUsuario=" + self.idUsuario(),
                dataSrc: 'data'
            },
            order: [[1, "desc"]],
            columns: [
				{ "data": "mensaje"},
                { "data": "fechaMensaje" }
            ],
            responsive: true,
            select: true,
			columnDefs: [
                {
                    "targets": 0,
                    "mRender": function (data) {
                
                        var print = '<a href="#"><div><strong>Conductor Ruta</strong> <span class="pull-right text-muted"><em>' 
                                    + "" + "</em></span></div><div>" + data +'</div></a>';
                        return print;
                    }
                }

            ],
            lengthChange: false,
            language: {
                lengthMenu: "Mostrar _MENU_ Mensajes",
                search: "Buscar:",
                info: "Mostrando _START_ a _END_ de _TOTAL_ Mensajes",
                infoFiltered: "(filtrado de _MAX_ Estudiantes en total)",
                infoEmpty: "",
                zeroRecords: "No se encontraron Mensajes que cumplan con el criterio de busqueda establecido",
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
    }

    //Punto de arranque
    self.Init();
}

