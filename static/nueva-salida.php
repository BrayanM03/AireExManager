<?php
session_start();

 if (empty($_SESSION["id"])) {
    header("Location:login.php");
} 
date_default_timezone_set('America/Matamoros');
?> 
<!DOCTYPE html>
<html lang="es">

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

    <title>Inventario clima | AireEx manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.css" integrity="sha512-oe8OpYjBaDWPt2VmSFR+qYOdnTjeV9QPLJUeqZyprDEQvQLJ9C5PCFclxwNuvb/GQgQngdCXzKSFltuHD3eCxA==" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.dataTables.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />
	
    <!-- Librerias del plugin input file bootstrap -->
    <!-- <link href="vendor/bootstrap-fileinput-master/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="vendor/bootstrap-fileinput-master/themes/explorer-fa5/theme.css" media="all" rel="stylesheet" type="text/css"/>
    -->
    <style>
           .select2 {
width:100%!important;
}

.loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255, 0.7);;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: 1s all;
            /* opacity: 0; */
        }
        .loading.show {
            opacity: 1;
        }
        .loading .spin {
            border: 3px solid hsla(185, 100%, 62%, 0.2);
            border-top-color: #3cefff;
            border-radius: 50%;
            width: 3em;
            height: 3em;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }    
        
        
        
.dotting {
display: inline-block; width: 10px; min-height: 2px;
padding-right: 2px;
border-left: 2px solid currentColor; border-right: 2px solid currentColor;
background-color: currentColor; background-clip: content-box;
box-sizing: border-box;
-webkit-animation: dot 2s infinite step-start both;
animation: dot 2s infinite step-start both;
/* *zoom: expression(this.innerHTML = '...'); */ /* IE7 */
}
.dotting:before { content: '...'; } /* IE8 */
.dotting::before { content: ''; }
:root .dotting { margin-left: 2px; padding-left: 2px; } /* IE9+ */
 
@-webkit-keyframes dot {
25% { border-color: transparent; background-color: transparent; }
50% { border-right-color: transparent; background-color: transparent; }
75% { border-right-color: transparent; }
}
@keyframes dot {
25% { border-color: transparent; background-color: transparent; }
50% { border-right-color: transparent; background-color: transparent; }
75% { border-right-color: transparent; }
}
    </style>
</head>

<body>
<div id="area-loading">
    <div class="loading show">
        <div style="display:flex; flex-direction:column; justify-content:center;">
            <div class="spin"></div><br>
            <span><b>Cargando...<span class = "dotting"> </span></b></span>
        </div>
    </div>
  </div>

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
                        <div class="col-12 col-md-6">
                            <h1 class="h3 mb-3">Registrar salida de material</h1>
                        </div>
                    </div>



                    <div class="row">
                        <div class="col-12">
                          
                               
                                
                                            <?php include 'vistas/salidas/nueva-salida.php'?>
                                      
                              
                           
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

   <!--  <script src="vendor/bootstrap-fileinput-master/js/plugins/buffer.min.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/plugins/filetype.min.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/plugins/piexif.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/plugins/sortable.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/fileinput.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/locales/fr.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/js/locales/es.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/themes/gly/theme.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/themes/fa5/theme.js" type="text/javascript"></script>
    <script src="vendor/bootstrap-fileinput-master/themes/explorer-fa5/theme.js" type="text/javascript"></script>
    <script>$.fn.fileinput.defaults.theme = 'gly';</script>
     -->
    <script src="https://kit.fontawesome.com/31a28ea63e.js" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <!-- Mis scripts -->
    <!-- <script src="js/inventario/agregar-item.js"></script> -->
    <script src="js/salidas/busqueda.js"></script>
    <script src="js/salidas/agregar-pre.js"></script>
    <script src="js/salidas/nueva-salida.js"></script>
    <script src="js/salidas/tabla-presalida.js"></script>
    <script src="js/configuracion/configuraciones.js"></script>
    <!-- <script src="js/clientes/traer-lista.js"></script>
    <script src="js/clientes/eliminar-cliente.js"></script>
    
 -->
 <script>
    $(window).on("load", quitarLoad);
    function quitarLoad() { 
 
 $(".loading").removeClass("show");
 setTimeout(removeLoad, 1300)
}function removeLoad(){
  $(".loading").remove();
 };
     
 </script>
</body>

</html>