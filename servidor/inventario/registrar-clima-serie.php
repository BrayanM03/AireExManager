<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $proveedor = $_POST["proveedor"];
    $descripcion = $_POST["descripcion"];
    $tonelaje = $_POST["tonelaje"];
    $modelo = $_POST["modelo"];
    $marca = $_POST["marca"];
    $cantidad = $_POST["cantidad"];
    $precio = $_POST["precio"];
    $costo = $_POST["costo"];
    $estatus = "Activo";
    $sucursal = $_POST["sucursal"];
    $categoria = "Producto";

   
    $tipo = "Aire acondicionado";
    $has_series = $_POST["has_series"];
    
 


    $insercion = "INSERT INTO inventario(id, 
                                         proveedor, 
                                         tonelaje, 
                                         marca, 
                                         modelo, 
                                         costo,
                                         precio,
                                         stock,
                                         estatus,
                                         sucursal,
                                         categoria,
                                         descripcion) VALUES(null,?,?,?,?,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insercion);
    $resp->bindParam(1, $proveedor);                                     
    $resp->bindParam(2, $tonelaje);
    $resp->bindParam(3, $marca);
    $resp->bindParam(4, $modelo);
    $resp->bindParam(5, $costo);
    $resp->bindParam(6, $precio);
    $resp->bindParam(7, $cantidad);
    $resp->bindParam(8, $estatus);
    $resp->bindParam(9, $sucursal);
    $resp->bindParam(10, $categoria);
    $resp->bindParam(11, $descripcion);
    $resp->execute();
    $resp->closeCursor();

    $id_prod = $con->lastInsertId();


    if($has_series == 1){

        $series = json_decode($_POST['series']);
        $fecha_compra = $_POST["fecha_compra"];

        $insercion_serie = "INSERT INTO series(id, 
    fecha_compra,
    serie_condensador,
    serie_evaporizador,
    producto_id,
    tipo,
    estatus) VALUES(null, ?,?,?,?,?,?)";//:fecha, :serie_co, :serie_ev, :id, :tipo
    $resp = $con->prepare($insercion_serie);
    

    foreach ($series as $key => $value) {
        
        $serie_condensador = $value[0];
        $serie_vaporizador = $value[1];
        $data = [$fecha_compra, $serie_condensador, $serie_vaporizador, $id_prod, $tipo, $estatus];

        $resp->execute($data);
       
    }

    }
    

    print_r(1);
    
    
 


  
   

}



?>