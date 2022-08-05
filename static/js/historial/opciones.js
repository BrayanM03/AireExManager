let sucursal_usuario = $("#user-data").attr("id_sucursal")

function cambiarEstatus(id, estatus, tipo){



    Swal.fire({
        icon: 'info',
        title: 'Actualizar orden',
        width: '600px',
        html: `<div class="container">
        
            <div class="row">
                <div class="col-md-12 col-12">
                    <label for="estatus">Estatus de la orden</label>
                    <select class="form-control m-2" id="estatus" name="estatus">
                        <option value="Cerrada">Cerrada</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>
            </div>

            <div class="row mt-2" style="font-size: 12px" id="area_servicios_pendientes">
            </div>

            <div class="row mt-2" style="font-size: 12px" id="area_precios">
            </div>
        </div>
        
        </div>`,
        confirmButtonText: "Actualizar",
        didOpen: function(){
            $("#estatus").val(estatus)

          /*  

            $("#estatus").on("change", function(){
               if($(this).val() == "Cerrada"){

                if(tipo == "2" || tipo == "3"){

                    $.ajax({
                        type: "POST",
                        url: "../servidor/historial/traer-detalle-orden.php",
                        data: {id:id},
                        dataType: "JSON",
                        success: function (response) {
                            $("#area_servicios_pendientes").empty().append(`
                            <div class="col-md-12 col-12">
                            Selecciona un servicio para actualizar su precio pendiente, despues click en actualizar
                            </div><br>
                            <div class="col-md-12 col-12">
                                    <div class="list-group">
                                    <div class="list-group-item list-group-item-action active" aria-current="true">
                                        <div class="row">
                                            <div class="col-md-2 col-12">
                                                ID
                                            </div>
                                            <div class="col-md-4 col-12">
                                                Descripción
                                            </div>
                                            <div class="col-md-2 col-12">
                                            Cant.
                                           </div>
                                            <div class="col-md-2 col-12">
                                                Precio unit.
                                            </div>
                                            <div class="col-md-2 col-12">
                                                Importe
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div id="area-detalle-servicio">
                                   
                                    </div>
                                    </div>
                            `)
                            response["data"].forEach(element => {
                                $("#area-detalle-servicio").empty().append(`
                                <a href="#" class="list-group-item list-group-item-action" 
                                code="${element.id}"
                                id="detalle_${element.id}"
                                desc="${element.descripcion}"
                                cant="${element.cantidad}"
                                p_unit="${element.precio_unitario}"
                                import="${element.importe}"
                                onclick="setPrecios( ${element.id})">
                                <div class="row">
                                <div class="col-md-2 col-12">
                                    ${element.id}
                                </div>
                                <div class="col-md-4 col-12"  id="desc_${element.id}">
                                ${element.descripcion}
                                </div>
                                <div class="col-md-2 col-12" id="cant_${element.id}">
                                  ${element.cantidad}
                                </div>
                                <div class="col-md-2 col-12"  id="pu_${element.id}">
                                ${element.precio_unitario}
                                </div>
                                <div class="col-md-2 col-12"  id="imp_${element.id}">
                                ${element.importe}
                                </div>
                            </div>
                                </a>
                              `)
                            });

                            
                        }
                    });
                    
                }else{
                   
                }

               }else {
                $("#area_servicios_pendientes").empty()
                $("#area_precios").empty()
               }
            })
 */

            


        }
    }).then(function(re){
        if(re.isConfirmed){
            let detalles = []
            let estatus = $("#estatus").val()
            if(estatus == "Cerrada"){
                let area_detalle = $("#area-detalle-servicio")
                area_detalle.children().each(function(index, element){
                   
                    let desc=  $(this).attr("desc")
                    let p_unit=  $(this).attr("p_unit")
                    let importe=  $(this).attr("import")
                    let cant=  $(this).attr("cant")
                    let code=  $(this).attr("code")


                    detalle = new Object();
                    detalle.desc = desc;
                    detalle.p_unit = p_unit;
                    detalle.importe = importe;
                    detalle.cant = cant;
                    detalle.id = code
            
                    detalles.push(detalle);
                })
                
            }

            let dat = {
                "id_orden": id,
                "estatus": estatus,
                "detalles": detalles
            }

            $.ajax({
                type: "post",
                url: "../servidor/historial/update-estatus.php",
                data: dat,
                /* dataType: "JSON", */
                success: function (response) {
                    Swal.fire({
                        icon:"success",
                        html: "<b>Actualizado correctamente</b>",
                        
                    })

                    tabla.ajax.reload(null, false)
                }
            });
        }
    })
}

function verOpciones(id, estatus, tipo){

    Swal.fire({
        icon:"info",
        title: "Selecciona una opción",
        html: `<div class="container">
               <div class="row">
                        <div class="col-md-12">
                            <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action" onclick="cambiarEstatus(${id}, '${estatus}', '${tipo}')">Cambiar estatus</a>
                            <a href="#" class="list-group-item list-group-item-action" onclick="agregarCostos(${id})">Agregar costos extra</a>
                           
                        </div>
                        </div> 
               </div>
               </div>`
    })

}

function setPrecios(id_detalle){

    let cantidad = parseFloat($(`#cant_${id_detalle}`).text());
    let desc_con_saltos = $(`#desc_${id_detalle}`).text()
    let desc = desc_con_saltos.replace(/(\r\n|\n|\r)/gm, "") 
    let u_price = parseFloat($(`#pu_${id_detalle}`).text());
    let importe = parseFloat($(`#imp_${id_detalle}`).text());

    $("#area_precios").empty().append(`
    <div class="container">
        <div class="row">
        <div class="col-12 col-md-2">
            <label for="cant">Cantidad</label>
            <input class="form-control" value="${cantidad}" type="number" id="cant" placeholder="0">
        </div>

        <div class="col-12 col-md-4">
            <label for="desc">Descripción</label>
            <textarea class="form-control"type="text" id="desc" placeholder="Descripción">${desc}</textarea>
        </div>

        <div class="col-12 col-md-3">
            <label for="u-price">Precio unit.</label>
            <input class="form-control" value="${u_price}" type="number" id="u-price" placeholder="0">
        </div>

        <div class="col-12 col-md-3">
            <label for="import">Importe</label>
            <input class="form-control" value="${importe}" type="number" id="import" placeholder="0" disabled>
        </div>
        </div>

        <div class="row justify-content-center m-3">
        <div class="col-12 col-md-6">
            <div class="btn btn-success" onclick="updateServicio(${id_detalle})"><i class="fa-solid fa-circle-check"></i> Actualizar servicio</div>
        </div>
        </div>
        </div>
    `)

   

    $("#cant").keyup(function(e) {
        let new_cant = $("#cant").val();
      
        let actual_U_price = $("#u-price").val();
        
        let new_import  = parseInt(new_cant) * parseFloat(actual_U_price)
        $("#import").val(new_import)
    })

    $("#u-price").keyup(function(e) {
        let new_u_price = $("#cant").val();
        let actual_cant = $("#u-price").val();
        let new_import  = parseInt(actual_cant) * parseFloat(new_u_price);
        $("#import").val(new_import)
    })
}

function updateServicio(id_detalle) {

    $(`#cant_${id_detalle}`).text($("#cant").val());
    $(`#desc_${id_detalle}`).text($("#desc").val());
    $(`#pu_${id_detalle}`).text($("#u-price").val());
    $(`#imp_${id_detalle}`).text($("#import").val());

    $(`#detalle_${id_detalle}`).attr("desc", $("#desc").val())
    $(`#detalle_${id_detalle}`).attr("cant", $("#cant").val())
    $(`#detalle_${id_detalle}`).attr("p_unit", $("#u-price").val())
    $(`#detalle_${id_detalle}`).attr("import", $("#import").val())

    $("#cant").val("")
    $("#desc").val("")
    $("#u-price").val("")
    $("#import").val("")
}


function agregarCostos(id){

    Swal.fire({
        icon:"info",
        width: "500px",
        title: "Agregar costo extra",
        html: `<div class="container">

                <div class="row mb-3">
                    <div class="col-12 col-md-12 text-start">
                        <label for="cant"><i class="fa-solid fa-magnifying-glass"></i> Buscar</label>
                        <select name="buscador" class="form-control w-50" id="buscador-select" onchange="cambiarSeleccionarProducto()">
                            <option value="null">Selecciona un tipo de producto</option>
                            <option value="inventario">Aire Acondicionado</option>
                            <option value="refacciones">Refaccion</option>
                            <option value="servicios">Servicio</option>
                        </select>
                    </div>
                </div>
        
            
                <div class="row mb-3" id="area-producto">
                      
                </div>
       

               <div class="row">
                        <div class="col-md-6 col-12">
                            <label>Monto</label>
                            <input class="form-control" id="monto_extra" placeholder="0.00" type="number">
                        </div>
                        
                        <div class="col-md-6 col-12">
                            <label>Cantidad</label>
                            <input class="form-control" id="cantidad" placeholder="0" type="number">
                        </div>  
               </div>

               <div class="row mt-3">
                        <div class="col-md-8 col-12">
                            <label>Descripción</label>
                            <textarea class="form-control" id="descripcion" placeholder="Escribe la descripcion del concepto del monto extra..."></textarea>
                        </div> 
                        <div class="col-md-4 col-12">
                            <label>Importe</label><br>
                            $<b style="font-size:20px; margin-top:10px" id="import">0</b>
                        </div> 
               </div>

               </div>` ,
               confirmButtonText: "Agregar",
               cancelButtonText: "Cancelar",
               showCancelButton: true,
               didOpen: function(){


                $("#monto_extra").keyup(function(e){
                    monto_ext = $("#monto_extra").val()
                    cant = $("#cantidad").val()

                    imp = monto_ext * cant;
                    $("#import").text(imp);
                })

                $("#cantidad").keyup(function(e){
                    monto_ext = $("#monto_extra").val()
                    cant = $("#cantidad").val()

                    imp = monto_ext * cant;
                    $("#import").text(imp);
                })
               }
    }).then(function(response) {

        if(response.isConfirmed){
           
            descripcion = $("#descripcion").val();
    
            $.ajax({
                type: "POST",
                url: "../servidor/historial/agregar-costo.php",
                data: {"monto_ext": monto_ext, "cant": cant, "descripcion": descripcion, "id": id},
                dataType: "JSON",
                success: function (response) {
                    
                    if(response == 1){
                        Swal.fire({
                            icon:"success",
                            html: "<b>Actualizado correctamente</b>",
                            
                        })
                    }else{
                        Swal.fire({
                            icon:"error",
                            html: "<b>Ocurrio un error</b>",
                            
                        })
                    }
                    
    
                }
            });
        }

       

    })
}

function cambiarSeleccionarProducto(){
   if($("#buscador-select").val() == "inventario"){
       $("#area-producto").html(`
       <div class="col-12 col-md-12">
            <label for="cant">Busca un clima</label>
            <select name="buscador" class="form-control" id="select-clima" onchange="cambiarSeleccionarProducto()">
            </select>
        </div>
       `)

       applySelect2()
   }
}

function applySelect2(){

    producto = $("#select-clima")
    producto.select2({
        placeholder: "Producto",
        theme: "bootstrap-5",
        height:"20px",
        ajax: {
            url: "../servidor/nueva-orden/buscar-productos.php",
            type: "post",
            dataType: 'json',
            delay: 250,
    
            data: function (params) {
             return {
                
               input: params.term // search term
               
             };
            },
            processResults: function (data) {
                return {
                   results: data
                }; 
              },
           
            cache: true
    
        },
        language:  {
    
            inputTooShort: function () {
                return "Busca un producto...";
              },
              
            noResults: function() {
        
              return "Sin resultados";        
            },
            searching: function() {
        
              return "Buscando..";
            }
          },
    
          templateResult: formatResultProducto,
          templateSelection: formatsSelection
    
    });
    
    
    
    producto.on('select2:select', function(selection){
    
      let repo = selection.params.data
      
    
          formatSelectionP(repo)
       
    
    })
    
    function formatsSelection(repo){
    
      
      if(sucursal_usuario == repo.sucursal){
      let label =  repo.descripcion;
     
      return label;
      }else{
        
      }
    }
    
    function formatResultProducto(repo){
    
    
        if (repo.loading) {
            return repo.text;
          }
    
          let tipo = $("#tipo").val();
          if(tipo == "1"){
            price = repo.precio
          }else if(tipo == "2"){
            price = repo.precio_con_inst
          }
    
          if(repo.id !== ""){
    
            if(repo.categoria == "producto"){
              if(repo.sucursal == "1"){
                sucursal_name = "AireExpress"
           }else if(repo.sucursal == "2"){
                sucursal_name = "ServiClima"
           }
    
     
           var $container = $(`
               <div class="row">
                   <div class="col-12 col-md-12">
                       <div>${repo.descripcion}</div>
                   </div>
                   <div class="col-12 col-md-12 mt-1" style="font-size:12px;">
                       <div><b>Precio:</b>${price} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo.stock}</div>
                   </div>
               </div>
           `
             //  "<span id='"+repo.id+"'>"+ repo.marca +" "+ repo.modelo + " " + repo.tonelaje + "</span>"
           );
    
            }else if(repo.categoria == "serie"){
             
              
                if(repo[6].sucursal == "1"){
                  sucursal_name = "AireExpress"
             }else if(repo[6].sucursal == "2"){
                  sucursal_name = "ServiClima"
             }
    
             $container = $(`
             <div class="row">
                 <div class="col-12 col-md-12">
                     <div>${repo[6].marca} ${repo[6].modelo} ${repo[6].tonelaje}</div>
                 </div>
                 <div class="col-12 col-md-6 mt-1" style="font-size:12px;">
                     <div><b>Costo:</b>${repo[6].precio} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo[6].stock}</div>
                 </div>
                 <div class="col-12 col-md-6 mt-1" style="font-size:12px;">
                     <div><b>NS Condensador:</b>${repo[2]} <div><b>NS Evaporizador:</b>${repo[3]}
                 </div>
             </div>
         `
           //  "<span id='"+repo.id+"'>"+ repo.marca +" "+ repo.modelo + " " + repo.tonelaje + "</span>"
         );
    
          }
    
            
          }else{
              $container = "";
          }
    
            return $container;
    
    }
    
    
    function formatSelectionP(repo) {
    
      
      if(sucursal_usuario == repo.sucursal){
    
      setPantallaCargando()  
      let tipo = $("#tipo").val()
      if(tipo == "1"){
        price = repo.precio
      }else if(tipo == "2"){
        price = repo.precio_con_inst
      }
      
      setearSeries(repo.id);
      $("#precio").val(price)
      $("#datos-btn").attr("id_producto", repo.id)
      $("#datos-btn").attr("producto_id", repo.producto_id)
      $("#datos-btn").attr("serie_condensador", repo.serie_condensador)
      $("#datos-btn").attr("serie_evaporizador", repo.serie_evaporizador)
      $("#datos-btn").attr("fecha_compra", repo.fecha_compra)
    
      quitarLoad()
    
    
      }else{
    
        Toast.fire({
          icon: 'error',
          title: 'Este producto no pertenece a tu sucursal'
        });
        
        $("#lista-series").empty().append(`
                        <div class="list-group-item list-group-item-action" aria-current="true">
                            <div class="row">
                                <div class="col-12 col-md-12">Sin datos</div>
                            </div>
                        </div>
                `)
    
      }
    
      
    
      
    }
    
    
    function setearSeries(id_producto){
    
    
        let tabla_ref = "series"
        let indicador = "producto_id";
        $.ajax({
            type: "POST",
            url: "../servidor/inventario/traer-datos-en-base-uno.php",
            data: { id: id_producto, tabla: tabla_ref, indicador: indicador },
            dataType: "JSON",
            success: function (response) {
              if (response.status == true) {
    
                  let array_dataset = response.data.map(function (item) {
                  let array_item = Object.values(item);
                  return array_item;
    
                });
    
                counter = 1;
                $("#lista-series").empty();
    
    
                
                array_dataset.forEach(element => {
    
                  if(element[6] == "Activo"){
                    
                    $.ajax({
                      type: "POST",
                      url: "../servidor/nueva-orden/comprobar-series-preventa.php",
                      data: {"id_serie": element[0]},
                      
                      success: function (response2) {
                       
                        if(response2 == 1){
      
                          $("#lista-series").append(`
                          <div class="list-group-item list-group-item-action" aria-current="true">
                              <div class="row">
                                  <div class="col-12 col-md-1">${element[0]}</div>
                                  <div class="col-12 col-md-2">${element[1]}</div>
                                  <div class="col-12 col-md-3">${element[2]}</div>
                                  <div class="col-12 col-md-3">${element[3]}</div>
                                  <div class="col-12 col-md-3">
                                      <input class="form-check-input" type="checkbox" value="${element[0]}" id="${element[0]}">
                                  </div>
                              </div>
                          </div>
                  `)
                        }else if(response2 == 0){
                          $("#lista-series").append(`
                          <div class="list-group-item list-group-item-action disabled" aria-disabled="true" style="background-color:whitesmoke">
                              <div class="row">
                                  <div class="col-12 col-md-1">${element[0]}</div>
                                  <div class="col-12 col-md-2">${element[1]}</div>
                                  <div class="col-12 col-md-3">${element[2]}</div>
                                  <div class="col-12 col-md-3">${element[3]}</div>
                                  <div class="col-12 col-md-3">
                                      <input class="form-check-input" type="checkbox" value="${element[0]}" id="${element[0]}">
                                  </div>
                              </div>
                          </div>
                  `)
                        }
      
                      }
                    });
    
                  }  //Porgramar un else para los modelos con series totalmente vendidas
                       
                 counter++;
                });
                /* tableDestroy();
                tableInit(array_dataset); */
              }
            },
          });
    
      }
    
    
    function agregarProductoAPreventa(){
     
      
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
          url: "../servidor/nueva-orden/agregar-preventa.php",
          data: { id: id_producto, series: valoresSeries, precio: precio, categoria: categoria},
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

}
