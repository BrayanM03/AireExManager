<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id_detalle'];

    $select = "SELECT * FROM detalle_orden WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id]);
    $detalle = $resp->fetch();
    $resp->closeCursor();

    $id_orden = $detalle["orden_id"];
    $importe = $detalle["importe"];
    $utilidad = $detalle["utilidad"];

    $select = "SELECT * FROM ordenes WHERE id = ?"; 
    $resp = $con->prepare($select);
    $resp->execute([$id_orden]);
    $orden = $resp->fetch();
    $resp->closeCursor();

    $importe_actual = $orden["total"];
    $utilidad_actual = $orden["utilidad"];

    $nuevo_importe = $importe_actual - $importe;
    $nueva_utilidad = $utilidad_actual - $utilidad;

    $update = "UPDATE ordenes SET total = ?, utilidad = ? WHERE id = ?";
    $resp = $con->prepare($update);
    $resp->execute([$nuevo_importe, $nueva_utilidad, $id_orden]);
    $resp->closeCursor();

    $delete = "DELETE FROM detalle_orden WHERE id= ?";
    $resp = $con->prepare($delete);
    $resp->execute([$id]);
    $resp->closeCursor();

    

    $response = array("status"=>true, "mensj"=>"La orden se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>