<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_sucursal = $_POST["id"];

    $select = "SELECT COUNT(*) FROM sucursal WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_sucursal]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $consultar = "SELECT apertura FROM sucursal WHERE id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id_sucursal]);
        while ($row = $resp->fetch()) {
            $data = $row['apertura'];

        }
        
        $response = array("status"=>true, "data"=>$data);
    }else{
        $response = array("status"=>true, "mensj"=>"No se encontro el dato");
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>