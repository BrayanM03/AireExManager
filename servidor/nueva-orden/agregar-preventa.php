<?php


    session_start();
    include '../database/conexion.php';
    include '../nueva-orden/traer-importe.php';
    
    date_default_timezone_set("America/Matamoros");


    $id_producto = $_POST["id"];
    $series = $_POST["series"];
    $precio_unitario = $_POST["precio"];
    $categoria = $_POST["categoria"];
    $cantidad = count($series);

    $contar = "SELECT COUNT(*) FROM detalle_preventa_tmp WHERE producto_id = ? AND user_id = ? AND categoria = ?";
    $re = $con->prepare($contar);
    $re->execute([$id_producto, $_SESSION["id"], $categoria]);
    $count = $re->fetchColumn();

    if($count == 0){

        
    $consultar = "SELECT * FROM inventario WHERE id = ?";
    $resp = $con->prepare($consultar);
    $resp->execute([$id_producto]);
    while ($row = $resp->fetch()) {
        $descripcion = $row["descripcion"];
    }

    $importe = $cantidad * $precio_unitario;

    $insert = "INSERT INTO detalle_preventa_tmp(id,
                                            descripcion,
                                            cantidad,
                                            precio_unitario,
                                            importe,
                                            producto_id,
                                            user_id,
                                            categoria) VALUES(null, ?,?,?,?,?,?,?)";
    $resp = $con->prepare($insert);
    $resp->execute([$descripcion, $cantidad, $precio_unitario, $importe, $id_producto, $_SESSION["id"], $categoria]);
    
    $id_detalle = $con->lastInsertId();

    
  
    $response = array("status"=> true, "mensj"=>"Los datos se insertaron correctamente");
    

    }else if($count > 0){

        $contar = "SELECT * FROM detalle_preventa_tmp WHERE producto_id = ? AND user_id = ? AND categoria = ?";
        $re = $con->prepare($contar);
        $re->execute([$id_producto, $_SESSION["id"], $categoria]);

        while($row = $re->fetch(PDO::FETCH_OBJ)){
            $cantidad_actual = $row->cantidad;
            $id_detalle = $row->id;
        }
        

        $nueva_cantidad = $cantidad + $cantidad_actual;
        $nuevo_importe = $nueva_cantidad * $precio_unitario;

        $update = "UPDATE detalle_preventa_tmp SET cantidad = ?, importe = ? WHERE producto_id = ? AND user_id = ?";
        $re = $con->prepare($update);
        $re->execute([$nueva_cantidad, $nuevo_importe, $id_producto, $_SESSION["id"]]);

       
        $response = array("status"=> true, "mensj"=>"Los datos se actualizarón correctamente");
    }


    //Trayendo series
   
    foreach ($series as $key => $value) {
        $consultar = "SELECT * FROM series WHERE id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$value]);

        while ($row = $resp->fetch()) {
            $evap = $row["serie_evaporizador"];
            $cond = $row["serie_condensador"];
            $prod_id = $row["producto_id"];

            $insertNS = "INSERT INTO detalle_series_tmp(id,
                                                       serie_condensador,
                                                       serie_evaporizador,
                                                       id_detalle,
                                                       id_producto,
                                                       serie_id,
                                                       user_id) VALUES(null, ?,?,?,?,?,?)";
            $resp = $con->prepare($insertNS);
            $resp->execute([$cond, $evap, $id_detalle, $prod_id, $value, $_SESSION["id"]]);
        

        }

        
    }

    $importe  = traerImporte($con);
        $response["importe"] = $importe;
        echo json_encode($response, JSON_UNESCAPED_UNICODE);


?>     