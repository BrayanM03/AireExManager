<?php
if ($_POST) {
    session_start();
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $nombre = $_POST["nombre"];
    $no_empleado = $_POST["no_empleado"];
    $area = $_POST["area"];
    $fecha = $_POST["fecha"];
    $hora = date("H:i:s");
    $nombre_user = $_SESSION["nombre"] . " " . $_SESSION["apellido"];
    $ID_USER = $_SESSION["id"];
    $sucursal = $_POST["sucursal"];

    function stockActual($con, $id_producto){
        $traer_stock = "SELECT * FROM inventario WHERE id = ?";
        $re = $con->prepare($traer_stock);
        $re->execute([$id_producto]);
    
        while($row = $re->fetch(PDO::FETCH_OBJ)){
            $stock_actual = $row->stock;
        }
        return $stock_actual;
    }
    



    $insert = "INSERT INTO salidas(id,
                                       nombre,
                                        no_empleado,
                                       area,
                                       fecha,
                                       hora,
                                       usuario_nombre,
                                       usuario_id,
                                       sucursal_id)VALUES(null,?,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insert);
    $resp->execute([$nombre, $no_empleado, $area, $fecha, $hora, $nombre_user, $ID_USER, $sucursal]);
    $resp->closeCursor();
    $last_id = $con->lastInsertId();

        $contar = "SELECT * FROM pre_salida WHERE usuario_id = ?";
        $re = $con->prepare($contar);
        $re->execute([$ID_USER]);

        while($row = $re->fetch(PDO::FETCH_OBJ)){
            $cant = $row->cantidad;
            $codigo = $row->codigo;
            $concepto = $row->concepto;
            $producto_id = $row->producto_id;

            $stock_actual = stockActual($con, $producto_id);
            $cantidad_restante = $stock_actual - $cant;
            $update = "UPDATE inventario SET stock = ? WHERE id = ?";
            $resp = $con->prepare($update);
            $resp->execute([$cantidad_restante, $producto_id]);
            $resp->closeCursor();

            $insert = "INSERT INTO detalle_salida(id,
                                                       codigo,
                                                       concepto,
                                                       producto_id,
                                                       cantidad,
                                                       salida_id,
                                                       usuario_id)VALUES(null,?,?,?,?,?,?)";
            $resp = $con->prepare($insert);
            $resp->execute([$codigo, $concepto, $producto_id, $cant, $last_id, $ID_USER]);
            $resp->closeCursor();
        }
       


    $response = array("status"=>true, "mensj"=>"El registro se insertó correctamente", "id_nuevo"=> $last_id);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}

?>