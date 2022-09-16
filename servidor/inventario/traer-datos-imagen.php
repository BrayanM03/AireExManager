<?php
$id_producto = $_POST['id_producto'];
$categoria = $_POST['categoria'];

$path = "../../static/img/productos/$categoria/P$id_producto/";
$folder = basename($path);
$files = array_values(array_diff(scandir($path), array('.', '..')));
array_shift($files);
$fi = new FilesystemIterator($path, FilesystemIterator::SKIP_DOTS);
$total_imagenes = iterator_count($fi)-1;
if($total_imagenes == 1){
    $arreglo = array("name" => "P01");
}else if ($total_imagenes == 2){
    $arreglo = array("name" => "P02");
}else if ($total_imagenes == 3){
    $arreglo = array("name" => "P03");
}else if($total_imagenes == 4){
    $arreglo = array("name" => "P04");
}else if ($total_imagenes == 5){
    $arreglo = array("name" => "P05");
}
$resp=array("total_imagenes" => $total_imagenes, "folder"=>$folder, "files"=>$files);
echo json_encode($resp, JSON_UNESCAPED_UNICODE);
?>