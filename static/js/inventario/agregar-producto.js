function agregarProducto(){

     let proveedor = document.getElementById("proveedor").value
     let tonelaje= document.getElementById("tonelaje").value
     let modelo = document.getElementById("modelo").value
     let marca = document.getElementById("marca").value
     let cantidad = +document.getElementById("cantidad").value //Aqui pongo el mas para hacer la cantidad un "number"
     let costo = document.getElementById("costo").value
     let precio = document.getElementById("precio").value
     let precio_con_inst = document.getElementById("precio_con_inst").value
     let sucursal = document.getElementById("sucursal").value
     let descripcion = document.getElementById("descripcion").value
 


    let hasCantidadInt = Number.isInteger(cantidad);

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

    else if(hasCantidadInt == false){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa una cantidad entera'
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
     datosForm.append("descripcion", descripcion);
     datosForm.append("proveedor", proveedor);
     datosForm.append("tonelaje", tonelaje); 
     datosForm.append("modelo", modelo);
     datosForm.append("marca", marca); 
     datosForm.append("cantidad", cantidad);
     datosForm.append("costo", costo);
     datosForm.append("precio", precio);
     datosForm.append("precio_con_inst", precio_con_inst);
     datosForm.append("costo", costo);
     datosForm.append("sucursal", sucursal);
   console.log(datosForm.get("proveedor"));
   console.log(datosForm.get("descripcion"));

     if(cantidad !== 0) {
       
        let card_title = $("#title-card");
        card_body = $("#card-body");
        card_title.empty().text("Ingresa los numeros de serie por la cantidad que ingresaste");
        $("#backbtn_area").empty().append(`
        <div class="btn" onclick="RegresarAtras(2)">
        <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
        `)
        card_body.empty().load(`vistas/inventario/agregar-serie.php`,{
            cantidad: cantidad
        })

     
          
     }else if(cantidad == 0){
        Swal.fire({
            icon: 'question',
            html: `<p>Ingresaste 0 en la cantidad, significa que no vas a registar series del producto, ¿Quieres finalizar el proceso?<p>`,
            showCancelButton: true,
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar'
        }).then(function (response){
            if(response.isConfirmed){
                terminarRegistro(1);
            }
        })
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


  function setInputSeries(cantidad, counter){

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

  //Temrinando proceso de registro
  function terminarRegistro(type){

    if(type == 1){
        datosForm.append("has_series", 0);
        $.ajax({
            type: "POST",
            url: "../servidor/inventario/registrar-clima-serie.php",
            processData: false,
            contentType: false,
            data: datosForm,
           
            success: function (response) {
                if(response == 1){
               
                    Swal.fire({
                        icon: "success",
                        html: "<b>¡Se agrego un nuevo producto al inventario!</b>",
                        allowOutsideClick: false,
                        confirmButtonText: "Entendido"
                    }).then((response)=>{
                        location.reload();
                    })
                }
            }
        });

    }else if(type == 2){

        
        
           let series_form_evap = document.getElementsByClassName('evap-input')
           let series_form_cond = document.getElementsByClassName('cond-input')
           let fecha_compra = document.getElementById('fecha_compra').value;
       
           flag =0;

           series = [];
           for (let item of series_form_cond) {
            series.push([item.value])            
           }


           for (let item of series_form_evap) {
            series[flag].push(item.value)
            flag++;
            
           }

           series_json = JSON.stringify(series);

           datosForm.append("series", series_json);
           datosForm.append("has_series", 1);

           if(fecha_compra == ""){
            Toast.fire({
                icon: 'error',
                title: 'Ingresa una fecha'
              })
        }else{

            let metodo = $("#metodo").val()
            datosForm.append("fecha_compra", fecha_compra);
            datosForm.append("metodo", metodo);
          

            $.ajax({
              type: "POST",
              url: "../servidor/inventario/registrar-clima-serie.php",
              processData: false,
              contentType: false,
              data: datosForm,
             
              success: function (response) {
                  if(response == 1){
                      Swal.fire({
                          icon: "success",
                          html: "<b>¡Se agrego un nuevo producto al inventario!</b>",
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

  }
  