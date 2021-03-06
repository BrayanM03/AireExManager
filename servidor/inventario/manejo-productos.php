<?php
if ($_POST) {
    include "../database/conexion.php";
    include '../database/eliminar-dato.php';
    date_default_timezone_set('America/Matamoros');

    $delete = new Eliminar;
    $type = $_POST['type'];

    if($type == 'eliminacion') {
        $id_producto = $_POST['producto'];
        $relacion_id = "producto_id";
        $has_relation = true;

        $sentencia = $delete->eliminarDato("inventario", $id_producto, $has_relation, "series", $relacion_id, $con);
        echo json_encode($sentencia, JSON_UNESCAPED_UNICODE);


    }else if($type == 'actualizacion') {

        $proveedor = $_POST["proveedor"];
        $tonelaje = $_POST["tonelaje"];
        $modelo = $_POST["modelo"];
        $marca = $_POST["marca"];
        $precio = $_POST["precio"];
        $precio_con_inst = $_POST["precio_con_inst"];
        $costo = $_POST["costo"];
        $estatus = "Activo";
        $sucursal = $_POST["sucursal"];
        $id_producto = $_POST["id_producto"];
        $tipo = "Aire acondicionado";
        $descripcion = $_POST["descripcion"];

        $query = "UPDATE inventario SET proveedor = ?,
                                             tonelaje = ?,
                                             marca = ?,
                                             modelo = ?,
                                             costo = ?,
                                             precio = ?,
                                             precio_con_inst = ?,
                                             estatus = ?,
                                             sucursal = ?,
                                             descripcion = ? WHERE id =?";
        $resp = $con->prepare($query);
        $resp->bindParam(1, $proveedor);                                     
        $resp->bindParam(2, $tonelaje);
        $resp->bindParam(3, $marca);
        $resp->bindParam(4, $modelo);
        $resp->bindParam(5, $costo);
        $resp->bindParam(6, $precio);
        $resp->bindParam(7, $precio_con_inst);
        $resp->bindParam(8, $estatus);
        $resp->bindParam(9, $sucursal);   
        $resp->bindParam(10, $descripcion);
        $resp->bindParam(11, $id_producto);   
        $resp->execute();
        $resp->closeCursor();  
        
        print_r(1);
        
    }
}


?>