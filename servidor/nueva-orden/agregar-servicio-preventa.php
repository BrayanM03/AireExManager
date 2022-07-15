<?php


    session_start();
    include '../database/conexion.php';
    include '../nueva-orden/traer-importe.php';
    
    date_default_timezone_set("America/Matamoros");


    $id_producto = $_POST["id"];
    $precio_unitario = $_POST["precio"];
    $cantidad = $_POST["cantidad"];
    $categoria = "servicios";

    $contar = "SELECT COUNT(*) FROM detalle_preventa_tmp WHERE producto_id = ? AND user_id = ? AND categoria = ?";
    $re = $con->prepare($contar);
    $re->execute([$id_producto, $_SESSION["id"], $categoria]);
    $count = $re->fetchColumn();

    if($count == 0){

        
    $consultar = "SELECT * FROM servicios WHERE id = ?";
    $resp = $con->prepare($consultar);
    $resp->execute([$id_producto]);
    while ($row = $resp->fetch()) {
        $descripcion = $row["descripcion"];
    }

   

    $importe = intval($cantidad) * floatval($precio_unitario);

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

        

        $contar = "SELECT * FROM detalle_preventa_tmp WHERE producto_id = ? AND user_id = ? AND categoria =?";
        $re = $con->prepare($contar);
        $re->execute([$id_producto, $_SESSION["id"], $categoria]);


        while($row = $re->fetch(PDO::FETCH_OBJ)){
            $cantidad_actual = $row->cantidad;
            $id_detalle = $row->id;
        }
        
        
        $nueva_cantidad = $cantidad + $cantidad_actual;
        

        

            $nuevo_importe = $nueva_cantidad * $precio_unitario;

            $update = "UPDATE detalle_preventa_tmp SET cantidad = ?, importe = ? WHERE producto_id = ? AND user_id = ? AND categoria =?";
            $re = $con->prepare($update);
            $re->execute([$nueva_cantidad, $nuevo_importe, $id_producto, $_SESSION["id"], $categoria]);
    
           
            $response = array("status"=> true, "mensj"=>"Los datos se actualizarón correctamente");

        
        

       
    }



        $importe  = traerImporte($con);
        $response["importe"] = $importe;
        echo json_encode($response, JSON_UNESCAPED_UNICODE);


?>     