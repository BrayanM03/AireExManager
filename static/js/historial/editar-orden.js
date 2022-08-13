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
    console.log("hola");
    console.log($("#metodo-pago").val());
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
              price = $("#precio").val() == "" ? 0 : $("#precio").val();
              price =  parseFloat(price)
              comisi = ((price*1.6)/100);
             $("#comision").val(comisi);
        }else if(result.isDenied){
              $("#metodo-pago").attr("tipo","Credito");
              price = $("#precio").val() == "" ? 0 : $("#precio").val();
              price = parseFloat(price)
              comisi = ((price*3)/100);
             $("#comision").val(comisi);

        }else{
          $("#metodo-pago").attr("tipo","");
             
             $("#comision").val(0);
        }})
    }else{
      $("#metodo-pago").attr("tipo","");

    }
  }

  $("#cantidad").keyup(function(){

    let tipo_tarjeta = $("#metodo-pago").attr("tipo")
  if(tipo_tarjeta == "credito"){
    comisi = ((price*3)/100)
    $("#comision").val(comisi)
  }else if(tipo_tarjeta == "debito"){
    comisi = ((price*1.6)/100)
    $("#comision").val(comisi)
  }else{
    $("#comision").val(0)
  }
  })
  
  