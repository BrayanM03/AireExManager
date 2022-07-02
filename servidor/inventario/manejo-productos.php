<?php
if ($_POST) {
    include "../database/conexion.php";
    include '../database/eliminar-dato.php';
    date_default_timezone_set('America/Matamoros');

    $delete = new Eliminar;
    $type = $_POST['type'];

    if($type == 'eliminacion') {
        $id_producto = $_POST['producto'];
        $relacion_id = "producto_id";
        $has_relation = true;

        $sentencia = $delete->eliminarDato("inventario", $id_producto, $has_relation, "series", $relacion_id, $con);
        echo json_encode($sentencia, JSON_UNESCAPED_UNICODE);


    }
}


?>