<?php
if ($_POST) {
    session_start();
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

 

    $id = $_POST['id'];
    $id_orden = $_POST['id_orden'];
    $tabla = $_POST['tabla'];
    $series = $_POST['series'];

    $select = "SELECT COUNT(*) FROM ordenes WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_orden]);
    $count = $resp->fetchColumn();
    $resp->closeCursor();

    if($count > 0){
        
        $select = "SELECT * FROM ordenes WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id_orden]);
        $orden = $resp->fetch();
        $resp->closeCursor();

       $total_orden = $orden["total"];
       $utilidad_orden = $orden["utilidad"];
       

        $select = "SELECT * FROM $tabla WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id]);
        $producto = $resp->fetch();
        $resp->closeCursor();

        $precio = $producto["precio"];
        $utilidad = $producto["precio"] - $producto["costo"];
       
        $descripcion = $producto["descripcion"];
        if($tabla == "inventario"){
            $cantidad = count($series);
        }else{
            $cantidad = $_POST["cantidad"];
        }
        $importe = $precio * $cantidad;

        $select = "SELECT COUNT(*) FROM detalle_orden WHERE producto_id = ? AND categoria = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id, $tabla]);
        $countDetalle = $resp->fetchColumn();
        $resp->closeCursor();
        
        if($countDetalle > 0){

            $select = "SELECT * FROM detalle_orden WHERE id = ? AND categoria = ?";
            $resp = $con->prepare($select);
            $resp->execute([$id, $tabla]);
            $detalle = $resp->fetch();
            $resp->closeCursor();

            $cantidad_actual = $detalle["cantidad"];
            $importe_actual = $detalle["importe"];
            $utilidad_actual = $detalle["utilidad"];

            $nueva_cantidad = $cantidad_actual + $cantidad;
            $nuevo_importe = $importe_actual + $importe;
            $nueva_utilidad = $utilidad_actual + $utilidad;

            $update = "UPDATE detalle_orden SET cantidad = ?, importe = ? WHERE id = ? AND categoria = ?";
            $resp = $con->prepare($update);
            $resp->execute([$nueva_cantidad, $nuevo_importe, $id, $tabla]);
            $resp->closeCursor();


        }else{
           
            $insertar = "INSERT INTO detalle_orden (id, descripcion, cantidad, precio_unitario, importe, utilidad, producto_id, user_id, order_id, categoria) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)";
            $resp = $con->prepare($insertar);
            $resp->execute([$descripcion, $cantidad, $precio, $importe, $utilidad_orden, $id, $_SESSION["id"], $id_orden, $tabla]);
            $resp->closeCursor();
        }





    } else {
       
    }
 

    /* $response = array("status"=>true, "mensj"=>"La orden se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);  */


}

?>