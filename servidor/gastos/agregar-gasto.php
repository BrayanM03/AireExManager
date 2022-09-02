<?php
if ($_POST) {
    include "../database/conexion.php";
    session_start();
    date_default_timezone_set('America/Matamoros');

    $datetime= $_POST['fecha'];

    $descripcion = $_POST['descripcion'];
    $sucursal = $_POST['sucursal'];
    $separar = (explode("T",$datetime));
    $fecha = $separar[0];
    $hora = $separar[1];
    $importe = $_POST['importe'];
    $forma_pago = $_POST['forma_gasto'];


    $insert = "INSERT INTO gastos(id,
                                       descripcion,
                                       importe,
                                       sucursal_id,
                                       user_id,
                                       fecha,
                                       hora,
                                       forma_gasto
                                      )VALUES(null,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insert);
    $resp->execute([$descripcion, $importe, $sucursal, $_SESSION["id"], $fecha, $hora, $forma_pago]);
    $resp->closeCursor();

    $response = array("status"=>true, "mensj"=>"El gasto se registró correctamente");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>