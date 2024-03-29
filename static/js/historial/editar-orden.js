function setTablaDetalles(){
  id_orden = obtenerParametroGet("id");
$.ajax({
    type: "POST",
    url: "../servidor/historial/traer-dato-orden.php",
    data: {"id_orden": id_orden},
    dataType: "JSON",
    success: function (response) { 
      
       $("#nombre").val(response["data"].cliente)
       $("#fecha").val(response["data"].fecha_inicio)
       $("#tipo").val(response["data"].tipo)
       $("#total_orden").val(response["data"].total)
       $("#folio").text(response["data"].id)
       $("#direccion").text(response["data"].direccion)

       let detalle = response["data"].detalle.data;

       $("#lista-detalles").empty()
       cont = 1;
       detalle.forEach(element => {
        $("#lista-detalles").append( 
             `<a href="#" class="list-group-item list-group-item-action text-center">
             <div class="row mt-2">
                 <div class="col-12 col-md-1">${cont}</div>
                 <div class="col-12 col-md-4">${element.descripcion}</div>
                 <div class="col-12 col-md-1">${element.cantidad}</div>
                 <div class="col-12 col-md-2">${element.precio_unitario}</div>
                 <div class="col-12 col-md-2">${element.importe}</div>
                 <div class="col-12 col-md-2"> <div class="btn btn-danger" onclick="eliminarDetalle(${element.id})"><i class="fa-solid fa-trash"></i></div></div>
             </div>
             </div>`
        )
        cont++; 
       });

       
    }
});
}

setTablaDetalles()

function obtenerParametroGet(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function changeMetodoPago(){
   
 
    
    if($("#metodo-pago").val() == "Tarjeta"){
      Swal.fire({
        icon: "question",
        text: "Elige el tipo de tarjeta",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Debito",
        denyButtonText: "Credito",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then((result) => {
        if(result.isConfirmed){
              $("#metodo-pago").attr("tipo","Debito");
              $("#label-comision").text("tarjeta debito(1.6%):");
              price = $("#precio").val() == "" ? 0 : $("#precio").val();
              price =  parseFloat(price)
              if($("#buscador-select").val() != "inventario"){

                cantidad = $("#cantidad").val()
                net = cantidad * price;
                comisi = ((net*1.6)/100);
              $("#comision").val(comisi);
              }else{
                console.log("Hola");
                setComision()
              }
              
        }else if(result.isDenied){
              $("#metodo-pago").attr("tipo","Credito");
              $("#label-comision").text("tarjeta credito(3%):");
              price = $("#precio").val() == "" ? 0 : $("#precio").val();
              price = parseFloat(price)
              
              if($("#buscador-select").val() != "inventario"){

                cantidad = $("#cantidad").val()
                net = cantidad * price;
                comisi = ((net*3)/100);
              $("#comision").val(comisi);
              }else{
                
                setComision()
              }

        }else{
          $("#metodo-pago").attr("tipo","");
          $("#label-comision").text("");
          $("#comision").val(0);
        }})
    }else{
      $("#metodo-pago").attr("tipo","");
      $("#label-comision").text("");
      $("#comision").val(0);

    }
  
}


  
  