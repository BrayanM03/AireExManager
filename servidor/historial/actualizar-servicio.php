<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
    $estatus = $_POST['estatus'];;

    $insert = "UPDATE servicios SET descripcion = ?,
                                       precio = ?,
                                       estatus = ? WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$descripcion, $precio, $estatus, $id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El servicio se actualizó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>