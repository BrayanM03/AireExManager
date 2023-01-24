<?php
$id_producto = $_POST['id_producto'];
$categoria = $_POST['categoria'];

$path = "../../static/img/productos/$categoria/P$id_producto/";
$path_base = "../../static/img/productos/$categoria/P$id_producto";

if (!file_exists($path_base)) {
    mkdir($path_base, 0777, true);
}

$folder = basename($path);
$files = array_values(array_diff(scandir($path), array('.', '..')));
//array_shift($files);
$fi = new FilesystemIterator($path, FilesystemIterator::SKIP_DOTS);
$total_imagenes = iterator_count($fi);

$resp=array("total_imagenes" => $total_imagenes, "folder"=>$folder, "files"=>$files, "post"=> $_POST);
echo json_encode($resp, JSON_UNESCAPED_UNICODE);
?>