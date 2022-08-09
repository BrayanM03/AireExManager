id_orden = getParameterByName("id");
console.log(id_orden);
function agregarServicioAOrden(){

}

function agregarRefaccionAOrden(){

}

function agregarProductoAOrden(){

    Swal.fire({
        icon: 'info',
        title: '¿Agregar producto a la orden?',
        text: "Se agregará el producto a la orden, se descontara del inventario y se actualizará el stock asi como el importe de la orden.",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agregar',
        cancelButtonText: "Cancelar"
        }).then((result) => {
        if (result.isConfirmed) {
            

            let valoresSeries = [];
  
            $(".list-group input[type=checkbox]:checked").each(function(){
             
                valoresSeries.push(this.value);
            });
            
            console.log(valoresSeries);
            
              if(valoresSeries.length == 0){
                  Toast.fire({
                    icon: 'error',
                    title: 'Selecciona una o mas series'
                  })
              }else{
            
                setPantallaCargando() 
            
                let id_producto = $("#datos-btn").attr("id_producto");
                let precio = $("#precio").val();
                let categoria = $("#buscador-select").val();
            
                $.ajax({
                  type: "POST",
                  url: "../servidor/historial/editar-detalle.php",
                  data: { id: id_producto, series: valoresSeries, precio: precio, tabla: "inventario", categoria: categoria, id_orden: id_orden},
                  dataType: "JSON",
                  success: function (response) {
                    if(response.status == true){
                      Toast.fire({
                        icon: 'success',
                        title: 'Agregado correctamente'
                      });
            
                      setearSeries(id_producto)
                      tabla.ajax.reload(null, false)  
                      $("#neto").val(response.importe)
                    }
                  }
                
                })
            
              }
            
              quitarLoad()


        }   
    })

}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  

