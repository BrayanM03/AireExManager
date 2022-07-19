function verOpciones(id, estatus, tipo){



    Swal.fire({
        icon: 'info',
        title: 'Actualizar orden',
        width: '600px',
        html: `<div class="container">
        
            <div class="row">
                <div class="col-md-12 col-12">
                    <label for="estatus">Estatus de la orden</label>
                    <select class="form-control m-2" id="estatus" name="estatus">
                        <option value="Cerrada">Cerrada</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>
            </div>

            <div class="row mt-2" style="font-size: 12px" id="area_servicios_pendientes">
            </div>

            <div class="row mt-2" style="font-size: 12px" id="area_precios">
            </div>
        </div>
        
        </div>`,
        confirmButtonText: "Actualizar",
        didOpen: function(){

            $("#estatus").val(estatus)

            $("#estatus").on("change", function(){
               if($(this).val() == "Cerrada"){

                if(tipo == "2" || tipo == "3"){

                    $.ajax({
                        type: "POST",
                        url: "../servidor/historial/traer-detalle-orden.php",
                        data: {id:id},
                        dataType: "JSON",
                        success: function (response) {
                            $("#area_servicios_pendientes").empty().append(`
                            <div class="col-md-12 col-12">
                            Selecciona un servicio para actualizar su precio pendiente, despues click en actualizar
                            </div><br>
                            <div class="col-md-12 col-12">
                                    <div class="list-group">
                                    <div class="list-group-item list-group-item-action active" aria-current="true">
                                        <div class="row">
                                            <div class="col-md-2 col-12">
                                                ID
                                            </div>
                                            <div class="col-md-4 col-12">
                                                Descripción
                                            </div>
                                            <div class="col-md-2 col-12">
                                            Cant.
                                           </div>
                                            <div class="col-md-2 col-12">
                                                Precio unit.
                                            </div>
                                            <div class="col-md-2 col-12">
                                                Importe
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div id="area-detalle-servicio">
                                   
                                    </div>
                                    </div>
                            `)
                            response["data"].forEach(element => {
                                $("#area-detalle-servicio").empty().append(`
                                <a href="#" class="list-group-item list-group-item-action" 
                                code="${element.id}"
                                id="detalle_${element.id}"
                                desc="${element.descripcion}"
                                cant="${element.cantidad}"
                                p_unit="${element.precio_unitario}"
                                import="${element.importe}"
                                onclick="setPrecios( ${element.id})">
                                <div class="row">
                                <div class="col-md-2 col-12">
                                    ${element.id}
                                </div>
                                <div class="col-md-4 col-12"  id="desc_${element.id}">
                                ${element.descripcion}
                                </div>
                                <div class="col-md-2 col-12" id="cant_${element.id}">
                                  ${element.cantidad}
                                </div>
                                <div class="col-md-2 col-12"  id="pu_${element.id}">
                                ${element.precio_unitario}
                                </div>
                                <div class="col-md-2 col-12"  id="imp_${element.id}">
                                ${element.importe}
                                </div>
                            </div>
                                </a>
                              `)
                            });

                            
                        }
                    });
                    
                }else{
                   
                }

               }else {
                $("#area_servicios_pendientes").empty()
                $("#area_precios").empty()
               }
            })


            


        }
    }).then(function(re){
        if(re.isConfirmed){
            let detalles = []
            let estatus = $("#estatus").val()
            if(estatus == "Cerrada"){
                let area_detalle = $("#area-detalle-servicio")
                area_detalle.children().each(function(index, element){
                   
                    let desc=  $(this).attr("desc")
                    let p_unit=  $(this).attr("p_unit")
                    let importe=  $(this).attr("import")
                    let cant=  $(this).attr("cant")
                    let code=  $(this).attr("code")


                    detalle = new Object();
                    detalle.desc = desc;
                    detalle.p_unit = p_unit;
                    detalle.importe = importe;
                    detalle.cant = cant;
                    detalle.id = code
            
                    detalles.push(detalle);
                })
                console.log(detalles);
            }

            let dat = {
                "id_orden": id,
                "estatus": estatus,
                "detalles": detalles
            }

            $.ajax({
                type: "post",
                url: "../servidor/historial/update-estatus.php",
                data: dat,
                /* dataType: "JSON", */
                success: function (response) {
                    Swal.fire({
                        icon:"success",
                        html: "<b>Actualizado correctamente</b>",
                        
                    })

                    tabla.ajax.reload(null, false)
                }
            });
        }
    })
}

function setPrecios(id_detalle){

    let cantidad = parseFloat($(`#cant_${id_detalle}`).text());
    let desc_con_saltos = $(`#desc_${id_detalle}`).text()
    let desc = desc_con_saltos.replace(/(\r\n|\n|\r)/gm, "") 
    let u_price = parseFloat($(`#pu_${id_detalle}`).text());
    let importe = parseFloat($(`#imp_${id_detalle}`).text());

    $("#area_precios").empty().append(`
    <div class="container">
        <div class="row">
        <div class="col-12 col-md-2">
            <label for="cant">Cantidad</label>
            <input class="form-control" value="${cantidad}" type="number" id="cant" placeholder="0">
        </div>

        <div class="col-12 col-md-4">
            <label for="desc">Descripción</label>
            <textarea class="form-control"type="text" id="desc" placeholder="Descripción">${desc}</textarea>
        </div>

        <div class="col-12 col-md-3">
            <label for="u-price">Precio unit.</label>
            <input class="form-control" value="${u_price}" type="number" id="u-price" placeholder="0">
        </div>

        <div class="col-12 col-md-3">
            <label for="import">Importe</label>
            <input class="form-control" value="${importe}" type="number" id="import" placeholder="0" disabled>
        </div>
        </div>

        <div class="row justify-content-center m-3">
        <div class="col-12 col-md-6">
            <div class="btn btn-success" onclick="updateServicio(${id_detalle})"><i class="fa-solid fa-circle-check"></i> Actualizar servicio</div>
        </div>
        </div>
        </div>
    `)

   

    $("#cant").keyup(function(e) {
        let new_cant = $("#cant").val();
      
        let actual_U_price = $("#u-price").val();
        
        let new_import  = parseInt(new_cant) * parseFloat(actual_U_price)
        $("#import").val(new_import)
    })

    $("#u-price").keyup(function(e) {
        let new_u_price = $("#cant").val();
        let actual_cant = $("#u-price").val();
        let new_import  = parseInt(actual_cant) * parseFloat(new_u_price);
        $("#import").val(new_import)
    })
}

function updateServicio(id_detalle) {

    $(`#cant_${id_detalle}`).text($("#cant").val());
    $(`#desc_${id_detalle}`).text($("#desc").val());
    $(`#pu_${id_detalle}`).text($("#u-price").val());
    $(`#imp_${id_detalle}`).text($("#import").val());

    $(`#detalle_${id_detalle}`).attr("desc", $("#desc").val())
    $(`#detalle_${id_detalle}`).attr("cant", $("#cant").val())
    $(`#detalle_${id_detalle}`).attr("p_unit", $("#u-price").val())
    $(`#detalle_${id_detalle}`).attr("import", $("#import").val())

    $("#cant").val("")
    $("#desc").val("")
    $("#u-price").val("")
    $("#import").val("")
}
