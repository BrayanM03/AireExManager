function eliminarRefaccion(id) { 

    Swal.fire({
        icon:"question",
        html: `<b>¿Eliminar refacción?</b>`,
        confirmButtonText: "Borrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then((response)=>{
        if(response.isConfirmed){

            $.ajax({
                type: "POST",
                url: "../servidor/refacciones/eliminar-refaccion.php",
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