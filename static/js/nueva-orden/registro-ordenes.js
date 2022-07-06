function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    console.log(id_cliente);
    console.log(direccion);

    let data = {
        "id_cliente": id_cliente,
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
            
        }
    });
}