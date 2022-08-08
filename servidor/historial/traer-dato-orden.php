<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_orden = $_POST["id_orden"];
    $categoria = "servicios";

    $select = "SELECT COUNT(*) FROM vista_ordenes WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_orden]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $consultar = "SELECT * FROM vista_ordenes WHERE id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id_orden]);
        while ($row = $resp->fetch()) {

            $detalle = traerDetalle($con, $row["id"]);
            
            $row["detalle"] = $detalle;
            $data = $row;
            
        }
        $response = array("status"=>true, "data"=>$data);
    }else{
        $response = array("status"=>true, "mensj"=>"No se encontro el dato");
    }

    

  
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

function traerDetalle($con, $id){
    $select = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $consultar = "SELECT * FROM detalle_orden WHERE orden_id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id]);
        while ($row = $resp->fetch()) {
            $data[] = $row;
        }
        $response = array("status"=>true, "data"=>$data);
    }else{
        $response = array();
    }
    return $response;
}

?>