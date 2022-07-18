function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    let total = $("#neto").val();
    let metodo_pago = $("#metodo-pago").val();
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
        html: "<b>¿Realizar venta?</b>",
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
                "metodo_pago": metodo_pago,
                "tipo": tipo
            };

        if(metodo_pago == "Combinado"){

            Swal.fire({
                icon: "question",
                html: `<div class="container">
                <div class="row mb-3">
                    <div class="col-md-12 col-12">
                    <b>Agregar mas metodos de pago</b><br>
                    Total neto: ${total} <br>

                    Monto: <span id="acumulado">0</span>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-12 col-12">
                    <b>¿Cuantos metodos de pago?</b>
                        <select class="form-control" id="total-metodos">
                            <option value="">Selecciona el numero de metodo</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div> 
                <div class="row" id="area-mas-metodos">  
                    
                </div>
                </div>
                
                `,
                didOpen: function() {

                    $("#total-metodos").on("change", function() {

                     
                        if($(this).val() == "2") {
                            $("#area-mas-metodos").empty().append(`
                            <div class="row mb-3">
                                <div class="col-md-6 col-12">
                                    Metodo de pago
                                    <select class="form-control" id="metodo-1">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-6 col-12">
                                    Monto
                                    <input type="number" id="monto-1" class="form-control" placeholder="monto 1">    
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <select class="form-control" id="metodo-2">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-6 col-12">
                                    <input type="number" id="monto-2" class="form-control" placeholder="monto 2">    
                                </div>
                            </div>   
                            `);
                            distribuirMontos(2, total)
                        }else if($(this).val() == "3") {

                            $("#area-mas-metodos").empty().append(`
                            <div class="row mb-3">
                                <div class="col-md-6 col-12">
                                    Metodo de pago
                                    <select class="form-control" id="metodo-1">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-6 col-12">
                                    Monto
                                    <input type="number" id="monto-1" class="form-control" placeholder="monto 1">    
                                </div>
                            </div> 
                            <div class="row mb-3">
                                <div class="col-md-6 col-12">
                                    
                                    <select class="form-control" id="metodo-2">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-6 col-12">
                                    
                                    <input type="number" id="monto-2" class="form-control" placeholder="monto 2">    
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-6 col-12">
                                   
                                    <select class="form-control" id="metodo-3">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-6 col-12">
                                    
                                    <input type="number" id="monto-3" class="form-control" placeholder="monto 3">    
                                </div>
                            </div>  
                            `);

                            distribuirMontos(3, total)

                        }else if($(this).val() == ""){
                            $("#area-mas-metodos").empty();
                            
                        }


                    })

                    function distribuirMontos(foo, limit){

                       
                    
                        limit == parseFloat(limit);
                        if(foo == 2){
                            $("#monto-1").keyup(function(){

                                let valor = parseFloat($(this).val());
                                let monto2 = parseFloat($("#monto-2").val());
                                
                                if(Number.isNaN(monto2)){
                                    monto2 =0
                                }
                                if(Number.isNaN(valor)){
                                    valor = 0
                                }
                              
                                let mont_total = valor + monto2
                                
                               if(mont_total == limit){
                                $("#acumulado").css("color", "green")
                               } else{

                                if(mont_total > limit){
                                    mont_total = `Arrebasaste el total neto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "Monto supera al neto total");
                                }else if(mont_total < 0){
                                    mont_total = `Esto es un monto negativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "Monto es negativo");
                                }else{
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "La suma de los montos no es igual al monto neto");
                                }
                                $("#acumulado").css("color", "tomato")
                                
                               }
                               $("#acumulado").empty().append(mont_total);
                    
                    
                            })



                            $("#monto-2").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto1 = parseFloat($("#monto-1").val());
                                if(Number.isNaN(monto1)){
                                    monto1 =0
                                }
                                if(Number.isNaN(valor)){
                                    valor = 0
                                }
                                let mont_total = valor + monto1

                                if(mont_total == limit){
                                $("#acumulado").css("color", "green")
                               } else{

                                if(mont_total > limit){
                                    mont_total = `Arrebasaste el total neto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "Monto supera al neto total");
                                }else if(mont_total < 0){
                                    mont_total = `Esto es un monto negativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "Monto es negativo");
                                }else{
                                    $("#acumulado").attr("estatus", false);
                                    $("#acumulado").attr("mensj", "La suma de los montos no es igual al monto neto");
                                }
                                
                                $("#acumulado").css("color", "tomato")
                                
                               }
                               $("#acumulado").empty().append(mont_total);
                    
                            })

                        }else if(foo == 3){
                            $("#monto-1").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto2 = parseFloat($("#monto-2").val());
                                let monto3 = parseFloat($("#monto-3").val());
                                if(Number.isNaN(monto2)){
                                    monto2 =0
                                }
                                if(Number.isNaN(monto3)){
                                    monto3 =0
                                }
                                if(Number.isNaN(valor)){
                                    valor = 0
                                }

                                let mont_total = valor + monto2  + monto3;

                                if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                   } else{
    
                                    if(mont_total > limit){
                                        mont_total = `Arrebasaste el total neto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto supera al neto total");
                                    }else if(mont_total < 0){
                                        mont_total = `Esto es un monto negativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto es negativo");
                                    }else{
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "La suma de los montos no es igual al monto neto");
                                    }
                                    $("#acumulado").css("color", "tomato")
                                  
                                    
                                   }
                                   $("#acumulado").empty().append(mont_total);
                    
                            })
                            $("#monto-2").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto1 = parseFloat($("#monto-1").val());
                                let monto3 = parseFloat($("#monto-3").val());
                                if(Number.isNaN(monto1)){
                                    monto1 =0
                                }
                                if(Number.isNaN(monto3)){
                                    monto3 =0
                                }
                                if(Number.isNaN(valor)){
                                    valor = 0
                                }

                                let mont_total = valor + monto1  + monto3;

                                if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                   } else{
    
                                    if(mont_total > limit){
                                        mont_total = `Arrebasaste el total neto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto supera al neto total");
                                    }else if(mont_total < 0){
                                        mont_total = `Esto es un monto negativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto es negativo");
                                    }else{
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "La suma de los montos no es igual al monto neto");
                                    }
                                    $("#acumulado").css("color", "tomato")
                                   
                                    
                                   }
                                   $("#acumulado").empty().append(mont_total);
                              
                            })
                            $("#monto-3").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto1 = parseFloat($("#monto-1").val());
                                let monto2 = parseFloat($("#monto-2").val());
                                if(Number.isNaN(monto2)){
                                    monto2 =0
                                }
                                if(Number.isNaN(monto1)){
                                    monto1 =0
                                }
                                if(Number.isNaN(valor)){
                                    valor = 0
                                }

                                let mont_total = valor + monto1  + monto2;

                                if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                   } else{
    
                                    if(mont_total > limit){
                                        mont_total = `Arrebasaste el total neto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto supera al neto total");
                                    }else if(mont_total < 0){
                                        mont_total = `Esto es un monto negativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "Monto es negativo");
                                    }else{
                                        $("#acumulado").attr("estatus", false);
                                        $("#acumulado").attr("mensj", "La suma de los montos no es igual al monto neto");
                                    }
                                    $("#acumulado").css("color", "tomato")
                                    
                                    
                                   }
                                   $("#acumulado").empty().append(mont_total);
                    
                            })
                        }
                       
                    
                    }
                },
                confirmButtonText: "Aceptar",
                showCancelButton: true,
                cancelButtonText: "No",
                preConfirm: ()=>{
                    let mensj = $("#acumulado").attr("mensj")
                    let stats = $("#acumulado").attr("estatus")
                    if(stats == false){
                        Swal.showValidationMessage(
                            `Error: ${mensj}`
                          )
                    }
                }
        
            }).then((resp)=>{

                if(resp.isConfirmed){

                 let total_metodos = $("#total-metodos").val();
                 if(total_metodos == 2){

                    let metodo_1 = $("#metodo-1").val();
                    let metodo_2 = $("#metodo-2").val();
                    
                    let monto_1 = $("#monto-1").val();
                    let monto_2 = $("#monto-2").val();

                    data["multi_metodo"] = [
                        [metodo_1, monto_1],
                        [metodo_2, monto_2]
                    ]

                 }else if(total_metodos == 3){

                    let  metodo_1 = $("#metodo-1").val();
                    let  metodo_2 = $("#metodo-2").val();
                    let  metodo_3 = $("#metodo-3").val();
                    
                    let  monto_1 = $("#monto-1").val();
                    let  monto_2 = $("#monto-1").val();
                    let  monto_3 = $("#metodo-3").val();

                    data["multi_metodo"] = [
                        [metodo_1, monto_1],
                        [metodo_2, monto_2],
                        [metodo_3, monto_3]
                    ]
                 }


                sendData(data)
                }
                
            })

        }else{
            data["multi_metodo"] = []
            sendData(data)
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
                        window.open('../servidor/reportes/nota-de-venta.php?id_orden=' + response.id_orden, '_blank');

                        setTimeout(window.location.reload(), 500);
                    
                    }else if(resp.isDenied){
                        window.location.reload();
                    }
                  });
            }
        }
    });
}

