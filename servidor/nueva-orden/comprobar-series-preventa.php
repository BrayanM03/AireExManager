<?php


    session_start();
    include '../database/conexion.php';
    
    date_default_timezone_set("America/Matamoros");

    $id_serie = $_POST['id_serie'];

    $consulta = "SELECT COUNT(*) FROM detalle_series_tmp WHERE serie_id = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_serie]); 
    $total = $res->fetchColumn();

    if($total > 0){
        print_r(0);
    }else{
        print_r(1);
    }

    

