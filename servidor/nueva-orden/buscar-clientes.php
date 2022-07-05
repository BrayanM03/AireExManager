<?php

    if($_POST){
       
     include "../database/conexion.php";
     date_default_timezone_set('America/Matamoros');

        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT COUNT(*) FROM clientes WHERE nombre LIKE ? OR rfc = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();

       if($total>0){
        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT * FROM clientes WHERE nombre LIKE ? OR rfc = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input]);
        while ($row = $resp->fetch()) {
            $data[] = $row;
        }
        $resp->closeCursor();

        
       }else{
        $data[] = array("id"=>false, "mensj"=>"No se encontarón coincidencias");
       }

       echo json_encode($data, JSON_UNESCAPED_UNICODE);

    }

   

?>