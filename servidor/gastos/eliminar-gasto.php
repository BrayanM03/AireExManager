<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];

    $insert = "DELETE FROM gastos WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El gasto se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>