 
$("#tipo").on("change", function() {
     
    let id_prod = $("#datos-btn").attr("id_producto")
    
    if($(this).val() == 1){

        setPantallaCargando() 
        $("#verificaciones_area").empty();
        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
        `)

 
        busquedaProductos()
        $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12">Sin datos</div>
                        </div>
                    </div>
            `)
        
  quitarLoad()
    }else 
    if($(this).val() == 2){
        setPantallaCargando() 
      

        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
            <option value="servicios">Servicio</option>
        `)
    
        busquedaProductos()
        $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12">Sin datos</div>
                        </div>
                    </div>
            `)
        
  quitarLoad()
    }else
    if($(this).val() == 3){
        setPantallaCargando() 
       

        $("#buscador-select").empty().append(`
            <option value="servicios">Servicio</option>
        `)
  
        busquedaServicios() 
        $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12">Sin datos</div>
                        </div>
                    </div>
            `)
        
  quitarLoad()
      

    }

})