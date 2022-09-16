function cambiarImagen(image_name, id_producto, categoria){

    
    Swal.fire({ 
        title: '',
        text: 'Imagen del producto, puedes cambiarla',
        imageUrl: 'img/productos/climas/'+ image_name + '.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Imagen del producto',
        confirmButtonText: 'Cambiar imagen'
      }).then(function(response){
        if(response.isConfirmed){
            window.location.href = "cambiar_imagen.php?id_producto="+ id_producto+"&categoria="+ categoria;
        }
      })

}


/* let id_prod = getParameterByName("id_producto");
$.ajax({
  type: "POST",
  url: "../servidor/inventario/traer-producto.php",
  data: {id: id_prod},
  dataType: "JSON",
  success: function (response) {
    name_p = response.data.codigo;
    $("#name_p").attr("name", name_p);
  }
}); */



/* 
Dropzone.options.myGreatDropzone = { // camelized version of the `id`
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    maxFiles: 5,
    acceptedFiles: ".jpg, .jpeg",
    addRemoveLinks: true,
    chunksUploaded: function (file, done) {
      console.log("OKKK");
      done();
    },
  };
  
  
  Dropzone.options.filedrop = {
    init: function () {
      this.on("complete", function (file) {
        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
          Toast.fire({
            icon: 'info',
            title: 'Se subio algo'
          })
        }
      });
    }
  }; */

 

 


  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
  }

