<?php


    session_start();
    include '../database/conexion.php';
    
     date_default_timezone_set("America/Matamoros");

    if (!$con) {
        echo "maaaaal";
    }

    if (!isset($_SESSION['user'])) {
    header("Location:../../static/login.php");
    }

   $arrResultado=array();

   $id_cliente = $_POST['id_cliente'];
   $nombre = $_POST["razon_social"];
   $telefono = $_POST["telefono"];
   $rfc = $_POST["rfc"];
   $contacto = $_POST["contacto"];
   $estaus = "Activo";
   $fecha = date("Y-m-d"); 
   $direcciones = json_decode($_POST["direcciones"], true);
   $correos = json_decode($_POST["correos"], true);
   $cuentas = json_decode($_POST["cuentas"], true);
   $trash_flag = "No borrar";

   function setearTrashFlag($id_cliente, $con, $tabla){
       $trash_flag = "borrar";
    $actualizar_direccion = "UPDATE $tabla SET trash_flag = ? WHERE id_usuario = ?";

    $res = $con->prepare($actualizar_direccion);
    $res->bindParam(1,$trash_flag);
    $res->bindParam(2,$id_cliente);
    $res->execute();
    $res->closeCursor();
   }

   //Setando banderas de borrado
   setearTrashFlag($id_cliente, $con, "detalle_direccion");
   setearTrashFlag($id_cliente, $con, "detalle_correo");
   setearTrashFlag($id_cliente, $con, "detalle_cuenta_bancaria");

   function ingresarDireccion($id_cliente, $con, $element, $trash_flag) {

    $insert_detail_customer = "INSERT INTO detalle_direccion(id, calle, colonia, numero_int, numero_ext, cp, ciudad, municipio, estado, pais, id_usuario, trash_flag) VALUES(null,?,?,?,?,?,?,?,?,?,?,?)";
            $result = $con->prepare($insert_detail_customer);
            $result->bindParam(1,$element["calle"]);
            $result->bindParam(2,$element["colonia"]);
            $result->bindParam(3,$element["interior"]);
            $result->bindParam(4,$element["exterior"]);
            $result->bindParam(5,$element["cp"]);
            $result->bindParam(6,$element["ciudad"]);
            $result->bindParam(7,$element["municipio"]);
            $result->bindParam(8,$element["estado"]);
            $result->bindParam(9,$element["pais"]);
            $result->bindParam(10,$id_cliente);
            $result->bindParam(11,$trash_flag);

            $result->execute();
            $result->closeCursor();

}

  function ingresarCorreo($id_cliente, $con, $element, $trash_flag){
    $insert_detail_customer = "INSERT INTO detalle_correo(id, etiqueta, correo, id_usuario, trash_flag) VALUES(null,?,?,?,?)";
    $res = $con->prepare($insert_detail_customer);
    $res->bindParam(1,$element["etiqueta"]);
    $res->bindParam(2,$element["correo"]);
    $res->bindParam(3,$id_cliente);
    $res->bindParam(4,$trash_flag);

    $res->execute();
    $res->closeCursor();
  }

  function ingresarCuenta($id_cliente, $con, $element, $trash_flag){
    $insert_detail_customer = "INSERT INTO detalle_cuenta_bancaria(id, nombre, cuenta, banco, rfc_banco, id_usuario, trash_flag) VALUES(null,?,?,?,?,?,?)";
    $res = $con->prepare($insert_detail_customer);
    $res->bindParam(1,$element["nombre_cuenta"]);
    $res->bindParam(2,$element["no_cuenta"]);
    $res->bindParam(3,$element["banco"]);
    $res->bindParam(4,$element["rfc_banco"]);
    $res->bindParam(5,$id_cliente);
    $res->bindParam(6,$trash_flag);

    $res->execute();
    $res->closeCursor();
  }

 function eliminarDatos($id_cliente, $con, $tabla){
     $trash_flag = "borrar";
    $delete_detail_customer = "DELETE FROM $tabla WHERE trash_flag = ? AND id_usuario =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$trash_flag);
    $res->bindParam(2,$id_cliente);
    $res->execute();
    $res->closeCursor();
 }

  

   $comprobar_usuario = "SELECT COUNT(*) FROM clientes WHERE id= ?";
   $res = $con->prepare($comprobar_usuario);
   $res->execute([$id_cliente]);
   $total = $res->fetchColumn();
   $res->closeCursor();
 
   if ($total > 0) {


    $post_total_direcciones = count($direcciones);
    $post_total_correos =  count($correos);
    $post_total_cuentas =  count($cuentas);


    //Traer total de direccion que coicidan con el id del cliente
/* 
    $contar_direccion = "SELECT COUNT(*) FROM detalle_direccion WHERE id_usuario = ?";
                $res = $con->prepare($contar_direccion);
                $res->execute([$id_cliente]);
                $total_direcciones_match_customer = $res->fetchColumn();
                $res->closeCursor(); */


    //Si el usuario envio mas de una direcion  comprobamos si esta ya existe en la base de datos
    if($post_total_direcciones > 0){
       
        foreach ($direcciones as $index => $element){

            if(empty($element["id_bd"])){
                echo "lol";
                ingresarDireccion($id_cliente, $con, $element, $trash_flag);

            }else{
              

                $comprobar_direccion = "SELECT COUNT(*) FROM detalle_direccion WHERE id = ?";
                $res = $con->prepare($comprobar_direccion);
                $res->execute([$element["id_bd"]]);
                $no_direcciones_encontradas = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_direcciones_encontradas > 0){
                   
                    $actualizar_direccion = "UPDATE detalle_direccion SET calle = ?,
                                                                          colonia = ?,
                                                                          numero_int = ?,
                                                                          numero_ext = ?,
                                                                          cp = ?,
                                                                          ciudad = ?, 
                                                                          municipio = ?, 
                                                                          estado = ?, 
                                                                          pais = ?,
                                                                          trash_flag = ?
                                                                          WHERE id = ?";
    
                    $res = $con->prepare($actualizar_direccion);
                    $res->bindParam(1,$element["calle"]);
                    $res->bindParam(2,$element["colonia"]);
                    $res->bindParam(3,$element["interior"]);
                    $res->bindParam(4,$element["exterior"]);
                    $res->bindParam(5,$element["cp"]);
                    $res->bindParam(6,$element["ciudad"]);
                    $res->bindParam(7,$element["municipio"]);
                    $res->bindParam(8,$element["estado"]);
                    $res->bindParam(9,$element["pais"]);
                    $res->bindParam(10,$trash_flag);
                    $res->bindParam(11,$element["id_bd"]);
                    $res->execute();
                    $res->closeCursor();
                }else{
    
                      ingresarDireccion($id_cliente, $con, $element, $trash_flag);

                }

            }
        

        }
    }

  
    if($post_total_correos > 0){
        foreach ($correos as $index => $element){

           

            if(empty($element["id_bd"])){

                ingresarCorreo($id_cliente, $con, $element, $trash_flag);

            }else{

                $comprobar_correo = "SELECT COUNT(*) FROM detalle_correo WHERE id = ?";
                $res = $con->prepare($comprobar_correo);
                $res->execute([$element["id_bd"]]);
                $no_correos_encontrados = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_correos_encontrados > 0){
                    $actualizar_correo = "UPDATE detalle_correo SET etiqueta = ?,
                                                                    correo = ?  
                                                                    WHERE id = ?";
    
                    $res = $con->prepare($actualizar_correo);
                    $res->bindParam(1,$element["etiqueta"]);
                    $res->bindParam(2,$element["correo"]);
                    $res->bindParam(3,$element["id_bd"]);
                    $res->execute();
                    $res->closeCursor();

                }else{
    
                    ingresarCorreo($id_cliente, $con, $element, $trash_flag);
    
                }

            }
        

            }
    }

    
    if($post_total_cuentas > 0){
        foreach ($cuentas as $index => $element){

           

            if(empty($element["id_bd"])){

                ingresarCuenta($id_cliente, $con, $element, $trash_flag);

            }else{

                $comprobar_cuenta = "SELECT COUNT(*) FROM detalle_cuenta_bancaria WHERE id = ?";
                $res = $con->prepare($comprobar_cuenta);
                $res->execute([$element["id_bd"]]);
                $no_cuentas_encontradas = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_cuentas_encontradas > 0){
                    $actualizar_cuenta = "UPDATE detalle_cuenta_bancaria SET nombre = ?,
                                                                             cuenta = ?,
                                                                             banco = ?,
                                                                             rfc_banco = ?  
                                                                             WHERE id = ?";
    
                    $res = $con->prepare($actualizar_cuenta);
                    $res->bindParam(1,$element["nombre_cuenta"]);
                    $res->bindParam(2,$element["no_cuenta"]);
                    $res->bindParam(3,$element["banco"]);
                    $res->bindParam(4,$element["rfc_banco"]);
                    $res->bindParam(5,$element["id_bd"]);
                    $res->execute();
                    $res->closeCursor();

                }else{
    
                    ingresarCuenta($id_cliente, $con, $element, $trash_flag);
    
                }

            }
        

            }
    }



   eliminarDatos($id_cliente, $con, "detalle_direccion");
   eliminarDatos($id_cliente, $con, "detalle_correo");
   eliminarDatos($id_cliente, $con, "detalle_cuenta_bancaria");
    
    print_r(1);


   }




?>