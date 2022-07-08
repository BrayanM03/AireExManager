<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

   
    $type = $_POST["type"];
    $tipo = "Aire acondicionado";
    $estatus = "Activo";

    //Funciones
    function validarSerieRepetidad($con, $serie, $producto_id){

            $consultar = $con->prepare("SELECT COUNT(*) FROM series WHERE (serie_condensador  = ? OR serie_evaporizador =?) AND producto_id = ?");
            $consultar->execute([$serie, $serie, $producto_id]);
            $total = $consultar->fetchColumn();
    
            if($total > 0){
                return false;
            }else{
                return true;
            }

        
    }

    
    function setStock($con, $producto_id, $tipo_operacion){
        
        $consult = "SELECT COUNT(*) FROM inventario WHERE id = ?";
        $rep = $con->prepare($consult);
        $rep->execute([$producto_id]);
        $total = $rep->fetchColumn();

        if($total > 0){
            $consult = "SELECT stock FROM inventario WHERE id = ?";
            $rep = $con->prepare($consult);
            $rep->execute([$producto_id]);
            $stock = $rep->fetchColumn();
            $rep->closeCursor();

            if($tipo_operacion == "insercion"){

                $nuevo_stock = $stock + 1;
              
            }else if($tipo_operacion == "eliminacion"){
                $nuevo_stock = $stock - 1;
            }

              //Actualizando stock
              $update = "UPDATE inventario SET stock = ? WHERE id = ?";
              $rep = $con->prepare($update);
              $rep->execute([$nuevo_stock, $producto_id]);
              $rep->closeCursor();

              return true;

        }else{
            return false;
        }

    };


    if($type == "insercion"){

 
        $fecha_compra = $_POST["fecha"];
        $serie_condensador = $_POST["serie_cond"]; 
        $serie_evaporizador = $_POST["serie_evap"];
        $producto_id = $_POST["producto"];

        $validate1 = validarSerieRepetidad($con, $serie_condensador, $producto_id);
        $validate2 = validarSerieRepetidad($con, $serie_evaporizador, $producto_id);

        if($validate1 == true && $validate2 == true){

            $set_stock = setStock($con, $producto_id, $type);

            if($set_stock == true){

                $insercion_serie = "INSERT INTO series(id, 
            fecha_compra,
            serie_condensador,
            serie_evaporizador,
            producto_id,
            tipo,
            estatus) VALUES(null, ?,?,?,?,?,?)";//:fecha, :serie_co, :serie_ev, :id, :tipo
            $resp = $con->prepare($insercion_serie);
            $data = [$fecha_compra, $serie_condensador, $serie_evaporizador, $producto_id, $tipo, $estatus];
            $resp->execute($data);

            $response = array("mensj"=>"Se insertaron las series, stock actualizado.",
                              "status"=> true,
                              );
            }else{
                $response = array("mensj"=>"El producto no se encontro en la base de datos.",
                "status"=> false,
                ); 
            }

            
        }else{
            $response = array("mensj"=> "Al parecer hay una serie repetida, deberias revisarla...",
                              "status"=> false,
                              );
        }

        

    }

    if($type == "eliminacion"){
        $id_serie = $_POST["serie"];
        $producto_id = $_POST["producto"];
        $set_stock = setStock($con, $producto_id, $type);

        if ($set_stock == true) {
            $eliminar = "DELETE FROM series WHERE id =?";
            $resp = $con->prepare($eliminar);
            $resp->execute([$id_serie]);
            $resp->closeCursor();

            $response = array("mensj"=> "Series eliminadas correctamente",
                              "status"=> true,
                              );
        }  else {

            $response = array("mensj"=>"El producto no se encontro en la base de datos.",
                "status"=> false,
                ); 
        }                  
    
    }

    if($type== "actualizacion"){

        $id_serie = $_POST["serie"];
        $producto_id = $_POST["producto"];
        $serie_condensador = $_POST["serie_cond"]; 
        $serie_evaporizador = $_POST["serie_evap"];
        $fecha_compra = $_POST["fecha_compra"];

        $validate1 = validarSerieRepetidad($con, $serie_condensador, $producto_id);
        $validate2 = validarSerieRepetidad($con, $serie_evaporizador, $producto_id);

        if($validate1 == true || $validate2 == true){

            $eliminar = "UPDATE series SET fecha_compra = ?, serie_condensador = ?, serie_evaporizador = ? WHERE id =?";
            $resp = $con->prepare($eliminar);
            $resp->execute([$fecha_compra, $serie_condensador, $serie_evaporizador, $id_serie]);
            $resp->closeCursor();

            $response = array("mensj"=> "Series actualizadas correctamente",
                              "status"=> true,
                              );

        }else{

            $eliminar = "UPDATE series SET fecha_compra = ? WHERE id =?";
            $resp = $con->prepare($eliminar);
            $resp->execute([$fecha_compra, $id_serie]);
            $resp->closeCursor();

            $response = array("mensj"=> "Las dos son las mismas series, pero ok ...",
                              "status"=> false,
                              );
        } 

    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}

?>