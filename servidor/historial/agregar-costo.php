<?php
if ($_POST) {
    session_start();
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id = $_POST['id'];
    $user_id = $_SESSION['id'];
    $monto_ext = $_POST['monto_ext'];
    $cant = $_POST["cant"];
    $descripcion = $_POST["descripcion"];
    $categoria = "Costo extra";
    $importe = $monto_ext * $cant;
    $producto_id = "NA";
   
    $fecha= date("Y-m-d");
    $hora = date("h:i:s a");

    $updates = "INSERT INTO detalle_orden(id, descripcion, cantidad, precio_unitario, importe, utilidad, producto_id, user_id, orden_id, categoria)
    VALUES(null, ?,?,?,?,?,?,?,?,?)";
        $resp = $con->prepare($updates);
        $resp->execute([$descripcion, $cant, $monto_ext, $importe, $importe, $producto_id, $user_id, $id, $categoria]);

        $select = "SELECT * FROM ordenes WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id]);

        while ($row = $resp->fetch()) {
            $suma_total = $row['total'] + $importe;
            $suma_utilidad = $row['utilidad'] + $importe;
            $updates2 = "UPDATE ordenes SET total =?, utilidad=? WHERE id =?";
            $resp = $con->prepare($updates2);
            $resp->execute([$suma_total, $suma_utilidad, $id]);
        
        }


       
        print_r(1);
}

?>