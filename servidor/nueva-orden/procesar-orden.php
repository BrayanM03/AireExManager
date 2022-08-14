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
    $id_sucursal = $_POST['id_sucursal'];
    $comision = $_POST["comision_total"];
    $neto = $_POST["neto_total"];

    $pago_domicilio = $_POST['pago_domicilio'];
    $pago_sucursal = $_POST['pago_sucursal'];
    $verificar_electrico = $_POST['verificar_electrico'];
    $tiene_electrico = $_POST['tiene_electrico'];
    $cantidad_personal = $_POST['cantidad_personal'];
    $tiempo_horas = $_POST['tiempo_horas'];
    $nombre_personal = $_POST['nombre_personal'];

    if(isset($_POST['multi_metodo'])) {
        $multi_metodo = $_POST['multi_metodo'];
        $estatus_multi_metodo ="true";
      }else{
        $estatus_multi_metodo = "false";
      }

     

    switch ($tipo) {
        case 1:
            $estatus = "Cerrada";
            $fecha_cierre = $fecha_inicio;
            $hora_cierre = $hora_inicio;
            /* $tabla_origen = 'inventario'; */
            break;

            case 2:
                $estatus = "Pendiente";
                $fecha_cierre = "-";
                $hora_cierre = "-";
                /* $tabla_origen = 'inventario'; */
                break;

                case 3:
                    $estatus = "Pendiente";
                    $fecha_cierre = "-";
                    $hora_cierre = "-";
                    /* $tabla_origen = 'inventario'; */
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
                                     usuario_id,
                                     sucursal_id,
                                     multi_metodo,
                                     pago_domicilio,
                                     pago_sucursal,
                                     verificar_electrico,
                                     tiene_electrico,
                                     cantidad_personal,
                                     tiempo_horas,
                                     nombre_personal) VALUES(null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


    $re = $con->prepare($insertar);

    $re->execute([$id_cliente, $id_direccion, $fecha_inicio, $hora_inicio, $fecha_cierre, $hora_cierre,
                  $neto, $estatus, $tipo, $metodo_pago, $_SESSION["id"], $id_sucursal, $estatus_multi_metodo,
                $pago_domicilio, $pago_sucursal, $verificar_electrico, $tiene_electrico, $cantidad_personal, $tiempo_horas, $nombre_personal]);

    //Se finaliza la insercion de la orden

    //Obtener ultimo id
    $id_orden = $con->lastInsertId();
    

        $response = array("status"=> true, "mensj"=>"Venta generada con exito", "id_orden"=>$id_orden);
       


        if($comision > 0){
            $comision_desc = "Comision pago con tarjeta";
            $insert = "INSERT INTO detalle_preventa_tmp(id,
            descripcion,
            cantidad,
            precio_unitario,
            importe,
            producto_id,
            user_id,
            categoria) VALUES(null, ?,?,?,?,?,?,?)";
            $resp = $con->prepare($insert);
            $resp->execute([$comision_desc, 1, $comision, $comision, 0, $_SESSION["id"], "Costo extra"]);
        }

        //Pasando los datos del detalle de prventa
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
            $tabla_origen = $row["categoria"];

            
            
            if($tabla_origen == "inventario" || $tabla_origen == "refacciones"){
                
                $utilidad = "SELECT costo FROM $tabla_origen WHERE id = ?";
                $re = $con->prepare($utilidad);
                $re->execute([ $row['producto_id']]);
                $costo_producto = $re->fetchColumn();
    
                //Operacion con las ganancias
                $utilidad_x_partida = $row['precio_unitario'] - $costo_producto; 
                $utilidad_neta = $utilidad_x_partida * $row["cantidad"];
                $suma_utilidad += $suma_utilidad + $utilidad_neta;

                //Traer stock
                    $consult = "SELECT stock FROM $tabla_origen WHERE id = ?";
                    $rep = $con->prepare($consult);
                    $rep->execute([$row['producto_id']]);
                    $stock_actual = $rep->fetchColumn();
                    $rep->closeCursor();

                    $stock_nuevo = $stock_actual - $row["cantidad"];

                //Actualizando el stock
                $update_stock = "UPDATE $tabla_origen SET stock = ? WHERE id =?";
                $respuesta = $con->prepare($update_stock);
                $respuesta->execute([$stock_nuevo, $row['producto_id']]);


            }else if($tabla_origen == "servicios"){
                $utilidad_neta = $row["importe"];
                $suma_utilidad += $utilidad_neta; 
            } else{
                $utilidad_neta = $row["importe"];
                $suma_utilidad += $utilidad_neta; 
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
                                                   orden_id,
                                                   categoria)
                                                   VALUES (null, ?,?,?,?,?,?,?,?,?)";


            $re = $con->prepare($insertar);
            $re->execute([$row["descripcion"], $row["cantidad"], $row["precio_unitario"], 
            $row["importe"], $utilidad_neta, $row["producto_id"], $row["user_id"], $id_orden, $tabla_origen]);

        }

                 //Actualizando series
                //Trayendo serie
                $contar_serie = "SELECT COUNT(*) FROM detalle_series_tmp WHERE user_id = ?";
                $respu = $con->prepare($contar_serie);
                $respu->execute([$_SESSION["id"]]);
                $series_contadas = $respu->fetchColumn();

                if($series_contadas > 0) {

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
                    
                }

                if($estatus_multi_metodo == "true") { 
                    
                    foreach ($multi_metodo as $key => $value) {
                        $insert_multi_metodo = "INSERT INTO multi_metodo(id, metodo_pago, monto_pago, id_orden, id_sucursal)
                        VALUES(null, ?,?,?,?)";
                        $respuu = $con->prepare($insert_multi_metodo);
                        $respuu->execute([$value[0], $value[1], $id_orden, $id_sucursal]);

                    }
                }

                

        $updt = "UPDATE ordenes SET utilidad = ? WHERE id =?";
        $res = $con->prepare($updt);
        $res->execute([$suma_utilidad, $id_orden]);

    

    }else {
        $response = array("status"=> false, "mensj"=>"Agrega articulos a la tabla");
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>