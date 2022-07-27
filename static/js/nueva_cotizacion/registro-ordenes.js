function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    let total = $("#neto").val();
    let id_sucursal = $("#user-data").attr("id_sucursal");
    let tipo = $("#tipo").val();



    if(id_cliente == ""){

        Toast.fire({
            icon: 'error',
            title: "Selecciona un cliente"
          });

    }else{

    
      
    Swal.fire({
        icon: "question",
        html: "<b>¿Realizar cotización?</b>",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No"

    }).then(function (response){

        if (response.isConfirmed){

            let data = {
                "id_cliente": id_cliente,
                "total": total,
                "id_sucursal": id_sucursal,
                "id_direccion": direccion,
                "tipo": tipo,
            };

      
            sendData(data)
        

        }
    })
        
    }  

}

function sendData(data){


    $.ajax({
        type: "POST",
        url: "../servidor/nueva_cotizacion/procesar-orden.php",
        data: data,
        dataType: "JSON",
        success: function (response) {

            if(response.status ==false){
                Toast.fire({
                    icon: 'error',
                    title: response.mensj
                  });
            }else{

                Swal.fire({
                    icon: 'success',
                    title: '<b>' + response.mensj + '</b>',
                    confirmButtonText: 'Descargar nota',
                    showCancelButton: false,
                    showDenyButton: true,
                    denyButtonText: 'Realizar otra cotizacion',
                    allowOutsideClick: false
                    
                  }).then(function(resp) {
                    if(resp.isConfirmed){
                        window.open('../servidor/reportes/nota-de-cotizacion.php?id_orden=' + response.id_orden, '_blank');

                        setTimeout(window.location.reload(), 500);
                    
                    }else if(resp.isDenied){
                        window.location.reload();
                    }
                  });
            }
        }
    });
}

