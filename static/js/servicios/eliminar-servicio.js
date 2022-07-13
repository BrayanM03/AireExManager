function eliminarRefaccion(id) { 

    Swal.fire({
        icon:"question",
        html: `<b>¿Eliminar servicio?</b>`,
        confirmButtonText: "Borrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then((response)=>{
        if(response.isConfirmed){

            $.ajax({
                type: "POST",
                url: "../servidor/servicios/eliminar-servicio.php",
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