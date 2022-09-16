<?php
    include "../database/conexion.php";


$producto_id = $_POST['id_producto'];
$categoria = $_POST['categoria'];
$nombre_archivo = $_POST['name_file'];


$folder_product = "P" . $producto_id;
$folder = "../../static/img/productos/$categoria/$folder_product";


if(unlink($folder. "/".$nombre_archivo .".jpg")){

    if($nombre_archivo == "P1"){
        $update="UPDATE inventario SET img = ? WHERE id =?";
        $resp = $con->prepare($update);
        $carp ="NA";
        $resp->execute([$carp, $producto_id]);
        $resp->closeCursor();
    }

    $response = array("status"=> "success", 
    "message"=>"Eliminado correctamente",
    );
}else{
    $response = array("status"=> "error", 
    "message"=>"No se pudo eliminar el archivo",
    );
};

echo json_encode($response, JSON_UNESCAPED_UNICODE);


?>