function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    let total = $("#neto").val();

    if(id_cliente == ""){

        Toast.fire({
            icon: 'error',
            title: "Selecciona un cliente"
          });

    }else{

        let data = {
            "id_cliente": id_cliente,
            "total": total,
            "id_direccion": direccion,
            "tipo": 1
        };
    
      
    Swal.fire({
        icon: "question",
        html: "<b>¿Realizar venta?</b>",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No"

    }).then(function (response){
        if (response.isConfirmed){

            switch(type){
                case 1 :
                    sendData(data)
                break;
            }
        }
    })
        
    }  

}

function sendData(data){


    $.ajax({
        type: "POST",
        url: "../servidor/nueva-orden/procesar-orden.php",
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
                    confirmButtonText: 'Imprimir nota',
                    showCancelButton: false,
                    showDenyButton: true,
                    denyButtonText: 'Realizar otra venta',
                    allowOutsideClick: false
                    
                  }).then(function(resp) {
                    if(resp.isConfirmed){
                        window.open('../servidor/reportes/nota-de-venta.php?id=' + response.id_orden, '_blank');

                        setTimeout(window.location.reload(), 500);
                    
                    }else if(resp.isDenied){
                        window.location.reload();
                    }
                  });
            }
        }
    });
}