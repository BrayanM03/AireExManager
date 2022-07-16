
<?php

session_start();
include '../database/conexion.php';

 date_default_timezone_set("America/Matamoros");

if(isset($_POST["traer-token"])){

    $sqltoken="SELECT * FROM token";

    $result = $con->prepare($sqltoken);
    $result->execute();
    while ($row = $result->fetch()) {
        $arrayInven = $row;
    }
   

    echo json_encode($arrayInven, JSON_UNESCAPED_UNICODE);
    
}


///A partir de aqui ponerlo en otro archivo para que el token no se muestre en la pantall de venta

if(isset($_POST["token"])){

    $token = $_POST["token"];

    $sqlUpdatetoken="UPDATE token SET codigo = ?";

    $res = $con->prepare($sqlUpdatetoken);
    $res->execute([$token]);
    

    print_r(1);
} 


if (isset($_POST["comprobar-token"])) {

    $token_in = $_POST["comprobar-token"];
    $new_token = $_POST["nuevo-token"];

    $sqlComprobartoken= $con->prepare("SELECT codigo FROM token WHERE codigo = ?");
    $sqlComprobartoken->execute([$token_in]);
    $toke = $sqlComprobartoken->fetchColumn();
    $sqlComprobartoken->closeCursor();

    if ($token_in == $toke) {
       

        $sqlUpdatetoken="UPDATE token SET codigo = ?";
        $result = $con->prepare($sqlUpdatetoken);
        $result->execute([$new_token]);
        print_r(3);

    }else{
        print_r(4);
    }


}




?>