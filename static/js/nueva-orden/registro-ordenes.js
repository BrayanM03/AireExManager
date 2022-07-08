function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    let total = $("#neto").val();

    let data = {
        "id_cliente": id_cliente,
        "total": total,
        "id_direccion": direccion,
        "tipo": 1
    };


    switch(type){
        case 1 :
            sendData(data)
        break;
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
                Toast.fire({
                    icon: 'success',
                    title: response.mensj
                  });
            }
        }
    });
}