<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $proveedor = $_POST["proveedor"];
    $tonelaje = $_POST["tonelaje"];
    $modelo = $_POST["modelo"];
    $marca = $_POST["marca"];
    $cantidad = $_POST["cantidad"];
    $precio = $_POST["precio"];
    $costo = $_POST["costo"];
    $fecha_compra = "2022-06-1997";
    $estatus = "activo";
    $series = json_decode($_POST['series']);
 


    /* $insercion = "INSERT INTO inventario(id, 
                                         proveedor, 
                                         fecha_compra, 
                                         tonelaje, 
                                         marca, 
                                         modelo, 
                                         estatus, 
                                         stock) VALUES(null,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insercion);
    $resp->bindParam(1, $proveedor);
    $resp->bindParam(2, $fecha_compra);                                     
    $resp->bindParam(3, $tonelaje);
    $resp->bindParam(4, $marca);
    $resp->bindParam(5, $modelo);
    $resp->bindParam(6, $estatus);
    $resp->bindParam(7, $cantidad);
    $resp->execute();
    $resp->closeCursor();

    $id_prod = $con->lastInsertId(); */


  

    foreach ($series as $key => $value) {
        $series_item = json_decode($value);
        print_r($key . " -> " .$series_item);
    }
   
    
 /*    $insercion_serie = "INSERT INTO inventario(id, 
                                         proveedor, 
                                         fecha_compra, 
                                         tonelaje, 
                                         marca, 
                                         modelo, 
                                         estatus, 
                                         stock) VALUES(null,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insercion);
    $resp->bindParam(1, $proveedor);
    $resp->bindParam(2, $fecha_compra);                                     
    $resp->bindParam(3, $tonelaje);
    $resp->bindParam(4, $marca);
    $resp->bindParam(5, $modelo);
    $resp->bindParam(6, $estatus);
    $resp->bindParam(7, $cantidad);
    $resp->execute();
    $resp->closeCursor(); */


  
   

}



?>