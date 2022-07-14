<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');
   
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
   
    $estatus = "Activo";

    $insert = "INSERT INTO servicios(id,
                                       descripcion,
                                       precio,
                                       estatus)VALUES(null,?,?,?)";
    $resp = $con->prepare($insert);
    $resp->execute([$descripcion,$precio, $estatus]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El servicio se insertó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>