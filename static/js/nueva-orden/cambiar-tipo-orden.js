 
$("#tipo").on("change", function() {
    let id_prod = $("#datos-btn").attr("id_producto")
    
    if($(this).val() == 1){
        $("#verificaciones_area").empty();
        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
        `)
        setearSeries(id_prod)
    }else
    if($(this).val() == 2){
        $("#verificaciones_area").empty().append(`
        <div class="row mb-2 justify-content-center">
        <div class="col-12 col-md-4 text-start">
        <label for="pago_domicilio">Pago en domicilio:</label>
        <input class="form-check-input" id="pago_domicilio"  type="checkbox" >
        </div>
        <div class="col-12 col-md-4 text-start">
        <label for="pago_sucursal">Pago en sucursal:</label>
        <input class="form-check-input" id="pago_sucursal"  type="checkbox" >
        </div>
        </div>

        <div class="row mb-3 justify-content-center">
            <div class="col-12 col-md-4 text-start">
            <label for="verificar_electrico">Verificar electrico:</label>
            <input class="form-check-input" id="verificar_electrico"  type="checkbox" >
            </div>
            <div class="col-12 col-md-4 text-start">
            <label for="tiene_electrico">Cliente ya cuenta con electrico:</label>
            <input class="form-check-input" id="tiene_electrico"  type="checkbox" >
            </div>
            </div>
        </div>

        <div class="row mb-2 justify-content-center">
            <div class="col-12 col-md-2 text-start">
                <label for="cantidad_personal">Cantidad personal:</label>
                <input class="form-control" id="cantidad_personal" type="number" placeholder="0">
            </div>
            <div class="col-12 col-md-2 text-start">
                <label for="tiempo_horas">Tiempo en horas:</label>
                <input class="form-control" id="tiempo_horas" type="number" placeholder="0">
            </div>
            <div class="col-12 col-md-4 text-start">
                <label for="nombre_personal">Nombre personal:</label>
                <textarea class="form-control" id="nombre_personal" type="text" placeholder="Escribe el nombre de los tecnicos"></textarea>
            </div>
        </div>
        
        `);

        $("#buscador-select").empty().append(`
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refacción</option>
            <option value="servicios">Servicio</option>
        `)
    }else
    if($(this).val() == 3){
        $("#verificaciones_area").empty().append(`
        <div class="row mb-3 justify-content-center">
        <div class="col-12 col-md-4 text-start">
        <label for="pago_domicilio">Pago en domicilio:</label>
        <input class="form-check-input" id="pago_domicilio"  type="checkbox" >
        </div>
        <div class="col-12 col-md-4 text-start">
        <label for="pago_sucursal">Pago en sucursal:</label>
        <input class="form-check-input" id="pago_sucursal"  type="checkbox" >
        </div>
        </div>

        
        <div class="row mb-2 justify-content-center">
            <div class="col-12 col-md-2 text-start">
                <label for="cantidad_personal">Cantidad personal:</label>
                <input class="form-control" id="cantidad_personal" type="number" placeholder="0">
            </div>
            <div class="col-12 col-md-2 text-start">
                <label for="tiempo_horas">Tiempo en horas:</label>
                <input class="form-control" id="tiempo_horas" type="number" placeholder="0">
            </div>
            <div class="col-12 col-md-4 text-start">
                <label for="nombre_personal">Nombre personal:</label>
                <textarea class="form-control" id="nombre_personal" type="text" placeholder="Escribe el nombre de los tecnicos"></textarea>
            </div>
        </div>
        `);

        $("#buscador-select").empty().append(`
            <option value="servicios">Servicio</option>
        `)

        busquedaServicios() 

    }

})