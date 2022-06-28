function agregarProducto(){

    let proveedor = document.getElementById("proveedor")
    let tonelaje= document.getElementById("tonelaje")
     let modelo = document.getElementById("modelo")
     let marca = document.getElementById("marca")
     let cantidad = document.getElementById("canitdad")
     let costo = document.getElementById("costo")
     let precio = document.getElementById("precio")

     if(modelo.value == ""){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un modelo'
          })
     }

     else if(marca.value == ""){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa una marca'
          })
    }

    else if(costo.value == ""){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un costo'
          })
    }

    else if(precio.value == ""){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un precio'
          })
    }

    else{

     let datosForm = new FormData();
     datosForm.append("proveedor", proveedor);
     datosForm.append("tonelaje", tonelaje); 
     datosForm.append("modelo", modelo);
     datosForm.append("marca", marca); 
     datosForm.append("cantidad", cantidad);
     datosForm.append("costo", costo);
     datosForm.append("precio", precio);
     datosForm.append("costo", costo);

     if(cantidad !== 0) {
        let counter = 1;
        let card_title = $("#title-card");
        let card_body = $("#card-body");
        card_title.empty().text("Ingresa los numeros de serie por la cantidad que ingresaste");
        card_body.empty().load(`vistas/inventario/agregar-serie.php`)

        for(let step = 0; step < cantidad; step++){
            console.log(step);
            $("#contenedor-series").append(`
                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <input class="form-control" id="serie_condensador_${counter}" type="text" placeholder="Serie ${counter}">
                    </div>
                
                    <div class="col-12 col-md-6">
                    <input class="form-control" id="serie_evaporador_${counter}" type="text" placeholder="Serie ${counter}">
                    </div>
                </div>
            `)

            counter++;
        }
     }
     
     

    }
     

    



     
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