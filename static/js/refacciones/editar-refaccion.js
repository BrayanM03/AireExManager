

function editarRefaccion(id) { 

    $.ajax({
        type: "POST",
        url: "../servidor/refacciones/traer-refaccion.php",
        data: {"id": id},
        dataType: "JSON",
        success: function (resp) {
            
    Swal.fire({
        icon: 'info',
        title: 'Agregar refacción',
        html: `<div class="container">
                <div class="row mb-3">
                  <div class="col-md-6 col-12">
                      <label>Proveedor</label>
                      <input class="form-control" type="text" id="proveedor" value="${resp.data.proveedor}" placeholder="Proveedor"/>
                  </div>
                  <div class="col-md-6 col-12">
                      <label>Modelo</label>
                      <input class="form-control" value="${resp.data.modelo}" type="text" id="modelo" placeholder="Modelo"/>
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-6 col-12">
                      <label>Costo</label>
                      <input class="form-control" value="${resp.data.costo}" type="number" id="costo" placeholder="0.00"/>
                  </div>
                  <div class="col-md-6 col-12">
                      <label>Precio</label>
                      <input class="form-control" value="${resp.data.precio}" type="number" id="precio" placeholder="0.00"/>
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-6 col-12">
                      <label>Estatus</label>
                      <select class="form-control" id="estatus">
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                      </select>
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-4 col-12">
                      <label>Cantidad</label>
                      <input class="form-control" value="${resp.data.stock}" type="number" id="cantidad" placeholder="0"/>
                  </div>
                  <div class="col-md-8 col-12">
                      <label>Observación</label>
                      <textarea class="form-control" type="text" id="observacion" placeholder="Escribe observacion de la refacción">${resp.data.observaciones}</textarea>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-12 col-12">
                      <label>Descripción</label>
                      <textarea class="form-control" type="text" id="descripcion" placeholder="Escribe descripción de la refacción">${resp.data.descripcion}</textarea>
                  </div>
               </div>
               </div>`,
        didOpen: function(){
            $("#estatus").val(resp.data.estatus)
        },       
        confirmButtonText: "Registrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: function() {

            let proveedor = $("#proveedor").val();
            let modelo = $("#modelo").val();
            let costo = $("#costo").val();
            let precio = $("#precio").val();
            let cantidad = $("#cantidad").val();
            let observacion = $("#observacion").val();
            let descripcion = $("#descripcion").val();
    
            if(costo == ""){
                Swal.showValidationMessage("Agrega un costo")
            }else
            if(precio == ""){
                Swal.showValidationMessage("Agrega un precio")
            }else
            if(cantidad == ""){
                Swal.showValidationMessage("Agrega una cantidad")
            }else
            if(descripcion == ""){
                Swal.showValidationMessage("Agrega una descripcion")
            }

        }
    }).then(function(response) {

        if(response.isConfirmed){

            

            let proveedor = $("#proveedor").val();
            let modelo = $("#modelo").val();
            let costo = $("#costo").val();
            let precio = $("#precio").val();
            let cantidad = $("#cantidad").val();
            let observacion = $("#observacion").val();
            let descripcion = $("#descripcion").val();
            let sucursal = getParameterByName("store_id");
            let estatus = $("#estatus").val();

            let data = {
                id : id,
                proveedor: proveedor,
                modelo: modelo,
                costo: costo,
                precio: precio,
                cantidad: cantidad,
                observacion: observacion,
                descripcion: descripcion,
                sucursal: sucursal,
                estatus: estatus
            } 

            $.ajax({
                type: "POST",
                url: "../servidor/refacciones/actualizar-refaccion.php",
                data: data,
                dataType: "JSON",
                success: function (response2) { 
                    if(response2.status == true){
                        Swal.fire({
                            icon:"success",
                            html: `<b>${response2.mensj}</b>`
                        })

                        tabla.ajax.reload( null, false)
                    }
                }
            });
            
        }
    })
        }
    });




 }



  