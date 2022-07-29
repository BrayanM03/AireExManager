<?php

include '../database/conexion.php';


//require '../../vistas/vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

//require '../../vendor/autoload.php';

 require_once '../../vendor/phpoffice/phpspreadsheet/samples/Bootstrap.php'; 
date_default_timezone_set("America/Matamoros");
session_start(); 

$nombre_del_usuario = $_SESSION["nombre"] . " ". $_SESSION["apellido"];
$año = date("Y");
$fecha= $_GET["fecha"];
$sucursal = $_GET["sucursal"];
$count = 0;  
    

        //Creamos objeto de hoja de excel
        $spreadsheet = new SpreadSheet();
        $spreadsheet->getProperties()->setCreator($nombre_del_usuario)->setTitle("Primer excel");

        //ITERACIONES
      
            
            //Esablecemos y obtenemos la primera hoja activa -- 

            $spreadsheet->createSheet();
            
            $spreadsheet->setActiveSheetIndex(0);
            $hoja_activa = $spreadsheet->getActiveSheet();
            $hoja_activa->setTitle("Reporte " . $fecha);

            //$categoria = 'computadorascat';

            $arreglo = Consulta($con, $fecha, $sucursal);

          
            
            $cantidad_resultado = count($arreglo);
        

           //Validamos si se encontraron registros en la tabla, se valida 
           if ($cantidad_resultado == 0) {
            //Establecemos cabezera del reporte
           //Combinar y centrar
           $hoja_activa->mergeCells("A1:B1");
           $hoja_activa->mergeCells("C1:H1");
           $hoja_activa->mergeCells("I1:J1");
           $hoja_activa->setCellValue('C1', 'No se registraron ventas');
           $hoja_activa->getStyle('C1')->getFont()->setBold(true);
           $hoja_activa->getStyle('C1')->getFont()->setSize(16);
           $hoja_activa->getRowDimension('1')->setRowHeight(50);
           $hoja_activa->getStyle('A1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('A1')->getAlignment()->setVertical('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setVertical('center');

           //Establecer logos
           $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
           $drawing->setName('LogoPSC');
           $drawing->setDescription('Logo');
           $drawing->setPath('../../static/img/logo.jpg'); // put your path and image here
      
           $drawing->setOffsetX(20);
           $drawing->setWidth(80);
           $drawing->setHeight(63);
           $drawing->setWorksheet($hoja_activa);
           
           $drawingOxxo_logo = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
           $drawingOxxo_logo->setName('LogoPSC');
           $drawingOxxo_logo->setDescription('Logo');
           $drawingOxxo_logo->setPath('../../static/img/logo.jpg'); // put your path and image here
           $drawingOxxo_logo->setCoordinates('I1');
           $drawingOxxo_logo->setOffsetX(20);
           $drawingOxxo_logo->setWidth(120);
           $drawingOxxo_logo->setHeight(63);
           $drawingOxxo_logo->setWorksheet($hoja_activa);

           $mensaje_error = "No se econtro nada.";
           $datos = array("mensaje"=>$mensaje_error, "status"=>false); 
          
           $count++; 
           
        
       }else{

           

           //Establecemos cabezera del reporte
           //Combinar y centrar
           $hoja_activa->mergeCells("A1:B1");
           $hoja_activa->mergeCells("C1:H1");
           $hoja_activa->mergeCells("I1:J1");
           $hoja_activa->setCellValue('C1', 'Reporte de ventas del ' . $fecha);
           $hoja_activa->getStyle('C1')->getFont()->setBold(true);
           $hoja_activa->getStyle('C1')->getFont()->setSize(16);
           $hoja_activa->getRowDimension('1')->setRowHeight(50);
           $hoja_activa->getStyle('A1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('A1')->getAlignment()->setVertical('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setVertical('center');

           //Establecer logos
           $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
           $drawing->setName('LogoPSC');
           $drawing->setDescription('Logo');
           $drawing->setPath('../../static/img/logo.jpg'); // put your path and image here
           $drawing->setCoordinates('A1');
           $drawing->setOffsetX(20);
           $drawing->setWidth(80);
           $drawing->setHeight(63);
           $drawing->setWorksheet($hoja_activa);
           
           $drawingOxxo_logo = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
           $drawingOxxo_logo->setName('LogoPSC');
           $drawingOxxo_logo->setDescription('Logo');
           $drawingOxxo_logo->setPath('../../static/img/logo.jpg'); // put your path and image here
           $drawingOxxo_logo->setCoordinates('I1');
           $drawingOxxo_logo->setOffsetX(20);
           $drawingOxxo_logo->setWidth(120);
           $drawingOxxo_logo->setHeight(63);
           $drawingOxxo_logo->setWorksheet($hoja_activa);

          /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('A2:G2');
          // $autofilter = $hoja_activa->getAutofilter();
           

           $hoja_activa->getColumnDimension('A')->setWidth(5);
           $hoja_activa->setCellValue('A2', '#');
           $hoja_activa->getColumnDimension('B')->setWidth(25);
           $hoja_activa->setCellValue('B2', 'Cliente');
           $hoja_activa->getColumnDimension('C')->setWidth(25);
           $hoja_activa->setCellValue('C2', 'Concepto');
           $hoja_activa->getColumnDimension('D')->setWidth(10);
           $hoja_activa->setCellValue('D2', 'Total');
        //   $columnFilter = $autofilter->getColumn('D');
           $hoja_activa->getColumnDimension('E')->setWidth(18);
           $hoja_activa->setCellValue('E2', 'Metodo pago');
           $hoja_activa->getColumnDimension('F')->setWidth(10);
           $hoja_activa->setCellValue('F2', 'Folio');
           $hoja_activa->getColumnDimension('G')->setWidth(20);
           $hoja_activa->setCellValue('G2', 'Vendedor');
           $hoja_activa->getStyle('A2:G2')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('007bcc');
           $hoja_activa->getStyle('A2:G2')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
           $hoja_activa->getStyle('A2:G2')->getFont()->setBold(true);
           $hoja_activa->getRowDimension('2')->setRowHeight(20);
           $hoja_activa->getStyle('A2:G2')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('A2:G2')->getAlignment()->setVertical('center');
           $fila = 2;

           //Estilos de las filas intercaladas
           /* $evenRow = [
               'fill'=>[
                   'fillType' => Fill::FILL_SOLID,
                   'startColor' => [
                       'rgb' => 'f4fbff'
                   ]
                   ] 
           ];

           $oddRow = [
               'fill'=>[
                   'fillType' => Fill::FILL_SOLID,
                   'startColor' => [
                       'rgb' => '90d3ff'
                   ]
                   ]
           ]; */

           
           //Recorremos el arreglo
           while ($row = array_shift($arreglo)) {
               # trabajos con los datos
          
               $id= $row["id"];
               $cliente= $row["cliente"];
              
               $metodo= $row["metodo_pago"];
               $vendedor= $row["usuario"] . " " . $row["apellido"];
             

               $detalle = traerDetalles($con, $id);

               $total_detalles = count($detalle);
               if($total_detalles > 0){
                while ($row2 = array_shift($detalle)) {
                    $concepto = $row2["descripcion"];
                    $cantidad = $row2["cantidad"];
                    $total = $row2["importe"];

                    $index = $fila + 1;
                    $indicador = $fila - 1;
                    $hoja_activa->setCellValue('A' . $index, $id);
                    $hoja_activa->setCellValue('B' . $index, $cliente);
                    $hoja_activa->setCellValue('C' . $index, $concepto);
                    $hoja_activa->setCellValue('D' . $index, $total);
                    $hoja_activa->setCellValue('E' . $index, $metodo);
                    $hoja_activa->setCellValue('F' . $index, "F".$id);
                    $hoja_activa->setCellValue('G' . $index, $vendedor);
     
                    $hoja_activa->getStyle('A' .$index. ':G' .$index)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('6495ed'));
                    $fila++;
                }
               }else{

               }
                
               
              

               /* if ($index % 2 == 0) {
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($evenRow);
               }else{
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($oddRow);    
               }
 */
              
           }

          
           $count++;
       }

        
        

      
        

     

        

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="Reporte de '.$fecha .'.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        
        $writer->save('php://output');

    
        //Funcion que traera los datos*
        function Consulta($con, $fecha, $sucursal){
           
            $consulta = "SELECT COUNT(*) FROM vista_ordenes WHERE fecha_inicio = ? AND sucursal_id = ?";
            $res = $con->prepare($consulta);
            $res->execute([$fecha, $sucursal]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM vista_ordenes WHERE fecha_inicio = ? AND sucursal_id = ?";
                $res = $con->prepare($consulta);
                $res->execute([$fecha, $sucursal]);

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            }
            
        }

<<<<<<< HEAD
        function traerDetalles($con, $orden_id){
            $consulta = "SELECT COUNT(*) FROM detalle_orden WHERE order_id = ?";
            $res = $con->prepare($consulta);
            $res->execute([$orden_id]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM vista_ordenes WHERE fecha_inicio = ?";
                $res = $con->prepare($consulta);
                $res->execute([$orden_id]);
=======
        function traerDetalles($con){
            $consulta = "SELECT COUNT(*) FROM detalle_orden WHERE fecha_inicio = ? AND sucursal_id = ?";
            $res = $con->prepare($consulta);
            $res->execute([$fecha, $sucursal]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM vista_ordenes WHERE fecha_inicio = ? AND sucursal_id = ?";
                $res = $con->prepare($consulta);
                $res->execute([$fecha, $sucursal]);
>>>>>>> d661550c6eb379a27e0a991977de93205f93a020

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            } 
        }

       
        //Funcion que emulara el get_result-----------------*
        function Arreglo_Get_Result( $Statement ) {
            $RESULT = array();
            $Statement->store_result();
            for ( $i = 0; $i < $Statement->num_rows; $i++ ) {
                $Metadata = $Statement->result_metadata();
                $PARAMS = array();
                while ( $Field = $Metadata->fetch_field() ) {
                    $PARAMS[] = &$RESULT[ $i ][ $Field->name ];
                }
                call_user_func_array( array( $Statement, 'bind_result' ), $PARAMS );
                $Statement->fetch();
            }
            return $RESULT;
        }

   ?>