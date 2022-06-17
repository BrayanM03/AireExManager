<?php
$usuario = "root";
$pass = "";
try {
    $con = new PDO('mysql:host=localhost;dbname=aire_express', $usuario, $pass);
   
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>