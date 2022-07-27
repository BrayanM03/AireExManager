<?php


    session_start();
    include '../database/conexion.php';
    include '../nueva_cotizacion/traer-importe.php';
    
    date_default_timezone_set("America/Matamoros");

    $setar = "DELETE FROM detalle_cotizacion_tmp WHERE user_id = ?";
    $resp = $con->prepare($setar);
    $resp->execute([$_SESSION["id"]]);
    $resp->closeCursor();



    $response = array("status"=> true, "mensj"=>"seteado correctamente");
        $importe  = traerImporte($con);
        $response["importe"] = $importe;
        echo json_encode($response, JSON_UNESCAPED_UNICODE);


?>