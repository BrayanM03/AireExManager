
let categoria = getParameterByName("categoria")
let id_producto = getParameterByName("id_producto")

$("#aP0").css("display", "none")
$("#aP1").css("display", "none")
$("#aP2").css("display", "none")
$("#aP3").css("display", "none")
$("#aP4").css("display", "none")


function cargarImagenes(){
    $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-imagen.php",
        data: {"categoria": categoria, "id_producto": id_producto},
        dataType: "JSON",
        success: function (response) {
            var count = 0;
            let timestamp = new Date().valueOf()

            let arreglo = ["1", "2", "3", "4", "5"]
            arreglo.forEach(element => {
                $("#P"+element).attr("src", "img/productos/" + categoria + "/NA.jpg?t="+timestamp)
                $("#aP"+element).css("display", "none")

            });

            response.files.forEach(element => {
                let path = "img/productos/" + categoria + "/P" + id_producto + "/" + element + "?t="+timestamp;
                let tag = element.substring(1,2)
               
                $("#P"+tag).attr("src", path)
                $("#aP"+tag).css("display", "block")
                count++;
            })
            
            }
        })
}


cargarImagenes()

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  function eliminarImagen(name_file) { 
    $.ajax({
        type: "post",
        url: "../servidor/inventario/eliminar-imagen.php",
        data: {"name_file": name_file, "categoria": categoria, "id_producto": id_producto},
        dataType: "JSON",
        success: function (response) {
            let estatus = response.status
            let mensaje = response.message

        Toast.fire({
            icon: estatus,
            title: mensaje
          })  

          cargarImagenes()

        }
    });

   }