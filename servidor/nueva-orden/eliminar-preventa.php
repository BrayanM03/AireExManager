<?php


    session_start();
    include '../database/conexion.php';
    
    date_default_timezone_set("America/Matamoros");

    $id_preventa = $_POST['id_preventa'];

    $consulta = "SELECT producto_id FROM detalle_preventa_tmp WHERE id = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_preventa]); 
    $producto_id = $res->fetchColumn();
    $res->closeCursor();

    $consulta = "DELETE FROM detalle_preventa_tmp WHERE id = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_preventa]); 

    $consulta = "DELETE FROM detalle_series_tmp WHERE id_detalle = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_preventa]); 

    $response = array("status"=> 1, "product_id"=> $producto_id);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

