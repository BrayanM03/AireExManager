id_orden = getParameterByName("id");

function agregarServicioAOrden(){

  Swal.fire({
    icon: 'info',
    title: '¿Agregar servicio a la orden?',
    text: "Se agregará el servicio a la orden, y se actualizara el importe de la orden.",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Agregar',
    cancelButtonText: "Cancelar"
    }).then((result) => {
    if (result.isConfirmed) {
        

        let cantidad = $("#cantidad").val();
        let id_producto = $("#datos-btn").attr("id_producto");
        let precio = $("#precio").val();
        let valoresSeries = [];

        if(id_producto == ""){
        Toast.fire({
          icon: 'error',
          title: 'Selecciona un servicio'
        })
          
        }else{

          if(cantidad == 0){
            Toast.fire({
              icon: 'error',
              title: 'Agrega una cantidad'
            })
        }else{
      
          setPantallaCargando() 
      
          
          let categoria = $("#buscador-select").val();
          let comision = $("#comision").val();
      
          $.ajax({
            type: "POST",
            url: "../servidor/historial/editar-detalle.php",
            data: { id: id_producto, precio: precio, comision: comision, tabla: "servicios", series: valoresSeries, categoria: categoria, id_orden: id_orden, cantidad: cantidad},
            dataType: "JSON",
            success: function (response) {
              if(response.status == true){
                Toast.fire({
                  icon: 'success',
                  title: response.mensj
                });
      
                
                setTablaDetalles()                    
                
              }
            }
          
          })
      
        }
        }
          quitarLoad()


    }   
})

}

function agregarRefaccionAOrden(){

  Swal.fire({
    icon: 'info',
    title: '¿Agregar refacción a la orden?',
    text: "Se agregará la refacción a la orden, y se actualizara el importe de la orden.",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Agregar',
    cancelButtonText: "Cancelar"
    }).then((result) => {
    if (result.isConfirmed) {
        

        let cantidad = $("#cantidad").val();
        let id_producto = $("#datos-btn").attr("id_producto");
        let precio = $("#precio").val();
        let valoresSeries = [];

        if(id_producto == ""){
        Toast.fire({
          icon: 'error',
          title: 'Selecciona una refacción'
        })
          
        }else{

          if(cantidad == 0){
            Toast.fire({
              icon: 'error',
              title: 'Agrega una cantidad'
            })
        }else{
      
          
      
          
          let categoria = $("#buscador-select").val();
          let comision = $("#comision").val();
      
          $.ajax({
            type: "POST",
            url: "../servidor/historial/editar-detalle.php",
            data: { id: id_producto, precio: precio, comision: comision, tabla: "refacciones", series: valoresSeries, categoria: categoria, id_orden: id_orden, cantidad: cantidad},
            dataType: "JSON",
            success: function (response) {
              setPantallaCargando() 
              if(response.status == true){
                Toast.fire({
                  icon: 'success',
                  title: response.mensj
                });
      
                
                setTablaDetalles()                    
                
              }else if(response.status == false){
                Toast.fire({
                  icon: 'error',
                  title: response.mensj
                });
              }
            }
          
          })
      
        }
        }
          quitarLoad()


    }   
})
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
                let comision = $("#comision").val();
            
                $.ajax({
                  type: "POST",
                  url: "../servidor/historial/editar-detalle.php",
                  data: { id: id_producto, comision: comision, series: valoresSeries, precio: precio, tabla: "inventario", categoria: categoria, id_orden: id_orden},
                  dataType: "JSON",
                  success: function (response) {
                    if(response.status == true){
                      Toast.fire({
                        icon: 'success',
                        title: response.mensj
                      });
            
                      setearSeries(id_producto) 
                      setTablaDetalles()                    
                      
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



function eliminarDetalle(id){
    Swal.fire({
        icon: 'info',
        title: '¿Eliminar detalle?',
        text: "Se eliminará el detalle de la orden.",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: "Cancelar"
        }).then((result) => {
        if (result.isConfirmed) {
            
            setPantallaCargando() 
            
            
            
            $.ajax({
              type: "POST",
              url: "../servidor/historial/eliminar-detalle.php",
              data: { id_detalle: id},
              dataType: "JSON",
              success: function (response) {
                if(response.status == true){
                  Toast.fire({
                    icon: 'success',
                    title: response.mensj
                  });
            
                  setTablaDetalles()                    
                  
                }
              }
            
            })
            
            quitarLoad()
        }   
    })
}  


  

