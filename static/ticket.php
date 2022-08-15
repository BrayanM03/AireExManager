<?php

include "../servidor/database/conexion.php";
date_default_timezone_set('America/Matamoros');

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link href="css/app.css" rel="stylesheet">
    <title>Ticket salida | Aireexpress manager</title>
</head>
<body>
    <div class="container mt-5" style="border: 1px dashed #c3c3c3; padding:15px; border-radius: 8px">

    <div class="row mb-2">
        <div class="col-12 col-md-12 text-end">
            <h5 class="card-title mb-0" id="title-card">Ticket de salida #<?php echo $_GET['id'] ?></h5>
        </div>

    </div>


    <?php
               
                $select = "SELECT * FROM salidas WHERE id = ?";
                $re = $con->prepare($select);
                $re->execute([$_GET['id']]);

                $ind = 1;
                while($row = $re->fetch(PDO::FETCH_OBJ)){
                    
                    echo   '
                    
                    <div class="row aling-items-start">

    <div class="col-12 col-md-3">
    <img src="img/logo.png" alt="Charles Hall" class="img-fluid" style="width: 130px; padding-left:17px;" width="100" height="100" />
    </div>

    <div class="col-12 col-md-9">
        <div class="row mt-5 mb-4">
            

            <div class="col-12 col-md-6 text-start">
                <h5 class="card-title mb-0" id="title-card">Numero de empleado: </h5>
                <label for="">'. $row->no_empleado .'</label>
            </div>
        </div>
    </div>
    

    </div>

    

    

    <div class="row  mb-5 justify-content-end">
        <div class="col-12 col-md-2 text-start">
            <h5 class="card-title mb-0" id="title-card">Area: </h5>
            <label for="">'. $row->area .'</label>
        </div>
        <div class="col-12 col-md-2 text-start">
            <h5 class="card-title mb-0" id="title-card">Fecha: </h5>
            <label for="">'. $row->fecha .'</label>
        </div>
        <div class="col-12 col-md-2 text-start">
            <h5 class="card-title mb-0" id="title-card">Hora: </h5>
            <label for="">'. $row->hora .'</label>
        </div>

        <div class="col-12 col-md-3 text-center">
            <h5 class="card-title mb-0" id="title-card">Usuario que registró: </h5>
            <label for="">'. $row->usuario_nombre .'</label>
        </div>
    </div>
                    
                    ';
                    $ind++;

                }

                        ?>



    

    <div class="row mb-4 justify-content-center">

    <div class="col-12 col-md-10">

    <ul class="list-group">
        <li class="list-group-item active" aria-current="true">
            <div class="row">
                <div class="col-2 col-md-2">#</div>
                <div class="col-3 col-md-3">Codigo</div>
                <div class="col-5 col-md-5">Concepto</div>
                <div class="col-2 col-md-2">Cantidad</div>
            </div>
        </li>
        <?php
                session_start();
                $contar = "SELECT * FROM detalle_salida WHERE salida_id = ?";
                $re = $con->prepare($contar);
                $re->execute([$_GET['id']]);

                $contador = 1;
                while($row = $re->fetch(PDO::FETCH_OBJ)){
                    
                    echo   '<li class="list-group-item">
                                <div class="row">
                                    <div class="col-2 col-md-2">'. $contador .'</div>
                                    <div class="col-3 col-md-3">'. $row->codigo .'</div>
                                    <div class="col-5 col-md-5">'. $row->concepto .'</div>
                                    <div class="col-2 col-md-2">'. $row->cantidad .'</div>
                                </div>
                            </li>';
                    $contador++;

                }

                        ?>
      
    </ul>

    </div>
        
    </div>
    </div>
   

</body>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="js/app.js"></script>
</html>