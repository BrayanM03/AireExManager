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
                                       sucursal)VALUES(null,?,?,?,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insert);
    $resp->execute([$proveedor, $descripcion, $cantidad, $modelo, $marca, $costo, $precio, $estatus, $observacion,  $sucursal]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"La refacción se insertó correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>