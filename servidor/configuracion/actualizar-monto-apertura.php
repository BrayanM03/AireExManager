<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_sucursal = $_POST["id"];
    $monto = $_POST["monto"];

    $select = "SELECT COUNT(*) FROM sucursal WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_sucursal]);
    $total = $resp->fetchColumn();

    if($total > 0){

        $update = "UPDATE sucursal SET apertura = ? WHERE id = ?";
        $resp = $con->prepare($update);
        $resp->execute([$monto, $id_sucursal]);
        $data = $resp->rowCount();
        if($data > 0){
            $response = array("status"=>true, "mensj"=>"Se actualizo correctamente");
        }else{
            $response = array("status"=>false, "mensj"=>"No se pudo actualizar");
        }

        
    }else{
        $response = array("status"=>true, "mensj"=>"No se encontro el dato");
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>