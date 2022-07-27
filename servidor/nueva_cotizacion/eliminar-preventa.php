<?php


    session_start();
    include '../database/conexion.php';
    include '../nueva-orden/traer-importe.php';
    
    date_default_timezone_set("America/Matamoros");

    $id_preventa = $_POST['id_preventa'];

    $consulta = "SELECT producto_id FROM detalle_cotizacion_tmp WHERE id = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_preventa]); 
    $producto_id = $res->fetchColumn();
    $res->closeCursor();

    $consulta = "DELETE FROM detalle_cotizacion_tmp WHERE id = ?";
    $res = $con->prepare($consulta);
    $res->execute([$id_preventa]); 


    $response = array("status"=> 1, "product_id"=> $producto_id);
    $importe  = traerImporte($con);
    $response["importe"] = $importe;
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

