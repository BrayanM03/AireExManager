<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_refaccion = $_POST["id"];

    $select = "SELECT COUNT(*) FROM servicios WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_refaccion]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $consultar = "SELECT * FROM servicios WHERE id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id_refaccion]);
        while ($row = $resp->fetch()) {
            $data = $row;
        }
        $response = array("status"=>true, "data"=>$data);
    }else{
        $response = array("status"=>true, "mensj"=>"No se encontro el dato");
    }

    

  
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>