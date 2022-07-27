<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];

    $insert = "DELETE FROM cotizaciones WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$id]);
    $resp->closeCursor();

    $delete = "DELETE FROM detalle_cotizacion WHERE orden_id= ?";
    $resp = $con->prepare($delete);
    $resp->execute([$id]);
    $resp->closeCursor();


    $response = array("status"=>true, "mensj"=>"La cotización se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>