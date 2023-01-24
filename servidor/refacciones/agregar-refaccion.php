<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $proveedor = $_POST['proveedor'];
    $modelo = $_POST['modelo'];
    $costo = $_POST['costo'];
    $precio = $_POST['precio'];
    $marca = $_POST['marca'];
    $cantidad = $_POST['cantidad'];
    $observacion = $_POST['observacion'];
    $descripcion = $_POST['descripcion'];
    $sucursal = $_POST['sucursal'];
    $estatus = "Activo";
    $img = "NA";

    $insert = "INSERT INTO refacciones(id,
                                       proveedor,
                                       descripcion,
                                       stock,
                                       modelo,
                                       marca,
                                       costo,
                                       precio,
                                       estatus,
                                       observaciones,
                                       sucursal,
                                       img)VALUES(null,:prov,:descr,:cant,:mod,:marc,:cost,:prec,:est,:obsv,:suc,:img)";
    $resp = $con->prepare($insert);
    $resp->bindValue(':prov', $proveedor, PDO::PARAM_STR);
    $resp->bindValue(':descr', $descripcion, PDO::PARAM_STR);
    $resp->bindValue(':cant', $cantidad, PDO::PARAM_STR);
    $resp->bindValue(':mod', $modelo, PDO::PARAM_STR);
    $resp->bindValue(':marc', $marca, PDO::PARAM_STR);
    $resp->bindValue(':cost', $costo, PDO::PARAM_STR);
    $resp->bindValue(':prec', $precio, PDO::PARAM_STR);
    $resp->bindValue(':est', $estatus, PDO::PARAM_STR);
    $resp->bindValue(':obsv', $observacion, PDO::PARAM_STR);
    $resp->bindValue(':suc', $sucursal, PDO::PARAM_STR);
    $resp->bindValue(':img', $img, PDO::PARAM_STR);
    $resp->execute();
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"La refacción se insertó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>