function registrarOrden(type){

    //recogiendo Variables
    let id_cliente = $("#id-cliente").text();
    let direccion = $("#direccion").val();
    let total = $("#neto").val();
    let metodo_pago = $("#metodo-pago").val();
    let id_sucursal = $("#user-data").attr("id_sucursal");
    let tipo = $("#tipo").val();

    if(tipo == 2){
         pago_domicilio = $("#pago_domicilio").is(':checked')
         pago_sucursal = $("#pago_sucursal").is(':checked')
         verificar_electrico = $("#verificar_electrico").is(':checked')
         tiene_electrico = $("#tiene_electrico").is(':checked')
         cantidad_personal = $("#cantidad_personal").val();
         tiempo_horas = $("#tiempo_horas").val();
         nombre_personal = $("#nombre_personal").val();

    }else if(tipo == 3){
         pago_domicilio = $("#pago_domicilio").is(':checked')
         pago_sucursal = $("#pago_sucursal").is(':checked')
         verificar_electrico = "No aplica";
         tiene_electrico = "No aplica";
         cantidad_personal = $("#cantidad_personal").val();
         tiempo_horas = $("#tiempo_horas").val();
         nombre_personal = $("#nombre_personal").val();
    }else{
         pago_domicilio = "No aplica";
         pago_sucursal = "No aplica";
         verificar_electrico = "No aplica";
         tiene_electrico = "No aplica";
         cantidad_personal = "No aplica";
         tiempo_horas = "No aplica";
         nombre_personal = "No aplica";
    }

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

            var data = {
                "id_cliente": id_cliente,
                "total": total,
                "id_sucursal": id_sucursal,
                "id_direccion": direccion,
                "metodo_pago": metodo_pago,
                "tipo": tipo,
                "pago_domicilio" : pago_domicilio,
                "pago_sucursal" : pago_sucursal,
                "verificar_electrico" : verificar_electrico,
                "tiene_electrico" : tiene_electrico,
                "cantidad_personal" : cantidad_personal,
                "tiempo_horas" : tiempo_horas,
                "nombre_personal" : nombre_personal
            };

        if(metodo_pago == "Combinado"){

            Swal.fire({
                icon: "question",
                html: `<div class="container" id="container" id_cliente="${id_cliente}" 
                total="${total}" id_sucursal="${id_sucursal}" id_direccion="${direccion}" metodo_pago="${metodo_pago}"
                tipo="${tipo}" pago_domicilio="${pago_domicilio}" pago_sucursal="${pago_sucursal}"
                verificar_electrico="${verificar_electrico}" tiene_electrico="${tiene_electrico}" cantidad_personal="${cantidad_personal}"
                tiempo_horas="${tiempo_horas}" nombre_personal="${nombre_personal}">
                <div id="contenedor-vista">
                <div class="row mb-3">
                    <div class="col-md-12 col-12">
                    <b>Agregar mas metodos de pago</b><br>
                    Subtotal de la orden: <span id="total-neto-swal">${total}</span><br>

                    ¿Cuantos metodos de pago desea agregar a esta orden? Despues de elegir eliga la forma de pago, si es por tarjeta elija el tipo (se aumentara 3% de comision en tarjetas de credito Y 1.6% en tarjetas de debito)<br>
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
                <div class="row mt-3 justify-content-center">  
                    <div class="col-12 col-md-3" id="col-btn-procesar">
                        <div class="btn btn-primary" onclick="procesarMulti()" id="btn-procesar">Procesar</div>
                    </div>
                </div>
                </div>
                
                `,
                showCancelButton: false,
                showConfirmButton: false,
                showDenyButton: false,
                didOpen: function() {
                    

                    $("#total-metodos").on("change", function() {

                        $("#acumulado").attr("estatus", false)
                        $("#acumulado").attr("mensj", "Ups, olvidaste seleccionar el un total de metodos de pago")
                     
                        if($(this).val() == "2") {
                            $("#area-mas-metodos").empty().append(`
                            <div class="row mb-3">
                                <div class="col-md-4 col-12">
                                <span style="font-size:10px">Metodo de pago</span>
                                    <select class="form-control" id="metodo-1">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-4 col-12">
                                    Tipo tarjeta
                                    <select id="tipo-1" class="form-control"> 
                                        <option value="NA">No aplica</option>  
                                    </select>  
                                </div>
                                <div class="col-md-4 col-12">
                                    Monto
                                    <input type="number" id="monto-1" class="form-control" placeholder="monto 1">    
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-4 col-12">
                                    <select class="form-control" id="metodo-2">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>

                                <div class="col-md-4 col-12">
                                    <select id="tipo-2" class="form-control"> 
                                        <option value="NA">No aplica</option>  
                                    </select>  
                                </div>
                                
                                <div class="col-md-4 col-12">
                                    <input type="number" id="monto-2" class="form-control" placeholder="monto 2">    
                                </div>
                            </div>   
                            `);
                            distribuirMontos(2, total)
                        }else if($(this).val() == "3") {

                            $("#area-mas-metodos").empty().append(`
                            <div class="row mb-3">
                                <div class="col-md-4 col-12">
                                    <span style="font-size:10px">Metodo de pago</span>
                                    <select class="form-control" id="metodo-1">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-4 col-12">
                                    Tipo tarjeta
                                    <select id="tipo-1" class="form-control"> 
                                        <option value="NA">No aplica</option>  
                                    </select>  
                                </div>
                                <div class="col-md-4 col-12">
                                    Monto
                                    <input type="number" id="monto-1" class="form-control" placeholder="monto 1">    
                                </div>
                            </div> 
                            <div class="row mb-3">
                                <div class="col-md-4 col-12">
                                    
                                    <select class="form-control" id="metodo-2">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-4 col-12">
                                    <select id="tipo-2" class="form-control"> 
                                        <option value="NA">No aplica</option>  
                                    </select>  
                                </div>
                                <div class="col-md-4 col-12">
                                    
                                    <input type="number" id="monto-2" class="form-control" placeholder="monto 2">    
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-4 col-12">
                                   
                                    <select class="form-control" id="metodo-3">
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Sin definir">Sin definir</option>
                                    </select>   
                                </div>
                                <div class="col-md-4 col-12">
                                    <select id="tipo-3" class="form-control"> 
                                        <option value="NA">No aplica</option>  
                                    </select>  
                                </div>
                                <div class="col-md-4 col-12">
                                    
                                    <input type="number" id="monto-3" class="form-control" placeholder="monto 3">    
                                </div>
                            </div>  
                            `);

                            distribuirMontos(3, total)

                        }else if($(this).val() == ""){
                            $("#area-mas-metodos").empty();
                            
                        }


                        $("#metodo-1").change(function(){
                            if($(this).val() == "Tarjeta" ){
                                $("#tipo-1").empty().append(
                                    `<option value="credito">Credito</option>
                                    <option value="debito">Debito</option>
                                    `
                                ) 

                            } else{
                                $("#tipo-1").empty().append(
                                    `<option value="NA">No aplica</option>
                                    `)
                                   
                            }
                        })

                        $("#metodo-2").change(function(){
                            if($(this).val() == "Tarjeta" ){
                                $("#tipo-2").empty().append(
                                    `<option value="credito">Credito</option>
                                    <option value="debito">Debito</option>
                                    `
                                ) 
                                


                            } else{
                                $("#tipo-2").empty().append(
                                    `<option value="NA">No aplica</option>
                                    `)
                                    
                                   
                            }
                        })

                        $("#metodo-3").change(function(){
                            if($(this).val() == "Tarjeta" ){
                                $("#tipo-3").empty().append(
                                    `<option value="credito">Credito</option>
                                    <option value="debito">Debito</option>
                                    `
                                ) 

                            } else{
                                $("#tipo-3").empty().append(
                                    `<option value="NA">No aplica</option>
                                    `)
                                
                                
                            }
                        })

                        




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

                                //Calculando comision 
                                if($("#tipo-1").val()=="credito"){comisi1 =((valor*3)/100)}else if($("#tipo-1").val()=="debito"){comisi1 =((valor*0.6)/100)}else{comisi1 =0}; 
                                if($("#tipo-2").val()=="credito"){comisi2 =((monto2*3)/100)}else if($("#tipo-2").val()=="debito"){comisi2 =((monto2*0.6)/100)}else{comisi2 =0}; 
                                
                                monto2 = monto2 + comisi2;
                                valor = valor + comisi1;

                                let mont_total = valor + monto2;
                                
                              /*  if(mont_total == limit){
                                $("#acumulado").css("color", "green")
                                $("#acumulado").attr("estatus", true);
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
                                
                               } */
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

                                //Calculando comision 
                                if($("#tipo-2").val()=="credito"){comisi =((valor*3)/100)}else if($("#tipo-1").val()=="debito"){comisi =((valor*0.6)/100)}else{comisi =0}; 
                                if($("#tipo-2").val()=="credito"){comisi2 =((monto1*3)/100)}else if($("#tipo-2").val()=="debito"){comis2 =((monto1*0.6)/100)}else{comis2 =0}; 
                              
                                valor = valor + comisi
                                monto1 = monto1 + comisi2;
                                let mont_total = valor + monto1 

                                /* if(mont_total == limit){
                                $("#acumulado").css("color", "green")
                                $("#acumulado").attr("estatus", true);
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
                                
                               } */
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

                                //Calculando comision 
                                if($("#tipo-1").val()=="credito"){comisi =((valor*3)/100)}else if($("#tipo-1").val()=="debito"){comisi =((valor*0.6)/100)}else{comisi =0};
                                if($("#tipo-2").val()=="credito"){comisi2 =((monto2*3)/100)}else if($("#tipo-2").val()=="debito"){comisi2 =((monto2*0.6)/100)}else{comisi2 =0}; 
                                if($("#tipo-3").val()=="credito"){comisi3 =((monto3*3)/100)}else if($("#tipo-3").val()=="debito"){comisi3 =((monto3*0.6)/100)}else{comisi3 =0};  
                              
                                valor = valor + comisi
                                monto2 = monto2 + comisi2;
                                monto3 = monto3 + comisi3;
                                let mont_total = valor + monto2  + monto3;

                                /* if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                    $("#acumulado").attr("estatus", true);
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
                                  
                                    
                                   } */
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

                                if($("#tipo-1").val()=="credito"){comisi =((monto1*3)/100)}else if($("#tipo-1").val()=="debito"){comisi =((monto1*0.6)/100)}else{comisi =0};
                                if($("#tipo-2").val()=="credito"){comisi2 =((valor*3)/100)}else if($("#tipo-2").val()=="debito"){comisi2 =((valor*0.6)/100)}else{comisi2 =0}; 
                                if($("#tipo-3").val()=="credito"){comisi3 =((monto3*3)/100)}else if($("#tipo-3").val()=="debito"){comisi3 =((monto3*0.6)/100)}else{comisi3 =0};  

                                valor = valor + comisi2
                                monto1 = monto1 + comisi;
                                monto3 = monto3 + comisi3;
                                let mont_total = valor + monto1  + monto3;

                                /* if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                    $("#acumulado").attr("estatus", true);
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
                                   
                                    
                                   } */
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

                                if($("#tipo-1").val()=="credito"){comisi =((monto1*3)/100)}else if($("#tipo-1").val()=="debito"){comisi =((monto1*0.6)/100)}else{comisi =0};
                                if($("#tipo-2").val()=="credito"){comisi2 =((monto2*3)/100)}else if($("#tipo-2").val()=="debito"){comisi2 =((monto2*0.6)/100)}else{comisi2 =0}; 
                                if($("#tipo-3").val()=="credito"){comisi3 =((valor*3)/100)}else if($("#tipo-3").val()=="debito"){comisi3 =((valor*0.6)/100)}else{comisi3 =0};  

                                valor = valor + comisi3
                                monto1 = monto1 + comisi;
                                monto2 = monto2 + comisi2;

                                let mont_total = valor + monto1  + monto2;

                                /* if(mont_total == limit){
                                    $("#acumulado").css("color", "green")
                                    $("#acumulado").attr("estatus", true);
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
                                    
                                    
                                   } */
                                   $("#acumulado").empty().append(mont_total);
                    
                            })
                        }
                       
                    
                    }


                },
                preConfirm: function(){
                    let mensj = $("#acumulado").attr("mensj")
                    let stats = $("#acumulado").attr("estatus")
                    
                    if(stats == "false"){
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
                    console.log(data);

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
            comi = $("#comision").val()
            neto = $("#total").val()
            data["comision_total"] = comi;
            data["neto_total"] = neto;
            data["multi_metodo"] = []
            console.log(data);
            sendData(data)
        }

        }
    })

    
        
    } 
    
   

}

function procesarMulti(){
    console.log("Holaa");
    let total_metodos = $("#total-metodos").val();

    var data = {
        "id_cliente": $("#container").attr("id_cliente"),	
        "total": $("#container").attr("total"),
        "id_sucursal": $("#container").attr("id_sucursal"),
        "id_direccion": $("#container").attr("id_direccion"),
        "metodo_pago": $("#container").attr("metodo_pago"),
        "tipo": $("#container").attr("tipo"),
        "pago_domicilio" : $("#container").attr("pago_domicilio"),
        "pago_sucursal" : $("#container").attr("pago_sucursal"),
        "verificar_electrico" : $("#container").attr("verificar_electrico"),
        "tiene_electrico" : $("#container").attr("tiene_electrico"),
        "cantidad_personal" : $("#container").attr("cantidad_personal"),
        "tiempo_horas" : $("#container").attr("tiempo_horas"),
        "nombre_personal" : $("#container").attr("nombre_personal")
    };
                 
    if(total_metodos == 2){

                    var metodo_1 = $("#metodo-1").val();
                    var metodo_2 = $("#metodo-2").val();
                    
                    var monto_1 = $("#monto-1").val();
                    var monto_2 = $("#monto-2").val();

                    var tipo_1 = $("#tipo-1").val();
                    var tipo_2 = $("#tipo-2").val();

                    

                    if(tipo_1 == "credito") {
                        comision_1 = ((monto_1*3)/100) 
                        
                    }else if(tipo_1 == "debito"){
                        comision_1 = ((monto_1*1.6)/100)
                    }else{
                        comision_1 = 0
                    }

                    if(tipo_2 == "credito") {
                        comision_2 = ((monto_2*3)/100) 
                    }else if(tipo_2 == "debito"){
                        comision_2 = ((monto_2*1.6)/100)
                    }else{
                        comision_2 = 0
                    }

                    var comision_total =  parseFloat(comision_1) +  parseFloat(comision_2);
                    var monto_total =  parseFloat(monto_1) +  parseFloat(monto_2)
                    var neto_total =  parseFloat(monto_total) +  parseFloat(comision_total);

                    

                    data["multi_metodo"] = [
                        [metodo_1, parseFloat(monto_1) + parseFloat(comision_1)],
                        [metodo_2,parseFloat(monto_2) + parseFloat(comision_2)]
                    ]

                    
                    
                    

                 }else if(total_metodos == 3){

                    var  metodo_1 = $("#metodo-1").val();
                    var  metodo_2 = $("#metodo-2").val();
                    var  metodo_3 = $("#metodo-3").val();
                    
                    var  monto_1 = $("#monto-1").val();
                    var  monto_2 = $("#monto-2").val();
                    var  monto_3 = $("#monto-3").val();

        
                    var tipo_1 = $("#tipo-1").val();
                    var tipo_2 = $("#tipo-2").val();
                    var tipo_3 = $("#tipo-3").val();

                    if(tipo_1 == "credito") {
                        comision_1 = ((monto_1*3)/100) 
                    }else if(tipo_1 == "debito"){
                        comision_1 = ((monto_1*1.6)/100)
                    }else{
                        comision_1 = 0
                    }

                    if(tipo_2 == "credito") {
                        comision_2 = ((monto_2*3)/100) 
                    }else if(tipo_2 == "debito"){
                        comision_2 = ((monto_2*1.6)/100)
                    }else{
                        comision_2 = 0
                    }

                    if(tipo_3 == "credito") {
                        comision_3 = ((monto_3*3)/100)
                    }else if(tipo_3 == "debito"){
                        comision_3 = ((monto_3*1.6)/100)
                    }else{
                        comision_3 = 0
                    }

                    var comision_total = parseFloat(comision_1)+  parseFloat(comision_2) +  parseFloat(comision_3);
                    var monto_total =  parseFloat(monto_1) +  parseFloat(monto_2) +  parseFloat(monto_3);
                    var neto_total =  parseFloat(monto_total) +  parseFloat(comision_total);

                    
                    data["multi_metodo"] = [
                        [metodo_1, parseFloat(monto_1) + parseFloat(comision_1)],
                        [metodo_2, parseFloat(monto_2) + parseFloat(comision_2)],
                        [metodo_3, parseFloat(monto_3) + parseFloat(comision_3)]
                    ]
                 }


                 data["comision_total"] = comision_total;
                 data["neto_total"] = neto_total;	

    $("#btn-procesar").attr("disabled", true);
    $("#btn-procesar").empty().append("Procesando...");
    $("#contenedor-vista").empty().append(`
    <div class="row">
        <div class="col-md-12 col-12">
            <img src="img/load.gif" alt="" style="width:80px;">
        </div>
    </div>`)

    setTimeout(()=>{
        $("#contenedor-vista").empty().append(`
    <div class="row">
        <div class="col-md-12 col-12">
        <span>Subtotal: ${monto_total}</span><br>
            <span>Comisión: ${comision_total}</span><br>
            <h3>Neto: ${neto_total}</h3>
        </div>
    </div>`)

    $("#btn-procesar").attr("disabled", true);
    $("#btn-procesar").removeClass("btn-primary").addClass("btn-success");
    $("#btn-procesar").attr("onclick", "");
    $("#btn-procesar").empty().append("Realizar venta");

    document.getElementById("btn-procesar").onclick = function(e){
        sendData(data)
    }
    },3000)

    

    

}  

sendDataz = (data) => {
    console.log(data);
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
                    confirmButtonText: 'Descargar nota',
                    showCancelButton: false,
                    showDenyButton: true,
                    denyButtonText: 'Realizar otra venta',
                    allowOutsideClick: false
                    
                  }).then(function(resp) {
                    if(resp.isConfirmed){
                        descargarOrden(response.id_orden);
                       // window.open('../servidor/reportes/nota-de-venta.php?id_orden=' + response.id_orden, '_blank');

                        setTimeout(window.location.reload(), 500);
                    
                    }else if(resp.isDenied){
                        window.location.reload();
                    }
                  });
            }
        }
    });
}

