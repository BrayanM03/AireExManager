<?php


    session_start();
    include '../database/conexion.php';
    date_default_timezone_set("America/Matamoros");


    $id_producto = $_POST["id_producto"];
    $codigo = $_POST["codigo"];
    $cantidad = $_POST["cantidad"];

    //-----------TRAYENDO EL STOCK ACTUAL DEL PRODUCTO-----------------

    $traer_stock = "SELECT * FROM inventario WHERE id = ?";
    $re = $con->prepare($traer_stock);
    $re->execute([$id_producto]);

    while($row = $re->fetch(PDO::FETCH_OBJ)){
        $stock_actual = $row->stock;
    }

    if($stock_actual < $cantidad){
        $response = array("status"=> false, "mensj"=>"La cantidad que desea agregar es mayor a la cantidad actual");
    }else{


        $contar = "SELECT COUNT(*) FROM pre_salida WHERE producto_id = ? AND usuario_id = ?";
        $re = $con->prepare($contar);
        $re->execute([$id_producto, $_SESSION["id"]]);
        $count = $re->fetchColumn();
    
    
        if($count == 0){
       
        $descripcion = $_POST["descripcion"];
        $cantidad_act = $_POST["cantidad_actual"];
        $cantidad_restante = $cantidad_act - $cantidad;
    
        $insert = "INSERT INTO pre_salida(id,
                                                codigo,
                                                concepto,
                                                producto_id,
                                                cantidad,
                                                usuario_id) VALUES(null, ?,?,?,?,?)";
        $resp = $con->prepare($insert);
        $resp->execute([$codigo, $descripcion, $id_producto, $cantidad, $_SESSION["id"]]);
        
        $id_detalle = $con->lastInsertId();
    
        
      
        $response = array("status"=> true, "mensj"=>"Los datos se insertaron correctamente", "cantidad_restante"=>$cantidad_restante);
        
    
        }else if($count > 0){
    
            $contar = "SELECT * FROM pre_salida WHERE producto_id = ? AND usuario_id = ?";
            $re = $con->prepare($contar);
            $re->execute([$id_producto, $_SESSION["id"]]);
    
            while($row = $re->fetch(PDO::FETCH_OBJ)){
                $cantidad_act = $row->cantidad;
            }
            
            $nueva_cantidad = $cantidad + $cantidad_act;
    
            if ($stock_actual < $nueva_cantidad) {
                $response = array("status"=> false, "mensj"=>"La cantidad que desea agregar es mayor a la cantidad actual");
            }else{
               
                    $cantidad_restante = $cantidad_act - $nueva_cantidad;
    
                    $update = "UPDATE pre_salida SET cantidad = ? WHERE producto_id = ? AND usuario_id = ?";
                    $re = $con->prepare($update);
                    $re->execute([$nueva_cantidad,  $id_producto, $_SESSION["id"]]);
    
                
                    $response = array("status"=> true, "mensj"=>"Los datos se actualizarón correctamente", "cant_restante" => $cantidad_restante);
            }
            
        }

        
    }

   

echo json_encode($response, JSON_UNESCAPED_UNICODE)


?>     