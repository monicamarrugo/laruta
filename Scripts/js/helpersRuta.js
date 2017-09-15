var urlApiHomologous = '/api/DataHomologous';
var urlApiEstudents = 'http://www.inffinitun.com/ruta/Controller';

function sendAlert(opc){
	//alert(opc);
	
	$.ajax({type: "POST",
	    url: urlApiEstudents + "/RestController.php?view=1", 
	//	url: "http://www.inffinitun.com/futbolmobile/guardarcoordenadas.php",
		data: ({alerta: opc}),
		cache: false,
		dataType: "text",
		success: Enviamos
	});
	
	/*
	$.post(
                url: urlApiEstudents + "/RestController.php?view=all",
				,{datos}
                , function (data) {
					

                    if (data != null) {
                       
                    }
                    else {
                        alert("Error al cargar formula");
                    }
                }
                , 'json'
            ).fail(function () {
                $('#errorMessage').html("Error al cargar la formula por producto");
                $("#errorMessage").fadeIn(300).delay(2500).fadeOut(400);
                self.isLoading(false);
            });*/
}