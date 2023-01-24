<?php
$usuario = "root";
$pass = "root";
try {
    $con = new PDO('mysql:host=localhost;dbname=aire_express;charset=utf8mb4', $usuario, $pass);
   
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>