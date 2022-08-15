<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];

    $delete = "DELETE FROM pre_salida WHERE id= ?";
    $resp = $con->prepare($delete);
    $resp->execute([$id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El producto se borró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>