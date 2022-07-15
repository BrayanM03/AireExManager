$("#tipo").on("change", function() {
    
    if($(this).val() == 1){
        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
        `)
    }else
    if($(this).val() == 2){
        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
            <option value="servicios">Servicio</option>
        `)
    }else
    if($(this).val() == 3){
        $("#buscador-select").empty().append(`
            <option value="servicios">Servicio</option>
        `)

        busquedaServicios()

    }

})