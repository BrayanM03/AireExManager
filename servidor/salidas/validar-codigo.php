<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

  
        $codigo = $_POST['codigo'];
        $cantidad_entrante = $_POST['cant'];
   
        $insert = "SELECT COUNT(*) FROM inventario WHERE codigo = ?";
        $resp = $con->prepare($insert);
        $resp->execute([$codigo]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();
    
        if($total > 0) {

            $select = "SELECT stock FROM inventario WHERE codigo = ?";
            $resp = $con->prepare($select);
            $resp->execute([$codigo]);
            $cantidad_actual = $resp->fetchColumn();
            $resp->closeCursor();

            if($cantidad_actual < $cantidad_entrante){
                $response = array("status"=>false, "mensj"=>"Esa cantidad supera el stock actual");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }else if($cantidad_entrante < 0 || $cantidad_entrante == 0){
                $response = array("status"=>false, "mensj"=>"Cantidad invalida");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }else{
                $response = array("status"=>true, "mensj"=>"Cantidad disponible");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
    
            
        }else if($total == 0) {
            $response = array("status"=>false, "mensj"=>"Ese codigo no existe");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
    
  



}

?>