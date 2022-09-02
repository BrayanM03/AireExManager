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

function agregarGasto(){

  Swal.fire({
        icon: 'info',
        title: 'Agregar gasto',
        html: `<div class="container">
                
               <div class="row mb-3">
                  <div class="col-md-5 col-12">
                      <label>Fecha</label>
                      <input class="form-control" type="datetime-local" id="fecha" />
                  </div>
                  <div class="col-md-7 col-12">
                      <label>Forma de gasto</label>
                      <select class="form-control" id="forma_gasto">
                         <option id="Efectivo">Efectivo</option>
                         <option id="Tarjeta">Tarjeta</option>
                         <option id="Transferencia">Transferencia</option>
                         <option id="Cheque">Cheque</option>
                         <option id="Sin definir">Sin definir</option>
                      </select>
                  </div>
                  </div>
                  <div class="row mb-3">
                  <div class="col-md-7 col-12">
                      <label>Importe</label>
                      <input class="form-control" type="number" id="importe" placeholder="0.00"/>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-12 col-12">
                      <label>Concepto</label>
                      <textarea class="form-control" type="text" id="descripcion" placeholder="Escribe el concepto del gasto"></textarea>
                  </div>
               </div>
               </div>`,
        confirmButtonText: "Registrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: function() {

            let fecha = $("#fecha").val();
            let importe = $("#importe").val();
            let descripcion = $("#descripcion").val();
    
            if(fecha == ""){
                Swal.showValidationMessage("Agrega una fecha")
            }else
            if(importe == ""){
                Swal.showValidationMessage("Agrega unimporte")
            }else
            if(descripcion == ""){
                Swal.showValidationMessage("Agrega un concepto")
            }

        }
    }).then(function(response) {

        if(response.isConfirmed){

            

            let fecha = $("#fecha").val();
            let forma_gasto = $("#forma_gasto").val();
            let importe = $("#importe").val();
            let descripcion = $("#descripcion").val();
            let sucursal= $("#user-data").attr("id_sucursal");

            let data = {
                fecha: fecha,
                importe: importe,
                descripcion: descripcion,
                sucursal: sucursal,
                forma_gasto : forma_gasto
            } 

            $.ajax({
                type: "POST",
                url: "../servidor/gastos/agregar-gasto.php",
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }