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
        title: 'Agregar Servicio',
        html: `<div class="container">
               <div class="row mb-3">
                 
                  <div class="col-md-6 col-12">
                      <label>Precio</label>
                      <input class="form-control" type="number" id="precio" placeholder="0.00"/>
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

            let descripcion = $("#descripcion").val();
            let precio = $("#precio").val();
    
        
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

            let data = {
                precio: precio,
                descripcion: descripcion
            } 

            $.ajax({
                type: "POST",
                url: "../servidor/servicios/agregar-servicio.php",
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



  