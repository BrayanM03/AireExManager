<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];

    $insert = "DELETE FROM ordenes WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$id]);
    $resp->closeCursor();

    $delete = "DELETE FROM detalle_orden WHERE orden_id= ?";
    $resp = $con->prepare($delete);
    $resp->execute([$id]);
    $resp->closeCursor();

    $delete_s = "DELETE FROM detalle_series WHERE order_id= ?";
    $resp = $con->prepare($delete_s);
    $resp->execute([$id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"La orden se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>