

function editarRefaccion(id) { 

    $.ajax({
        type: "POST",
        url: "../servidor/servicios/traer-servicio.php",
        data: {"id": id},
        dataType: "JSON",
        success: function (resp) {
            
    Swal.fire({
        icon: 'info',
        title: 'Editar servicio',
        html: `<div class="container">
                
               <div class="row mb-3">
                 
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

           
            let precio = $("#precio").val();
            let descripcion = $("#descripcion").val();
            
           
            if(precio == ""){
                Swal.showValidationMessage("Agrega un precio")
            }else
            if(descripcion == ""){
                Swal.showValidationMessage("Agrega una descripcion")
            }

        }
    }).then(function(response) {

        if(response.isConfirmed){

            

            let precio = $("#precio").val();
            let descripcion = $("#descripcion").val();
            let estatus = $("#estatus").val();

            let data = {
                id : id,
                precio: precio,
                descripcion: descripcion,
                estatus: estatus
            } 

            $.ajax({
                type: "POST",
                url: "../servidor/servicios/actualizar-servicio.php",
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



  