<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_orden = $_POST["id"];
    $categoria = "servicios";

    $select = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id = ? AND categoria =?";
    $resp = $con->prepare($select);
    $resp->execute([$id_orden, $categoria]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $consultar = "SELECT * FROM detalle_orden WHERE orden_id = ? AND categoria =?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id_orden, $categoria]);
        while ($row = $resp->fetch()) {
            $data[] = $row;
        }
        $response = array("status"=>true, "data"=>$data);
    }else{
        $response = array("status"=>true, "mensj"=>"No se encontro el dato");
    }

    

  
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>