
 main_content = $('#main-content');


function clickNuevoProducto(){

    main_content.empty().load(`vistas/inventario/nuevo-aire.php`, {
        postdata: false,
        proveedor : "",
        tonelaje: "",
        modelo : "",
        marca : "",
        cantidad : "",
        costo : "",
        precio : ""});
}

function clickEditarProducto(e) {

    let producto_id = getParameterByName("id_product");
    let sucursal_id = getParameterByName("sucursal");

    $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: {"id": producto_id, "tabla": "inventario", "indicador": "id"},
        dataType: "JSON",
        success: function (response) {

            response['data'].forEach(element => {
                data = {proveedor : element.proveedor,
                tonelaje: element.tonelaje,
                modelo : element.modelo,
                marca : element.marca,
                cantidad : element.stock,
                costo : element.costo,
                precio : element.precio}
            });
            console.log(data);
           

            main_content.empty().load(`vistas/inventario/actualizar-datos-producto.php?sucursal=${sucursal_id}&producto=${producto_id}`, data
            );
        }
    });

   
           
}

function clickagregarSeries(){
   
    main_content.empty().load(`vistas/inventario/ingresar-producto-existente.php`, function() {
        
        agregarEventos()
      });
    
    
   

}

function RegresarAtras(vista){
    if(vista == 1){
        main_content.empty().load("vistas/inventario/seleccionar-tipo-agregar.php");
    }else if(vista == 2){

        main_content.empty().load(`vistas/inventario/nuevo-aire.php`, {
              postdata: true,
              proveedor : datosForm.get("proveedor"),
              tonelaje: datosForm.get("tonelaje"),
              modelo : datosForm.get("modelo"),
              marca : datosForm.get("marca"),
              cantidad : datosForm.get("cantidad"),
              costo : datosForm.get("costo"),
              precio : datosForm.get("precio")
        });

       
    }else if(3){ //vista desde el editor de productos
        main_content.empty().load("vistas/inventario/seleccionar-opcion-edicion.php");
    }
    
}


