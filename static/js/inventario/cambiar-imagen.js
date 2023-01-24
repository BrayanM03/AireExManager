function cambiarImagen(image_name, id_producto, categoria){

    console.log(image_name);
    Swal.fire({ 
        title: '',
        text: 'Imagen del producto, puedes cambiarla',
        width: '600px',
       /*  imageUrl: urlImage,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Imagen del producto', */
        didOpen: ()=>{
            $.ajax({
              type: "POST",
              url: "../servidor/inventario/imagenes-carrousel.php",
              data: {"id_producto": id_producto, "categoria": categoria},
              dataType: "JSON",
              success: function (response) {
                console.log(response);
                $("#splide__list").empty()
                if(response.files.length > 0){
                  response.files.forEach(element => {

                    if(categoria == "refacciones"){
                  
                        urlImage = "img/productos/refacciones/P" + id_producto +"/" + element 
                      
                    }else{
                        urlImage = "img/productos/climas/P" + id_producto +"/" + element
                  
                    }
  
                    $("#splide__list").append(`
                       <li class="splide__slide"><img src="${urlImage}" alt="imagen_producto"></li>
                    `)

                    $("#splide__list_principal").append(`
                       <li class="splide__slide"><img src="${urlImage}" alt="imagen_producto"></li>
                    `)
                    
  
                  });


                }else{
                  $("#splide__list").append(`
                       <li class="splide__slide"><img src="img/productos/climas/NA.jpg" alt="imagen_producto"></li>
                    `)

                    $("#splide__list_principal").append(`
                       <li class="splide__slide"><img src="img/productos/climas/NA.jpg" alt="imagen_producto"></li>
                    `)
                }
              

                var thumbnails = new Splide( '#thumbnail-carousel', {
                  fixedWidth : 100,
                  fixedHeight: 60,
                  gap        : 10,
                  rewind     : true,
                  pagination : false,
                  isNavigation: true,
                  breakpoints : {
                    600: {
                      fixedWidth : 60,
                      fixedHeight: 44,
                    },
                  },
                })

                var main = new Splide( '#main-carousel', {
                  type      : 'fade',
                  rewind    : true,
                  pagination: false,
                  arrows    : false,
                } );

                main.sync( thumbnails );
                main.mount();
                thumbnails.mount();
              }
            });

            
        },
        html: `
        <div class="container">
        <div class="row">
             <div class="col-12">
                <section class="splide" id="main-carousel" aria-label="Splide Basic HTML Example">
                      <div class="splide__track">
                        <ul class="splide__list" id="splide__list_principal">
                          
                        </ul>
                      </div>
                  </section>
             </div>
        </div>
          <div class="row">
             <div class="col-12">
                <section class="splide" id="thumbnail-carousel" aria-label="Splide Basic HTML Example">
                  <div class="splide__track">
                    <ul class="splide__list" id="splide__list">
                      
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        `,
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

