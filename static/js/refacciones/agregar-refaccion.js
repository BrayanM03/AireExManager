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

function agregarRefaccion() { 

    Swal.fire({
        icon: 'info',
        title: 'Agregar refacción',
        html: `<div class="container">
                <div class="row mb-3">
                  <div class="col-md-6 col-12">
                      <label>Proveedor</label>
                      <input class="form-control" type="text" id="proveedor" placeholder="Proveedor"/>
                  </div>
                  <div class="col-md-6 col-12">
                      <label>Modelo</label>
                      <input class="form-control" type="text" id="modelo" placeholder="Modelo"/>
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-6 col-12">
                      <label>Costo</label>
                      <input class="form-control" type="number" id="costo" placeholder="0.00"/>
                  </div>
                  <div class="col-md-6 col-12">
                      <label>Precio</label>
                      <input class="form-control" type="number" id="precio" placeholder="0.00"/>
                  </div>
                  
               </div>
               <div class="row mb-3">
                    <div class="col-md-6 col-12">
                        <label>Marca</label>
                        <input class="form-control" type="text" id="marca" placeholder="Marca"/>
                    </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-4 col-12">
                      <label>Cantidad</label>
                      <input class="form-control" type="number" id="cantidad" placeholder="0"/>
                  </div>
                  <div class="col-md-8 col-12">
                      <label>Observación</label>
                      <textarea class="form-control" type="text" id="observacion" placeholder="Escribe observacion de la refacción"></textarea>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-12 col-12">
                      <label>Descripción</label>
                      <textarea class="form-control" type="text" id="descripcion" placeholder="Escribe descripción de la refacción"></textarea>
                  </div>
               </div>
               </div>`,
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
            let marca = $("#marca").val();
            let costo = $("#costo").val();
            let precio = $("#precio").val();
            let cantidad = $("#cantidad").val();
            let observacion = $("#observacion").val();
            let descripcion = $("#descripcion").val();
            let sucursal = getParameterByName("store_id");

            let data = {
                proveedor: proveedor,
                modelo: modelo,
                marca: marca,
                costo: costo,
                precio: precio,
                cantidad: cantidad,
                observacion: observacion,
                descripcion: descripcion,
                sucursal: sucursal
            } 

            $.ajax({
                type: "POST",
                url: "../servidor/refacciones/agregar-refaccion.php",
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

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

 }



  