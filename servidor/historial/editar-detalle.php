<?php
if ($_POST) {
    session_start();
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

 
   
    $id = $_POST['id'];
    $id_orden = $_POST['id_orden'];
    $tabla = $_POST['tabla'];
    if($tabla == "inventario"){
        $series = $_POST['series'];
    }else{
        $series = "";
    }
    

    
//--------------------------------FUNCIONES-----------------------
function setearNuevosDatosdeOrden($con, $id, $importe, $utilidad){

    $select = "SELECT * FROM ordenes WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id]);
    $orden = $resp->fetch();
    $resp->closeCursor();
    
    $total_orden = $orden["total"];
    $utilidad_orden = $orden["utilidad"];
    
    $nuevo_total = $total_orden + $importe;
    $nueva_utilidad = $utilidad_orden + $utilidad;
    
    $update = "UPDATE ordenes SET total = ?, utilidad = ? WHERE id = ?";
    $resp = $con->prepare($update);
    $resp->execute([$nuevo_total, $nueva_utilidad, $id]);
    $resp->closeCursor();

}

function trabajarSeries($con, $series, $orden_id, $detalle_id){
       

     foreach($series as $id_serie){
       
        $select = "SELECT COUNT(*) FROM series WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id_serie]);
        $count = $resp->fetchColumn();
        $resp->closeCursor();
        if($count > 0) {
            $select = "SELECT * FROM series WHERE id = ?";
            $resp = $con->prepare($select);
            $resp->execute([$id_serie]);
            $serie = $resp->fetch();
            $resp->closeCursor();

            $serie_condensador = $serie["serie_condensador"];
            $serie_evaporador = $serie["serie_evaporizador"];

            $insert = "INSERT INTO detalle_series (id, serie_condensador, serie_evaporizador, detalle_id, serie_id, producto_id, user_id, order_id) VALUES (null, ?, ?, ?, ?, ?, ?, ?)";
            $resp = $con->prepare($insert);
            $resp->execute([$serie_condensador, $serie_evaporador, $detalle_id, $id_serie, $serie["producto_id"], $_SESSION["id"], $orden_id]);
            $resp->closeCursor();

            $update = "UPDATE series SET estatus = 'Vendido' WHERE id = ?";
            $resp = $con->prepare($update);
            $resp->execute([$id_serie]);
            $resp->closeCursor();
        }
        
    }
    
    /* foreach($series as $serie){
        $insertar = "INSERT INTO detalle_series (id, numero, producto_id, orden_id) VALUES (null, ?, ?, ?)";
        $resp = $con->prepare($insertar);
        $resp->execute([$serie, $id, $orden_id]);
        $resp->closeCursor();
    } */
} 

function  comprobarStock($con, $id, $cantidad, $tabla){

    $select = "SELECT * FROM $tabla WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id]);
    $producto = $resp->fetch();
    $resp->closeCursor();
    
    $stock = $producto["stock"];
    $nuevo_stock = $stock - $cantidad;

    if($nuevo_stock < 0){
        return false;
    }else{
        return true;
    }
    
    
}


//--------------------------------LOGICA-----------------------


    $select = "SELECT COUNT(*) FROM ordenes WHERE id = ?";
    $resp = $con->prepare($select);
    $resp->execute([$id_orden]);
    $count = $resp->fetchColumn();
    $resp->closeCursor();

    if($count > 0){
        
        $select = "SELECT * FROM ordenes WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id_orden]);
        $orden = $resp->fetch();
        $resp->closeCursor();

       $total_orden = $orden["total"];
       $utilidad_orden = $orden["utilidad"];
       

        $select = "SELECT * FROM $tabla WHERE id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id]);
        $producto = $resp->fetch();
        $resp->closeCursor();

        
        $precio = $producto["precio"];
       
       
        $descripcion = $producto["descripcion"];
        if($tabla == "inventario"){
            $cantidad = count($series);
            $utilidad = $producto["precio"] - $producto["costo"];
            
        }else{
            $cantidad = $_POST["cantidad"];
            $utilidad = $producto["precio"];
        }
        $importe = $precio * $cantidad;

        $select = "SELECT COUNT(*) FROM detalle_orden WHERE producto_id = ? AND categoria = ? AND orden_id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$id, $tabla, $id_orden]);
        $countDetalle = $resp->fetchColumn();
        $resp->closeCursor();
        
        
        if($countDetalle > 0){

            if($tabla !== "servicios"){
                $stockOK = comprobarStock($con, $id, $cantidad, $tabla);
            }else{ 
                $stockOK = true;
            }

            if($stockOK == true){

                $select = "SELECT * FROM detalle_orden WHERE producto_id = ? AND categoria = ? AND orden_id = ?";
            $resp = $con->prepare($select);
            $resp->execute([$id, $tabla, $id_orden]);
            $detalle = $resp->fetch();
            $resp->closeCursor();

            $detalle_id = $detalle["id"];
            $cantidad_actual = $detalle["cantidad"];
            $importe_actual = $detalle["importe"];
            $utilidad_actual = $detalle["utilidad"];

            
         

            $nueva_cantidad = $cantidad_actual + $cantidad;
            $nuevo_importe = $importe_actual + $importe;
            $nueva_utilidad = $utilidad_actual + $utilidad;

            if($tabla !== "servicios"){
                $comprobarStock = comprobarStock($con, $id, $cantidad, $tabla);
            }else{
                $comprobarStock = true;
            }

            

            if($comprobarStock == true){

                if($tabla== "inventario"){
                    trabajarSeries($con, $series, $id_orden, $detalle_id);
    
                     //Actualizar stock del producto
                     $update = "UPDATE $tabla SET stock = stock - ? WHERE id = ?";
                        $resp = $con->prepare($update);
                        $resp->execute([$cantidad, $id]);
                        $resp->closeCursor();
    
                }else if( $tabla == "refacciones"){
                     //Actualizar stock del producto
                        $update = "UPDATE $tabla SET stock = stock - ? WHERE id = ?";
                            $resp = $con->prepare($update);
                            $resp->execute([$cantidad, $id]);
                            $resp->closeCursor();
                }

                $update = "UPDATE detalle_orden SET cantidad = ?, importe = ? WHERE producto_id = ? AND categoria = ?";
                $resp = $con->prepare($update);
                $resp->execute([$nueva_cantidad, $nuevo_importe, $id, $tabla]);
                $resp->closeCursor();
    
                $response = array("status"=>true, "mensj"=>"Orden actualizada con exito");
                $importe = $importe + floatval($_POST["comision"]);
                /* print_r("importe: ".$importe); */
                setearNuevosDatosdeOrden($con, $id_orden, $importe, $utilidad);
            }else{
                $response = array("status"=>false, "mensj"=>"La cantidad supera el stock");
            }

            

            }else{
                $response = array("status"=>false, "mensj"=>"La cantidad supera el stock");
            }

            

        }else{
           
           
            if($tabla !== "servicios"){
                $stockOK = comprobarStock($con, $id, $cantidad, $tabla);
            }else{
                $stockOK = true;
            }
            

            if($stockOK == true){

                $insertar = "INSERT INTO detalle_orden (id, descripcion, cantidad, precio_unitario, importe, utilidad, producto_id, user_id, orden_id, categoria) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $resp = $con->prepare($insertar);
            $resp->execute([$descripcion, $cantidad, $precio, $importe, $utilidad, $id, $_SESSION["id"], $id_orden, $tabla]);
            $resp->closeCursor();
            $importe = $importe + floatval($_POST["comision"]);
            /* print_r($importe); */
            setearNuevosDatosdeOrden($con, $id_orden, $importe, $utilidad);
            $response = array("status"=>true, "mensj"=>"Orden actualizada con exito");

            if($tabla== "inventario"){
                $last_id = $con->lastInsertId();
                trabajarSeries($con, $series, $id_orden, $last_id);
                 //Actualizar stock del producto
                 $update = "UPDATE $tabla SET stock = stock - ? WHERE id = ?";
                    $resp = $con->prepare($update);
                    $resp->execute([$cantidad, $id]);
                    $resp->closeCursor();

            }else if( $tabla == "refacciones"){
                 //Actualizar stock del producto
                    $update = "UPDATE $tabla SET stock = stock - ? WHERE id = ?";
                        $resp = $con->prepare($update);
                        $resp->execute([$cantidad, $id]);
                        $resp->closeCursor();
            }

            }else{
                $response = array("status"=>false, "mensj"=>"Esa cantidad supera el stock");
            }
            

            

            
        
        }

        if($_POST["comision"] != 0){
            $insertar = "INSERT INTO detalle_orden (id, descripcion, cantidad, precio_unitario, importe, utilidad, producto_id, user_id, orden_id, categoria) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $resp = $con->prepare($insertar);

            $descripcion_comision = "Comision pago con tarjeta";
            $comision = floatval($_POST["comision"]);
            
            $resp->execute([$descripcion_comision, '1', $comision, $comision, $comision, 0, $_SESSION["id"], $id_orden, 'Costo extra']);
            $resp->closeCursor();

        }





    } else {
       
    }

  

    

   
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE); 


}


?>