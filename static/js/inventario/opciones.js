
 main_content = $('#main-content');


function clickNuevoProducto(){

  main_content.empty().append(`
    <div class="row mt-5 justify-content-center">
        <div class="col-md-6 col-12 text-center">
           <img src="./img/loading.gif">
        </div>
    </div>
  `)

    main_content.empty().load(`vistas/inventario/nuevo-aire.php`, {
        postdata: false,
        proveedor : "",
        tonelaje: "",
        id_sucursal: "1",
        modelo : "",
        marca : "",
        cantidad : "",
        costo : "",
        precio : "",
        precio_con_inst : "",
      descripcion: ""});

    
}

function clickEditarProducto(e) {

    let producto_id = getParameterByName("id_product");
    let sucursal_id = getParameterByName("store_id");
    let name = getParameterByName("name");

    $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: {"id": producto_id, "tabla": "inventario", "indicador": "id"},
        dataType: "JSON",
        success: function (response) {

            response['data'].forEach(element => {
                data = {proveedor : element.proveedor,
                id_producto: producto_id,
                id_sucursal: sucursal_id,     
                tonelaje: element.tonelaje,
                modelo : element.modelo,
                marca : element.marca,
                cantidad : element.stock,
                costo : element.costo,
                precio : element.precio,
                precio_con_inst : element.precio_con_inst,
                descripcion : element.descripcion}

                
            });
            
            console.log(sucursal_id);

            main_content.empty().load(`vistas/inventario/actualizar-datos-producto.php?store_id=${sucursal_id}&name=${name}`, data
            );
        }
    });
  
           
}

function clickagregarSeries(){
   
    main_content.empty().load(`vistas/inventario/ingresar-producto-existente.php`, function() {
        
        agregarEventos()
      });

}

function clickEditarSeries(){
   
    let producto_id = getParameterByName("id_product");
    let id_sucursal = getParameterByName("store_id");

    main_content.empty().load(`vistas/inventario/ingresar-producto-existente.php`, function() {
        
       $("#backbtn_area").empty().append(`
       
       <div class="btn" onclick="RegresarAtras(3)">
       <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
       </div>

       `);

      let indicador = "sucursal";
      let tabla_ref = "inventario";
      $("#sucursal").val(id_sucursal).prop("disabled", true)

      $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: { id: id_sucursal, tabla: tabla_ref, indicador: indicador },
        dataType: "JSON",
        success: function (response) {
          if (response.status == true) {
            $("#producto").prop("disabled", false);
            $("#producto")
              .empty()
              .append(`<option value="null">Selecciona un producto</select>`);
        
            response.data.forEach((element) => {
              $("#producto").append(`
                            <option value="${element.id}">${element.marca} ${element.modelo}</option>
                        `);
            });

            $("#producto").val(producto_id).prop("disabled", true)
          } else {
             setearForm(1);
          }
        },
      });

      let indicador2 = "producto_id";
      let tabla_ref2 = "series";
      $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: { id: producto_id, tabla: tabla_ref2, indicador: indicador2 },
        dataType: "JSON",
        success: function (response) {
          if (response.status == true) {
            $("#serie-cond").prop("disabled", false);
            $("#serie-evap").prop("disabled", false);
            $("#btn-add-serie").removeClass("disabled")

            let array_dataset = response.data.map(function (item) {
              let array_item = Object.values(item);
              return array_item;
            });

            array_dataset = array_dataset.filter(function(val) {
              console.log(val[6]);
              if(val[6] == "Activo"){
                return val; 
              }
              
          });

            tableInit(array_dataset);
          }
        },
      });

      
      });

}

function RegresarAtras(vista){
 
    let id_product = getParameterByName("id_product");
    let sucursal = getParameterByName("store_id");
    let name = getParameterByName("name");

    if(vista == 1){
        main_content.empty().load(`vistas/inventario/seleccionar-tipo-agregar.php?store_id=${sucursal}&name=${name}`);
    }else if(vista == 2){

        main_content.empty().load(`vistas/inventario/nuevo-aire.php`, {
              postdata: true,
              proveedor : datosForm.get("proveedor"),
              tonelaje: datosForm.get("tonelaje"),
              modelo : datosForm.get("modelo"),
              marca : datosForm.get("marca"),
              cantidad : datosForm.get("cantidad"),
              costo : datosForm.get("costo"),
              precio : datosForm.get("precio"),
              precio_con_inst : datosForm.get("precio_con_inst"),
              descripcion : datosForm.get("descripcion"),
              id_sucursal: datosForm.get("sucursal"),
        });

       
    }else if(3){ //vista desde el editor de productos
        main_content.empty().load(`vistas/inventario/seleccionar-opcion-edicion.php?store_id=${sucursal}&id_product=${id_product}&name=${name}`);
    }
    
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


