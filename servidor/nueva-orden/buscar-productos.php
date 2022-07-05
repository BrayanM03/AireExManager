<?php

    if($_POST){
       
     include "../database/conexion.php";
     date_default_timezone_set('America/Matamoros');

        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT COUNT(*) FROM inventario WHERE modelo LIKE ? OR marca LIKE ? OR tonelaje LIKE ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input, $input]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();

       if($total>0){
        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT * FROM inventario WHERE modelo LIKE ? OR marca LIKE ? OR tonelaje LIKE ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input, $input]);
        while ($row = $resp->fetch()) {
            $row["categoria"] = "producto";
            $data[] = $row;
        }
        $resp->closeCursor();
        
       }else{
        $data[] = array("id"=>false, "mensj"=>"No se encontarón coincidencias");
    }/* else{

        //Se busca por las series

        $consultar = "SELECT COUNT(*) FROM series WHERE serie_condensador LIKE ? OR serie_evaporizador LIKE ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input]);
        $total_series = $resp->fetchColumn();
        $resp->closeCursor();

        if($total_series >0){
            $consultar = "SELECT producto_id FROM series WHERE serie_condensador LIKE ? OR serie_evaporizador LIKE ? LIMIT 1";
            $resp = $con->prepare($consultar);
            $resp->execute([$input, $input]);
            $producto_id = $resp->fetchColumn();
            $resp->closeCursor();

                $traer_series = "SELECT * FROM series WHERE producto_id = ? AND serie_condensador LIKE ? OR serie_evaporizador LIKE ? ";
                $response = $con->prepare($traer_series);
                $response->execute([$producto_id, $input, $input]);

                while ($fila = $response->fetch()) {
                    $fila["categoria"] = "serie";
                   
                    $consultar = "SELECT * FROM inventario WHERE id = ?";
                    $resp = $con->prepare($consultar);
                    $resp->execute([$producto_id]);
                    while ($row = $resp->fetch()) {

                        $fila[] = $row;
                    }
                    $data[] = $fila;

                    
                }

            
            $resp->closeCursor();

        }else{
            $data[] = array("id"=>false, "mensj"=>"No se encontarón coincidencias");
        }

       } */

       echo json_encode($data, JSON_UNESCAPED_UNICODE);

    }

   

?>