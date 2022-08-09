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
       
       $("#folio").text(response["data"].id)

       let detalle = response["data"].detalle.data;

       $("#lista-detalles").empty()
       cont = 1;
       detalle.forEach(element => {
        $("#lista-detalles").append(
             `<div class="row mt-2">
                 <div class="col-12 col-md-1">${cont}</div>
                 <div class="col-12 col-md-4">${element.descripcion}</div>
                 <div class="col-12 col-md-1">${element.cantidad}</div>
                 <div class="col-12 col-md-2">${element.precio_unitario}</div>
                 <div class="col-12 col-md-2">${element.importe}</div>
                 <div class="col-12 col-md-2"> <div class="btn btn-danger" onclick="eliminarDetalle(${element.id})"><i class="fa-solid fa-trash"></i></div></div>
             </div>`
        )
        cont++;
       });

       
    }
});

function obtenerParametroGet(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  