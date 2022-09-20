<?php
session_start();

if (empty($_SESSION["id"])) {
    header("Location:login.php");
} ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
    <meta name="author" content="AdminKit">
    <meta name="keywords" content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="shortcut icon" href="img/icons/icon-48x48.png" />

    <link rel="canonical" href="https://demo-basic.adminkit.io/pages-blank.html" />

    <title>Cambiar imagen | AireEx manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link href="css/estilos-agregar-producto.css" rel="stylesheet">
    <link href="css/subir-imagen.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />
    <link href="../vendor/nice-select/css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

    <style>
         .dropzone{
        border: 2px dashed #c3c3c3;
        padding: 40px;
       
    }

    .icon i{
        font-size: 3em;
        text-align: center; 
        color: #696767;
        background-color: #dfdddd;
        height: 100px;
        width: 100px;
        margin-bottom: 20px;
        border-radius: 50%;
        padding: 25px 20px; 
    }

    .note{
        color: #40405b;
    }
    </style>
</head>

<body>
    <div class="wrapper">

        <?php
        include "vistas/general/sidebar.php"
        ?>
        <div class="main">
            <?php
            include "vistas/general/navbar.php"
            ?>

        <main class="content">
                <div class="container-fluid p-0">

                    <div class="row mb-2 justify-content-center">
                        <div class="col-12 col-md-6 text-center">
                            <h1 class="h3 mb-3">Subir imagen del <span id="name_p" name="">producto<span></h1>
                        </div>
                    </div>



                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6">
                          
                               
                                
                        <form class="dropzone" enctype="multipart/form-data" action="../servidor/inventario/subir-imagen.php?product_id=<?php echo $_GET["id_producto"];?>&categoria=<?php echo $_GET["categoria"];?>" id="my-great-dropzone">
                            <div class="dz-message">
                                <div class="icon">
                                <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                
                            <h2>Suelta tus archivos aquí</h2>
                            <span class="note">No hay archivos seleccionados, solo puedes agregar maximo 5 fotos</span>
                            </div>
                            <div class="fallback">
                            <input type="file" name="file">
                        </div>
                        </form>
                        
                           
                        </div>
                    </div>

                    <div class="row mt-5 justify-content-between">
                        <div class="col-12 col-md-2 text-center columna-producto align-center" >
                                
                                    <img id="P1" class="imagen-product" src="./img//productos/climas/NA.JPG" style="max-width:130px; border-radius: 6px;" alt="">
                                    <a href="#" id="aP1" onclick="eliminarImagen('P1')">Eliminar</a> 
                        
                        </div>
                        <div class="col-12 col-md-2 text-center columna-producto align-center" >
                                
                                    <img id="P2" class="imagen-product" src="./img//productos/climas/NA.JPG" style="max-width:130px; border-radius: 6px;" alt="">
                                    <a href="#" id="aP2" onclick="eliminarImagen('P2')">Eliminar</a>
                        </div>
                        <div class="col-12 col-md-2 text-center columna-producto align-center" >
                                
                                    <img id="P3" class="imagen-product" src="./img//productos/climas/NA.JPG" style="max-width:130px; border-radius: 6px;" alt="">
                                    <a href="#" id="aP3" onclick="eliminarImagen('P3')">Eliminar</a>
                        </div>
                        <div class="col-12 col-md-2 text-center columna-producto align-center" >
                                
                                    <img id="P4" class="imagen-product" src="./img//productos/climas/NA.JPG" style="max-width:130px; border-radius: 6px;" alt="">
                                    <a href="#" id="aP4" onclick="eliminarImagen('P4')">Eliminar</a>
                        </div>
                        <div class="col-12 col-md-2 text-center columna-producto align-center" >
                               
                                    <img id="P5" class="imagen-product" src="./img//productos/climas/NA.JPG" style="max-width:130px; border-radius: 6px;" alt="">
                                    <a href="#" id="aP5" onclick="eliminarImagen('P5')">Eliminar</a>
                        </div>
                    </div>

                </div>
            </main>

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-muted">
                        <div class="col-6 text-start">
                            <p class="mb-0">
                                <a class="text-muted" href="https://adminkit.io/" target="_blank"><strong>AdminKit</strong></a> &copy;
                            </p>
                        </div>
                        <div class="col-6 text-end">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Support</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Help Center</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Privacy</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="js/app.js"></script>

    <!-- Librerias -->
    <script src="https://kit.fontawesome.com/31a28ea63e.js" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>


    <!-- Mis scripts -->
    <script src="js/configuracion/token.js"></script>
    <script src="js/configuracion/configuraciones.js"></script>
    <script src="js/inventario/traer-datos-imagen.js"></script>
    <script src="js/inventario/cambiar-imagen.js"></script>

    
</body>

<script>

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


Dropzone.options.myGreatDropzone = { // camelized version of the `id`
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 3, // MB
    maxFiles: 5,
    acceptedFiles: ".jpg, .jpeg",
    uploadMultiple: true,
    parallelUploads: 10,
    addRemoveLinks: true,
    dictRemoveFile: "Remover",
    init: function () { 

      this.on("success", function(file, response) {  
       
         let myresponse = jQuery.parseJSON(response)
         let estatus=myresponse.status;   
         let mensaje=myresponse.message;     
  

         console.log("tipo respuesta:"+ typeof(myresponse));

         console.log("respuesta:"+estatus);
         if(estatus != "error") {
            cargarImagenes()
         }
         this.removeFile(file);
    
        Toast.fire({
          icon: estatus,
          title: mensaje
        })  
      });  

    },
  };
  
  Dropzone.options.dictMaxFilesExceeded = "No puedes subir más de una imagen";

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}

</script>

</html>