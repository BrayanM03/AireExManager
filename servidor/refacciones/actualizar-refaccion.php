<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];
    $proveedor = $_POST['proveedor'];
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $costo = $_POST['costo'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];
    $observacion = $_POST['observacion'];
    $descripcion = $_POST['descripcion'];
    $sucursal = $_POST['sucursal'];
    $estatus = $_POST['estatus'];;

    $insert = "UPDATE refacciones SET proveedor = ?,
                                       descripcion = ?,
                                       stock = ?,
                                       modelo = ?,
                                       marca = ?,
                                       costo = ?,
                                       precio = ?,
                                       estatus = ?,
                                       observaciones = ?,
                                       sucursal = ? WHERE id= ?";
    $resp = $con->prepare($insert);
    $resp->execute([$proveedor, $descripcion, $cantidad, $modelo, $marca, $costo, $precio, $estatus, $observacion,  $sucursal, $id]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"La refacción se actualizó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>