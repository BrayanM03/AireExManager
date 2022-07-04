function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

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


  let id_producto = getParameterByName("id_product");
  let sucursal_id = getParameterByName("sucursal");

  $("#sucursal").val(sucursal_id)
  $("#producto").val(id_producto)


 function actualizarProducto(id_producto){

     let proveedor = document.getElementById("proveedor").value
     let tonelaje= document.getElementById("tonelaje").value
     let modelo = document.getElementById("modelo").value
     let marca = document.getElementById("marca").value
    /*  let cantidad = +document.getElementById("cantidad").value //Aqui pongo el mas para hacer la cantidad un "number" */
     let costo = document.getElementById("costo").value
     let precio = document.getElementById("precio").value
     let sucursal = document.getElementById("sucursal").value


     if(modelo == ""){
      Toast.fire({
          icon: 'error',
          title: 'Ingresa un modelo'
        })
   }

   else if(marca == ""){
      Toast.fire({
          icon: 'error',
          title: 'Ingresa una marca'
        })
  }

  else if(cantidad === "" || cantidad < 0){
      Toast.fire({
          icon: 'error',
          title: 'Ingresa una cantidad igual o mayor a 0'
        })
  }

 
  else if(costo == ""){
      Toast.fire({
          icon: 'error',
          title: 'Ingresa un costo'
        })
  }

  else if(precio == ""){
      Toast.fire({
          icon: 'error',
          title: 'Ingresa un precio'
        })
  }

  else{
     datosForm = new FormData();
     datosForm.append("id_producto", id_producto);
     datosForm.append("proveedor", proveedor);
     datosForm.append("tonelaje", tonelaje); 
     datosForm.append("modelo", modelo);
     datosForm.append("marca", marca); 
     datosForm.append("costo", costo);
     datosForm.append("precio", precio);
     datosForm.append("costo", costo);
     datosForm.append("sucursal", sucursal);
     datosForm.append("type", "actualizacion");


     $.ajax({
      type: "POST",
      url: "../servidor/inventario/manejo-productos.php",
      processData: false,
      contentType: false,
      data: datosForm,
     
      success: function (response) {
          if(response == 1){
         
              Swal.fire({
                  icon: "success",
                  html: "<b>¡Se actualizó un producto del inventario!</b>",
                  allowOutsideClick: false,
                  confirmButtonText: "Entendido"
              }).then((response)=>{
                  location.reload();
              })
          }
      }
  });


  }


 }



  