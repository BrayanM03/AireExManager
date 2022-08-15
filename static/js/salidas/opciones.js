function verTicket(id, ticket) {
    
    window.open("ticket.php?id="+id + "&ticket=" + ticket, '_blank', 'location=yes,height=570,width=1000,scrollbars=yes,status=yes');
}

function eliminarRegistro(id){
    Swal.fire({
        icon:"question",
        html: `<b>¿Eliminar registro?</b>`,
        confirmButtonText: "Borrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then((response)=>{
        if(response.isConfirmed){

            $.ajax({
                type: "POST",
                url: "../servidor/historial/eliminar-salida.php",
                data: {id:id},
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


function optionsReporteSalidas(){

    Swal.fire({
        icon:"info",
        html: `<div class="container">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Fecha Inicio</label>  
                                <input type="date" class="form-control" id="fechaInicio">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Fecha Fin</label>
                                <input type="date" class="form-control" id="fechaFin">
                            </div>
                        </div>
                    </div>
               </div>`,
               preConfirm: () => {

               
                   
                        if($("#fechaInicio").val() == "" || $("#fechaFin").val() == ""){
                            
                            Swal.showValidationMessage(
                                `Debes ingresar las fechas`
                              )
                        }else if($("#fechaFin").val() < $("#fechaInicio").val() ){
                            Swal.showValidationMessage(
                                `La fecha fin no puede ser menor a la inicial`
                              )
                        }
                   
            
            },

            

        confirmButtonText: "Generar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then(function (result) {
        if(result.isConfirmed){
            let inicio = $("#fechaInicio").val();  //fecha inicio
            let fin = $("#fechaFin").val();  //fecha fin
            window.open('servidor/salidas/reporte-salidas.php?inicio='+inicio+'&fin='+fin, '_blank');
        }
    })

}