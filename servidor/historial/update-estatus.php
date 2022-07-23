<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id_orden'];
    $estatus = $_POST['estatus'];
    $detalles = $_POST["detalles"];
    $cate = "servicios";
    $fecha= date("Y-m-d");
    $hora = date("h:i:s a");

    $updates = "UPDATE ordenes SET fecha_cierre =?, hora_cierre=?, estatus =? WHERE id =?";
        $resp = $con->prepare($updates);
        $resp->execute([$fecha, $hora, $estatus, $id]);


    /* $detalle_length = count($detalles); */

    /* function traerImporte($con, $id, $trayendo){
        $contar = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id = ?";
        $re = $con->prepare($contar);
        $re->execute([$id]);
        $count = $re->fetchColumn();
        
        if($count > 0) {     
            
            $consultar = "SELECT * FROM detalle_orden WHERE orden_id = ?";
            $resp = $con->prepare($consultar);
            $resp->execute([$id]);
            $dato = 0;
            while ($row = $resp->fetch()) {
        
                $dato += $row[$trayendo];  
            }
        
            return $dato;
        
        }else {
            return 0.00;
        }
    }
 */

  /*   if($detalle_length > 0){

        foreach ($detalles as $key => $value) {
           
            $update = "UPDATE detalle_orden SET descripcion =?, precio_unitario =?, importe =?, utilidad =? WHERE id=?";
            $res = $con->prepare($update);
            $res->execute([$value["desc"],$value["p_unit"],$value["importe"],$value["importe"], $value["id"]]);

        }

        $importe_detalle = traerImporte($con, $id, "importe");
        $utilidad_detalle = traerImporte($con, $id, "utilidad");
       

        $updates = "UPDATE ordenes SET fecha_cierre =?, hora_cierre=?, total =?, utilidad =?, estatus =? WHERE id =?";
        $resp = $con->prepare($updates);
        $resp->execute([$fecha, $hora, $importe_detalle, $utilidad_detalle, $estatus, $id]);

    }else{
        $updates = "UPDATE ordenes SET fecha_cierre =?, hora_cierre=?, total =?, utilidad =?, estatus =? WHERE id =?";
        $resp = $con->prepare($updates);
        $resp->execute([$fecha, $hora, $importe_detalle, $utilidad_detalle, $estatus, $id]);
    }
 */
    print_r(1);

/*     $insert = "UPDATE servicios SET descripcion = ?,
                                       precio = ?,
                                       estatus = ? WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$descripcion, $precio, $estatus, $id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El servicio se actualizó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE); */


}

?>