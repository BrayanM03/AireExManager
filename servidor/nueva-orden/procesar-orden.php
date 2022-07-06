<?php
  
    session_start();
    include '../database/conexion.php';
    
    date_default_timezone_set("America/Matamoros");

    $id_direccion = $_POST['id_direccion'];
    $id_cliente = $_POST['id_cliente'];
    $tipo = $_POST['tipo'];

    print_r($_POST);

?>