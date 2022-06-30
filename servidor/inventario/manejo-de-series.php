<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

   
    $type = $_POST["type"];
    $tipo = "Aire acondicionado";


    function validarSerieRepetidad($con, $serie){

        $consultar = $con->prepare("SELECT COUNT(*) FROM series WHERE serie_condensador  = ? OR serie_evaporizador =?");
        $consultar->execute([$serie, $serie]);
        $total = $consultar->fetchColumn();

        if($total > 0){
            return false;
        }else{
            return true;
        }

    }


    if($type == "insercion"){

        $validate1 = validarSerieRepetidad($con, $serie_condensador);
        $validate2 = validarSerieRepetidad($con, $serie_evaporizador);
        $fecha_compra = $_POST["fecha"];
        $serie_condensador = $_POST["serie_cond"]; 
        $serie_evaporizador = $_POST["serie_evap"];
        $producto_id = $_POST["producto"];

        if($validate1 == true && $validate2 == true){
            $insercion_serie = "INSERT INTO series(id, 
            fecha_compra,
            serie_condensador,
            serie_evaporizador,
            producto_id,
            tipo) VALUES(null, ?,?,?,?,?)";//:fecha, :serie_co, :serie_ev, :id, :tipo
            $resp = $con->prepare($insercion_serie);
            $data = [$fecha_compra, $serie_condensador, $serie_evaporizador, $producto_id, $tipo];
            $resp->execute($data);

            $response = array("mensj"=>"Se insertaron las series, stock actualizado.",
                              "status"=> true,
                              );
        }else{
            $response = array("mensj"=> "Al parecer hay una serie repetida, deberias revisarla...",
                              "status"=> false,
                              );
        }

        

    }

    if($type == "eliminacion"){
        $id_serie = $_POST["serie"];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    

}

?>