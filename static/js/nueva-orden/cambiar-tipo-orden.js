function cambiarSeleccionarProducto() { 
    let busqueda = $("#buscador-select").val()
    
    if(busqueda == "refacciones"){

        $("#area-seleccion-producto").empty().append(`<div class="card mt-3 mb-3 border">
        <div class="card-header" style="background-color:#eff5f3">
            <span>Conceptos</span>
            <div class="row mt-2">
                <div class="col-12 col-md-12">
                    <label for="producto"><b>Selecciona una refacción</b></label>
                    <select name="productos" class="form-control" id="refacciones"></select>
                </div>
                
            </div>
            <div class="row justify-content-center">
                <div class="col-12 mt-3 col-md-4 text-center">
                    <b id="precio-label">Precio:</b> 
                    <input type="text" class="form-control" id="precio" placeholder="0">
                </div>
                <div class="col-12 mt-3 col-md-4 text-center">
                    <b id="precio-label">Cantidad:</b> 
                    <input type="text" class="form-control" id="cantidad" placeholder="0">
                </div>
            </div>
        </div>

        <div class="card-body" style="font-size:12px;">


            <div class="row mt-3 justify-content-center">
                <div class="col-12 col-md-3">
                     <div id="datos-btn" class="btn btn-info" onclick="agregarRefaccionAPreventa()">Agregar a la lista</div>
                </div>
            </div>

        </div>
</div>
    `)

    busquedaRefacciones()

    }else if(busqueda == "inventario"){
        $("#area-seleccion-producto").empty().append(`
        <div class="card mt-3 mb-3 border">
        <div class="card-header" style="background-color:#eff5f3">
            <span>Conceptos</span>
            <div class="row mt-2">
                <div class="col-12 col-md-12">
                    <label for="producto"><b>Selecciona un producto</b></label>
                    <select name="productos" class="form-control" id="productos"></select>
                </div>
                
            </div>
            <div class="row justify-content-center">
                <div class="col-12 mt-3 col-md-4 text-center">
                    <b id="precio-label">Precio:</b> 
                    <input type="text" class="form-control" id="precio" placeholder="0">
                </div>
            </div>
        </div>

        <div class="card-body" style="font-size:12px;">

            <div class="row mt-4">
            
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" style="background-color:tomato; color:white" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-1">#</div>
                            <div class="col-12 col-md-2">Fecha compra</div>
                            <div class="col-12 col-md-3">Serie condensador</div>
                            <div class="col-12 col-md-3">Serie evaporizador</div>
                            <div class="col-12 col-md-3">Seleccionar</div>
                        </div>
                    </a>
                    <div id="lista-series">
                        <a href="#" class="list-group-item list-group-item-action">Sin datos</a>
                    </div>
                </div>

            </div>

            <div class="row mt-3 justify-content-center">
                <div class="col-12 col-md-3">
                     <div id="datos-btn" class="btn btn-info" onclick="agregarProductoAPreventa()">Agregar a la lista</div>
                </div>
            </div>

        </div>
</div>
        `)
    }

    busquedaProductos()

   
 }


 function busquedaProductos() {

    let producto = $("#productos");
    let sucursal_usuario = $("#user-data").attr("id_sucursal")


//Select2 clientes
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

 }



 function busquedaRefacciones() {

    let refacciones = $("#refacciones");
    let sucursal_usuario = $("#user-data").attr("id_sucursal")


//Select2 clientes
refacciones.select2({
    placeholder: "Refacciones",
    theme: "bootstrap-5",
    height:"20px",
    ajax: {
        url: "../servidor/nueva-orden/buscar-refacciones.php",
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
            return "Busca una refaccion...";
          },
          
        noResults: function() {
    
          return "Sin resultados";        
        },
        searching: function() {
    
          return "Buscando..";
        }
      },

      templateResult: formatResultRefaccion,
      templateSelection: formatsSelectionRefaccion

});

 }

 function formatsSelectionRefaccion(repo){

  
    console.log(sucursal_usuario);
    if(sucursal_usuario == repo.sucursal){
    let label =  repo.descripcion + " "+ repo.modelo + " " + repo.marca;
    $("#precio").val(repo.precio)
    $("#datos-btn").attr("id_producto", repo.id)
    return label;
    }else{
      
    }
  }
  
  function formatResultRefaccion(repo){
  
  
      if (repo.loading) {
          return repo.text;
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
                     <div>${repo.descripcion} ${repo.modelo} ${repo.marca}</div>
                 </div>
                 <div class="col-12 col-md-12 mt-1" style="font-size:12px;">
                     <div><b>Costo:</b>${repo.precio} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo.stock}</div>
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


  function agregarRefaccionAPreventa(){
    let id_producto = $("#datos-btn").attr("id_producto");
    console.log(id_producto);
    let precio = $("#precio").val();
    let cantidad = $("#cantidad").val();

  
      $.ajax({
        type: "POST",
        url: "../servidor/nueva-orden/agregar-refacccion-preventa.php",
        data: { id: id_producto, precio: precio, cantidad:cantidad },
        dataType: "JSON",
        success: function (response) {
          if(response.status == true){
            Toast.fire({
              icon: 'success',
              title: 'Agregado correctamente'
            });
  
            
            tabla.ajax.reload(null, false)  
            $("#neto").val(response.importe)
          }else if(response.status == false) {
            Toast.fire({
              icon: 'error',
              title: response.mensj
            });
  
            
            tabla.ajax.reload(null, false) 
          }
        }
      
      })
  
    
  }
  
  
