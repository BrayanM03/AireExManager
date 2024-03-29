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

    <title>Token | AireEx manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link href="css/estilos-agregar-producto.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />
    <link href="../vendor/nice-select/css/nice-select.css">
    <link href="../vendor/nice-select/css/style.css">
    <style>
        .select2-container .select2-selection--single {
            height: 20px !important;
        }

        .select2-container .select2-selection--single .select2-selection__rendered {
            padding: 0 0 0 8px !important;
        }

        .select2 {
            width: 100% !important;
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
                <div class="container-fluid" id="main-content">

                <div class="row mb-3 justify-content-center">
                    <div class="col-12 col-md-5 text-center card p-4">

                <div class="titulo-inventario">
                         <h5 style="margin: 10px 0px;"><b>Generar token</b></h5>
                         <p style="color: gray;">Click en generar para generar un nuevo token de seguridad para cambiar el precio de un producto o servicio en una venta o cotización.</p>
                         <div class="tokens">
                         <p style="color: gray;">El token actual es: </br>
                         <span id="token-actual" style="font-size:20px;"><b>0000</b></span>
                         </p> 
                         </div> 
                        </div>
                        
                      <div class="botones">
                                    <a href="#" class="btn btn-success btn-icon-split"  onclick="random();">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-check-circle"></i>
                                        </span>
                                        <span class="text">Generar Token</span>
                                    </a>
                                    
                      </div>

                      </div>
                      </div>

                <!-- <div class="row mb-3 justify-content-center">
                    <div class="col-12 col-md-5 text-center">
                        Para generar un nuevo token da click en el botón generar
                    </div>
                </div>
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-5 text-center">
                            <div class="card p-5">
                                <div class="row justify-content-center">
                                    <div class="col-12 col-md-5 text-center">
                                        <b>Token</b><br>
                                        <h2><b>8565</b></h2>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center">
                                    <div class="col-12 col-md-5 text-center">
                                       <div class="btn btn-success">
                                            Generar
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

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
    <script src="../vendor/nice-select/js/jquery.nice-select.min.js"></script>

    <!-- Mis scripts -->
    <script src="js/configuracion/token.js"></script>
    <script src="js/configuracion/configuraciones.js"></script>
</body>

</html>