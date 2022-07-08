<?php
  
function traerImporte($con){
    $contar = "SELECT COUNT(*) FROM detalle_preventa_tmp WHERE user_id = ?";
    $re = $con->prepare($contar);
    $re->execute([ $_SESSION["id"]]);
    $count = $re->fetchColumn();
    
    if($count > 0) {
    
        
        $consultar = "SELECT * FROM detalle_preventa_tmp WHERE user_id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$_SESSION["id"]]);
        $importe = 0;
        while ($row = $resp->fetch()) {
    
            $importe += $row["importe"];   
        }
    
        return $importe;
    
    }else {
        return 0.00;
    }
}





?>