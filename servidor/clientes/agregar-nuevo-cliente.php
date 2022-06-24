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
  

    if ($_POST) {

           $nombre = $_POST["razon_social"];
           $telefono = $_POST["telefono"];
           $rfc = $_POST["rfc"];
           $contacto = $_POST["contacto"];
           $estaus = "Activo";
           $fecha = date("Y-m-d"); 
           $direcciones = json_decode($_POST["direcciones"], true);
           $correos = json_decode($_POST["correos"], true);
           $cuentas = json_decode($_POST["cuentas"], true);
       

           $insert_customer = "INSERT INTO clientes(id, nombre, telefono, rfc, contacto, estatus, fecha_ingreso) VALUES(null,?,?,?,?,?,?)";
           $resultado = $con->prepare($insert_customer);
           if($resultado){
             $resultado->bindParam(1,$nombre);
             $resultado->bindParam(2,$telefono);
             $resultado->bindParam(3,$rfc);
             $resultado->bindParam(4,$contacto);
             $resultado->bindParam(5,$estaus);
             $resultado->bindParam(6,$fecha);

             $resultado->execute();
             $id_cliente = $con->lastInsertId();

  
            
              

                foreach ($direcciones as $index => $element){
                
                $insert_detail_customer = "INSERT INTO detalle_direccion(id, calle, colonia, numero_int, numero_ext, cp, ciudad, municipio, estado, pais, id_usuario) VALUES(null,?,?,?,?,?,?,?,?,?,?)";
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
   
                $result->execute();

              }

              foreach ($correos as $index => $element){

                $insert_detail_customer = "INSERT INTO detalle_correo(id, etiqueta, correo, id_usuario) VALUES(null,?,?,?)";
        
                $result = $con->prepare($insert_detail_customer);
                $result->bindParam(1,$element["etiqueta"]);
                $result->bindParam(2,$element["correo"]);
                $result->bindParam(3,$id_cliente);
                $result->execute();
              }

              foreach ($cuentas as $index => $element){

                $insert_detail_customer = "INSERT INTO detalle_cuenta_bancaria(id, nombre, cuenta, banco, rfc_banco, id_usuario) VALUES(null,?,?,?,?,?)";
               
                $result = $con->prepare($insert_detail_customer);
                $result->bindParam(1,$element["nombre_cuenta"]);
                $result->bindParam(2,$element["no_cuenta"]);
                $result->bindParam(3,$element["banco"]);
                $result->bindParam(4,$element["rfc_banco"]);
                $result->bindParam(5,$id_cliente);
                $result->execute();
              }

             print_r(1);

           }else{
                $arrResultado['error']='Hubo un fallo en la consulta: '.$connect->error;
                 print_r($arrResultado);
           }
          

}


    ?>
