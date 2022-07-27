<?php


?>

<!DOCTYPE html>  
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descarga</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost&display=swap" rel="stylesheet">

  <!--   <img src="../../static/img/logo.jpg" id="logo"> -->
  <style>
    
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
            font-family: 'Jost', sans-serif
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
            <span class="text-center"><b>Descargando<span class = "dotting"> </span></b></span>
        </div>
    </div>
  </div>

</body>
<script src="https://kit.fontawesome.com/31a28ea63e.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
<script src="https://unpkg.com/jspdf-autotable@3.5.22/dist/jspdf.plugin.autotable.js"></script>

<script src="../../static/js/reportes/logo.js"></script>
<script src="../../static/js/reportes/checked.js"></script>
<script src="../../static/js/reportes/unchecked.js"></script>
<script src="../../static/js/reportes/fuente.js"></script>
<script src="../../static/js/reportes/plantilla-reporte-cotizacion-pdf.js"></script>
</script>
</html>


