<?php
  
    session_start();
    include '../database/conexion.php';
    
    date_default_timezone_set("America/Matamoros");

    

    //Se cuenta el detalle de cotizacion para insertarlo en el detalle de ordenes
    $contar = "SELECT COUNT(*) FROM detalle_cotizacion_tmp WHERE user_id = ?";
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
    $id_sucursal = $_POST['id_sucursal'];


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

                    case 4:
                        $estatus = "Cerrada";
                        $fecha_cierre = $fecha_inicio;
                        $hora_cierre = $hora_inicio;
                        /* $tabla_origen = 'inventario'; */
                        break;

        
        default:
            # code...
            break;
    }

   

    //Insertando en tabla ordenes
    $insertar = "INSERT INTO cotizaciones(id, 
                                     cliente_id, 
                                     direccion_id,
                                     fecha_inicio,
                                     hora_inicio,
                                     total,
                                     estatus,
                                     tipo,
                                     usuario_id,
                                     sucursal_id,
                                     multi_metodo
                                    ) VALUES(null,?,?,?,?,?,?,?,?,?,?)";


    $re = $con->prepare($insertar);

    $re->execute([$id_cliente, $id_direccion, $fecha_inicio, $hora_inicio,
                  $total, $estatus, $tipo, $_SESSION["id"], $id_sucursal, $estatus_multi_metodo]);

    //Se finaliza la insercion de la orden

    //Obtener ultimo id
    $id_orden = $con->lastInsertId();
    

        $response = array("status"=> true, "mensj"=>"Cotización generada con exito", "id_orden"=>$id_orden);
       

        //Pasando los datos del detalle de prventa
        $consultar = "SELECT * FROM detalle_cotizacion_tmp WHERE user_id = ?";
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
              

            //Insertando los datos

            $insertar = "INSERT INTO detalle_cotizacion(id, 
                                                   descripcion, 
                                                   cantidad,
                                                   precio_unitario,
                                                   importe,
                                                   producto_id,
                                                   user_id,
                                                   orden_id,
                                                   categoria)
                                                   VALUES (null, ?,?,?,?,?,?,?,?)";


            $re = $con->prepare($insertar);
            $re->execute([$row["descripcion"], $row["cantidad"], $row["precio_unitario"], 
            $row["importe"], $row["producto_id"], $row["user_id"], $id_orden, $tabla_origen]);

        }


    

    }else {
        $response = array("status"=> false, "mensj"=>"Agrega articulos a la tabla");
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>