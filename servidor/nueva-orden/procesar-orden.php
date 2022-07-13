<?php
  
    session_start();
    include '../database/conexion.php';
    
    date_default_timezone_set("America/Matamoros");

    

    //Se cuenta el detalle de preventa para insertarlo en el detalle de ordenes
    $contar = "SELECT COUNT(*) FROM detalle_preventa_tmp WHERE user_id = ?";
    $re = $con->prepare($contar);
    $re->execute([ $_SESSION["id"]]);
    $count = $re->fetchColumn();


    if($count > 0) {

    $id_direccion = $_POST['id_direccion'];
    $id_direccion == null ? $id_direccion = 0 : $id_direccion= $id_direccion;
    $hora_inicio = date('h:i:s a');
    $fecha_inicio = date('Y-m-d');
    $id_cliente = $_POST['id_cliente'];
    $tipo = $_POST['tipo']; // Ordenes tipo 1 cerradas al momento
    $total = $_POST['total'];
    $metodo_pago = $_POST['metodo_pago'];

    switch ($tipo) {
        case 1:
            $estatus = "Cerrada";
            $fecha_cierre = $fecha_inicio;
            $hora_cierre = $hora_inicio;
            $tabla_origen = 'inventario';
            break;

        
        default:
            # code...
            break;
    }

   

    //Insertando en tabla ordenes
    $insertar = "INSERT INTO ordenes(id, 
                                     cliente_id, 
                                     direccion_id,
                                     fecha_inicio,
                                     hora_inicio,
                                     fecha_cierre,
                                     hora_cierre,
                                     total,
                                     estatus,
                                     tipo,
                                     metodo_pago,
                                     usuario_id) VALUES(null, ?,?,?,?,?,?,?,?,?,?,?)";


    $re = $con->prepare($insertar);
    $re->execute([$id_cliente, $id_direccion, $fecha_inicio, $hora_inicio, $fecha_cierre, $hora_cierre,
                  $total, $estatus, $tipo, $metodo_pago, $_SESSION["id"]]);

    //Se finaliza la insercion de la orden

    //Obtener ultimo id
    $id_orden = $con->lastInsertId();
    

        $response = array("status"=> true, "mensj"=>"Venta generada con exito", "id_orden"=>$id_orden);
        $consultar = "SELECT * FROM detalle_preventa_tmp WHERE user_id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$_SESSION["id"]]);

        $utilidad = 0;
        $suma_utilidad = 0;
        while ($row = $resp->fetch()) {

            //En cada iteracion insertamos la partida en el detalle de orden
            $productos[] = $row;

            $response["partidas"] = $productos;
            //Obtenemos la utilidad de cada partida
            
            if($tipo == 1){
                
                $utilidad = "SELECT costo FROM $tabla_origen WHERE id = ?";
                $re = $con->prepare($utilidad);
                $re->execute([ $row['producto_id']]);
                $costo_producto = $re->fetchColumn();
    
                //Operacion con las ganancias
                $utilidad_x_partida = $row['precio_unitario'] - $costo_producto; 
                $utilidad_neta = $utilidad_x_partida * $row["cantidad"];
                $suma_utilidad += $suma_utilidad + $utilidad_neta;

                //Traer stock
                    $consult = "SELECT stock FROM inventario WHERE id = ?";
                    $rep = $con->prepare($consult);
                    $rep->execute([$row['producto_id']]);
                    $stock_actual = $rep->fetchColumn();
                    $rep->closeCursor();

                    $stock_nuevo = $stock_actual - $row["cantidad"];

                //Actualizando el stock
                $update_stock = "UPDATE inventario SET stock = ? WHERE id =?";
                $respuesta = $con->prepare($update_stock);
                $respuesta->execute([$stock_nuevo, $row['producto_id']]);


            }     

            //Insertando los datos

            $insertar = "INSERT INTO detalle_orden(id, 
                                                   descripcion, 
                                                   cantidad,
                                                   precio_unitario,
                                                   importe,
                                                   utilidad,
                                                   producto_id,
                                                   user_id,
                                                   orden_id)
                                                   VALUES (null, ?,?,?,?,?,?,?,?)";


            $re = $con->prepare($insertar);
            $re->execute([$row["descripcion"], $row["cantidad"], $row["precio_unitario"], 
            $row["importe"], $utilidad_neta, $row["producto_id"], $row["user_id"], $id_orden]);

        }

                 //Actualizando series
                //Trayendo serie
                $consult_serie = "SELECT * FROM detalle_series_tmp WHERE user_id = ?";
                    $rep_s = $con->prepare($consult_serie);
                    $rep_s->execute([$_SESSION['id']]);
                    $estatus_serie = "Vendido";

                    while ($fila_s = $rep_s->fetch()) {

                        $serie_id = $fila_s["serie_id"]; 
                        $update_serie = "UPDATE series SET estatus = ? WHERE id =?";
                        $respuesta_s = $con->prepare($update_serie);
                        $respuesta_s->execute([$estatus_serie, $serie_id]);
                        $respuesta_s->closeCursor();

                        //Actualizar detalle de orden
                        $insertar = "INSERT INTO detalle_series(id, 
                                                 serie_condensador, 
                                                 serie_evaporizador,
                                                 detalle_id,
                                                 serie_id,
                                                 producto_id,
                                                 user_id,
                                                 order_id)
                                                VALUES (null, ?,?,?,?,?,?,?)";


                        $re = $con->prepare($insertar);
                        $re->execute([$fila_s["serie_condensador"], $fila_s["serie_evaporizador"], $fila_s["id_detalle"], 
                        $fila_s["serie_id"], $fila_s["id_producto"], $fila_s["user_id"], $id_orden]);


                    }
                    $rep_s->closeCursor();

        $updt = "UPDATE ordenes SET utilidad = ? WHERE id =?";
        $res = $con->prepare($updt);
        $res->execute([$suma_utilidad, $id_orden]);

    }else {
        $response = array("status"=> false, "mensj"=>"Agrega articulos a la tabla");
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>