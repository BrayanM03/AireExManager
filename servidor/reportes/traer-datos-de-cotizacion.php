<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $key = $_POST['id_orden'];
    $tabla = $_POST['tabla'];
    $indicador = $_POST['indicador'];
    
    $consultar = $con->prepare("SELECT COUNT(*) FROM $tabla WHERE $indicador  = ?");
    $consultar->execute([$key]);
    $total = $consultar->fetchColumn(); 

    if($total > 0){

        $consultar = $con->prepare("SELECT * FROM $tabla WHERE $indicador  = ? ORDER BY id DESC");
        $consultar->execute([$key]);
        while ($row = $consultar->fetch()) {

            $id_cliente = $row['cliente_id'];
            $id_direccion = $row['direccion_id'];
            $fecha = $row['fecha_inicio'] . " " . $row['hora_inicio'];
            $total = $row['total'];
            $estatus = $row['estatus'];
            $usuario = $row['usuario_id'];
            $tipo = $row['tipo'];


            $consulta_cliente = "SELECT COUNT(*) FROM clientes WHERE id = ?";
            $resp = $con->prepare($consulta_cliente);
            $resp->execute([$id_cliente]);
            $total_clientes = $resp->fetchColumn();

        
            if($total_clientes > 0) {
                $consulta_cliente = "SELECT * FROM clientes WHERE id = ?";
                $resp = $con->prepare($consulta_cliente);
                $resp->execute([$id_cliente]);

                while ($fila_cliente = $resp->fetch()) {
                    $nombre_cliente = $fila_cliente["nombre"];
                    $telefono_cliente = $fila_cliente["telefono"];
                    $rfc_cliente = $fila_cliente["rfc"];
                    $contacto = $fila_cliente["contacto"];

                    $datos_cliente = array("nombre" => $nombre_cliente, 
                                           "telefono" => $telefono_cliente,
                                           "rfc" => $rfc_cliente,
                                           "contacto" => $contacto);
                    
                }
            }

            $consulta_direccion = "SELECT COUNT(*) FROM detalle_direccion WHERE id = ?";
            $respu = $con->prepare($consulta_direccion);
            $respu->execute([$id_direccion]);
            $total_clientes = $respu->fetchColumn();

        
            if($total_clientes > 0) {
                $consulta_direccion = "SELECT * FROM detalle_direccion WHERE id = ?";
                $respues = $con->prepare($consulta_direccion);
                $respues->execute([$id_direccion]);

                while ($fila_direccion = $respues->fetch()) {

                    $calle = $fila_direccion["calle"];
                    $colonia = $fila_direccion["colonia"];
                    $numero_int = $fila_direccion["numero_int"];
                    $numero_ext = $fila_direccion["numero_ext"];
                    $cp = $fila_direccion["cp"];
                    $ciudad = $fila_direccion["ciudad"];
                    $municipio = $fila_direccion["municipio"];
                    $estado = $fila_direccion["estado"];
                    $pais = $fila_direccion["pais"];

                    $direccion = $calle . " " . $numero_ext . " " . $colonia . " " . $municipio . " " . " CP: " . $cp ." ". $estado;
                    $direcciones = array("direccion"=> $direccion);
                   
                    
                }
                $datos_cliente["direccion"]= $direccion;
            }else{
                $datos_cliente["direccion"]= "Sin dirección";
            }

            $response  = array("status"=> true, "datos_cliente"=> $datos_cliente);

            /* $data['data'] = array(""); */
        }

        $response["folio"] = $key;
        $response["fecha"] =     $fecha;
        $response["total"] =     $total;
        $response["estatus"] =   $estatus;
        $response["usuario"] =   $usuario;
        $response["tipo"] = $tipo;
        $response['status'] =    true;
        $response['mensj'] =     "Se encontraron datos";


        //BUSCANDO LOS DETALLES DE LA ORDENES
        $consulta_orden = "SELECT COUNT(*) FROM detalle_cotizacion WHERE orden_id = ?";
        $resp = $con->prepare($consulta_orden);
        $resp->execute([$key]);
        $total_ordenes = $resp->fetchColumn();

    
        if($total_ordenes > 0) {
            $consulta_orden = "SELECT * FROM detalle_cotizacion WHERE orden_id = ?";
            $resp = $con->prepare($consulta_orden);
            $resp->execute([$key]);

            while ($fila_orden = $resp->fetch()) {
                $item_descripcion = $fila_orden["descripcion"];
                $item_cant = $fila_orden["cantidad"];
                $precio_unitario = $fila_orden["precio_unitario"];
                $producto_id = $fila_orden["producto_id"];
                $importe = $fila_orden["importe"];
                $categoria = $fila_orden["categoria"];
                $series = [];

              
                

                $detalle_orden[] = array("descripcion" => $item_descripcion, 
                                     
                                         "cantidad" => $item_cant,
                                         "precio_unit" => $precio_unitario,
                                         "importe" => $importe);
                
            }
            $response["detalle_orden"] = $detalle_orden;
        }


        
    }else{
        $response['status'] = false;
        $response['mensj'] = "No se encontro un elemento coincidente";
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>