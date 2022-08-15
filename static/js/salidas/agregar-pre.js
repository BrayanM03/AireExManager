function agregarPreSalida(){

    let estatus = $("#btn-add").attr("valid");
    let cantidad_valida = $("#cantidad").attr("valido");
    let cantidad = $("#cantidad").val();

    if(estatus == "false"){
        toastr.error('Selecciona un producto', 'Error')
    }else if(cantidad == ""){
        toastr.error('Escribe una cantidad', 'Error')
    }else if(cantidad == 0){
        toastr.error('La cantidad no puede ser 0', 'Error')
    }else if(cantidad < 0){
        toastr.error('La cantidad no puede ser menor a 0', 'Error')
    }else if(cantidad_valida == "no"){
        toastr.error('La cantidad no puede ser mayor a la cantidad disponible', 'Error')
    } else{

        data = {
            "codigo": $("#codigo-data").text(),
            "id_producto": $("#producto_id").val(),
            "descripcion": $("#descripcion-data").text(),
            "cantidad_actual": $("#stock-data").text(),
            "cantidad": cantidad
        }


        $.ajax({
            type: "POST",
            url: "servidor/salidas/agregar-pre.php",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.status == true){
                    toastr.success(response.mensj, 'Error')

                }else{
                    toastr.error(response.mensj, 'Error')

                }
                tabla.ajax.reload(null, false);
                $("#stock-data").text(response.cantidad_restante);
            }
        });

    }

}


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut" 
  }



function restearTabla(id){
    $.ajax({
        type: "POST",
        url: "servidor/salidas/reset-presalida.php",
        data: {id:id},
        dataType: "JSON",
        success: function (response2) { 
            if(response2.status == true){
              tabla.ajax.reload(null, false);
    
               
            }
        }
    });
    
}  