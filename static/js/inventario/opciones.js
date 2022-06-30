
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

function clickagregarSeries(){
   
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

       
    }
    
}


