<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];

    $insert = "DELETE FROM refacciones WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"La refacción se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>