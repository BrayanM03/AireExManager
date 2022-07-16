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
                    Total neto: $${total} <br>

                    Monto: $<span id="acumulado">0</span>
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

                       
                    
                        if(foo == 2){
                            $("#monto-1").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto2 = parseFloat($("#monto-2").val()) == "" ? monto2 = 0 : monto2 = parseFloat($("#monto-2").val());
                                console.log(monto2);
                                let mont_total = valor + monto2
                                $("#acumulado").text(mont_total);
                                mont_total == limit ? $("#acumulado").css("color", "green") : $("#acumulado").css("color", "red")
                    
                    
                            })
                            $("#monto-2").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let monto1 = parseFloat($("#monto-1").val()) == "" ? monto1 = 0 : monto2 = parseFloat($("#monto-1").val());
                                let mont_total = valor + monto1
                                $("#acumulado").text(mont_total);
                                mont_total == limit ? $("#acumulado").css("color", "green") : $("#acumulado").css("color", "red")
                    
                    
                            })
                        }else if(foo == 3){
                            $("#monto-1").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let mont_total = valor + parseFloat($("#monto-2)").val())  + parseFloat($("#monto-3").val());
                                $("#acumulado").text(mont_total);
                                mont_total == limit ? $("#acumulado").css("color", "green") : $("#acumulado").css("color", "red")
                    
                    
                            })
                            $("#monto-2").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let mont_total = valor + parseFloat($("#monto-1").val())  + parseFloat($("#monto-3").val());
                                $("#acumulado").text(mont_total);
                                mont_total == limit ? $("#acumulado").css("color", "green") : $("#acumulado").css("color", "red")
                    
                            })
                            $("#monto-3").keyup(function(){
                                let valor = parseFloat($(this).val());
                                let mont_total = valor + parseFloat($("#monto-1").val())  + parseFloat($("#monto-2").val());
                                $("#acumulado").text(mont_total);
                                mont_total == limit ? $("#acumulado").css("color", "green") : $("#acumulado").css("color", "red")
                    
                    
                            })
                        }
                       
                    
                    }
                },
                confirmButtonText: "Aceptar",
                showCancelButton: true,
                cancelButtonText: "No"
        
            }).then((resp)=>{

                //let combinado = 
                sendData(data)
            })

        }else{
            let combinado = [];
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

