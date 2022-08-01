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
$apertura = $_GET["apertura"];
    

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
          
            $total_ingresos_efectivo = 0;
            
            $cantidad_resultado = count($arreglo);

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
        

           //Validamos si se encontraron registros en la tabla, se valida 
           if ($cantidad_resultado == 0) {

            /* $mensaje_error = "No se econtro nada.";
            $datos = array("mensaje"=>$mensaje_error, "status"=>false);  */
            $hoja_activa->mergeCells("A2:G2");
            $hoja_activa->getStyle('A2:G2')->getAlignment()->setHorizontal('center');
            $hoja_activa->getStyle('A2:G2')->getAlignment()->setVertical('center');
            $hoja_activa->setCellValue('G2', 'Ingresos');
             /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('A3:G3');
           // $autofilter = $hoja_activa->getAutofilter();
            
 
            $hoja_activa->getColumnDimension('A')->setWidth(5);
            $hoja_activa->setCellValue('A3', '#');
            $hoja_activa->getColumnDimension('B')->setWidth(25);
            $hoja_activa->setCellValue('B3', 'Cliente');
            $hoja_activa->getColumnDimension('C')->setWidth(25);
            $hoja_activa->setCellValue('C3', 'Concepto');
            $hoja_activa->getColumnDimension('D')->setWidth(10);
            $hoja_activa->setCellValue('D3', 'Total');
         //   $columnFilter = $autofilter->getColumn('D');
            $hoja_activa->getColumnDimension('E')->setWidth(18);
            $hoja_activa->setCellValue('E3', 'Metodo pago');
            $hoja_activa->getColumnDimension('F')->setWidth(10);
            $hoja_activa->setCellValue('F3', 'Folio');
            $hoja_activa->getColumnDimension('G')->setWidth(20);
            $hoja_activa->setCellValue('G3', 'Vendedor');
            $hoja_activa->getStyle('A3:G3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('007bcc');
            $hoja_activa->getStyle('A3:G3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
            $hoja_activa->getStyle('A3:G3')->getFont()->setBold(true);
            $hoja_activa->getRowDimension('3')->setRowHeight(20);
            $hoja_activa->getRowDimension('4')->setRowHeight(28);
            $hoja_activa->getStyle('A4:G4')->getAlignment()->setHorizontal('center');
            $hoja_activa->getStyle('A4:G4')->getAlignment()->setVertical('center');

            $hoja_activa->mergeCells("A4:G4");
            $hoja_activa->setCellValue('A4', 'Sin datos de los ingresos');
            $hoja_activa->setCellValue('F5', 'Total ingresos');
            $hoja_activa->setCellValue('G5', '0');
           
            
           
            $index = 2;
            /* $count++; */ 
           
        
       }else{

          

        

          /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('A2:G2');
          // $autofilter = $hoja_activa->getAutofilter();
           

          $hoja_activa->mergeCells("A2:G2");
          $hoja_activa->getStyle('A2:G2')->getAlignment()->setHorizontal('center');
          $hoja_activa->getStyle('A2:G2')->getAlignment()->setVertical('center');
          $hoja_activa->setCellValue('A2', 'Ingresos');

          $hoja_activa->getColumnDimension('A')->setWidth(5);
          $hoja_activa->setCellValue('A3', '#');
          $hoja_activa->getColumnDimension('B')->setWidth(25);
          $hoja_activa->setCellValue('B3', 'Cliente');
          $hoja_activa->getColumnDimension('C')->setWidth(25);
          $hoja_activa->setCellValue('C3', 'Concepto');
          $hoja_activa->getColumnDimension('D')->setWidth(10);
          $hoja_activa->setCellValue('D3', 'Total');
       //   $columnFilter = $autofilter->getColumn('D');
          $hoja_activa->getColumnDimension('E')->setWidth(18);
          $hoja_activa->setCellValue('E3', 'Metodo pago');
          $hoja_activa->getColumnDimension('F')->setWidth(10);
          $hoja_activa->setCellValue('F3', 'Folio');
          $hoja_activa->getColumnDimension('G')->setWidth(20);
          $hoja_activa->setCellValue('G3', 'Vendedor');
          $hoja_activa->getStyle('A3:G3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('007bcc');
          $hoja_activa->getStyle('A3:G3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
          $hoja_activa->getStyle('A3:G3')->getFont()->setBold(true);
          $hoja_activa->getRowDimension('3')->setRowHeight(20);
         
           $fila = 3;

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
           $total_ingresos_efectivo = 0;
           
           //Recorremos el arreglo
           while ($row = array_shift($arreglo)) {
               # trabajos con los datos
          
               $id= $row["id"];
               $cliente= $row["cliente"];
              
               $metodo= $row["metodo_pago"];
               $vendedor= $row["usuario"] . " " . $row["apellido"];
               $total_ingresos_efectivo += $row["total"];

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
                
               $index++;
               $hoja_activa->setCellValue('F' . $index, "Total");
               $hoja_activa->setCellValue('G' . $index, $total_ingresos_efectivo);

               /* if ($index % 2 == 0) {
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($evenRow);
               }else{
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($oddRow);    
               }
 */
              
           }

           
       }


       ///AREA DE GASTOS HEHEHHEHEE
       $arreglo_gastos =traerGastos($con, $fecha, $sucursal);
       $cantidad_gastos = count($arreglo_gastos);
       $total_gastos = 0;
       if ($cantidad_gastos == 0) {

        /* $mensaje_error = "No se econtro nada.";
        $datos = array("mensaje"=>$mensaje_error, "status"=>false);  */

        $hoja_activa->mergeCells("I2:L2");
        $hoja_activa->getStyle('I2:L2')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('I2:L2')->getAlignment()->setVertical('center');
          $hoja_activa->setCellValue('I2', 'Gastos');
          /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('I3:L3');
          // $autofilter = $hoja_activa->getAutofilter();
           
    
           $hoja_activa->getColumnDimension('I')->setWidth(5);
           $hoja_activa->setCellValue('I3', '#');
           $hoja_activa->getColumnDimension('J')->setWidth(30);
           $hoja_activa->setCellValue('J3', 'Descripcion');
           $hoja_activa->getColumnDimension('K')->setWidth(18);
           $hoja_activa->setCellValue('K3', 'Importe');
           $hoja_activa->getColumnDimension('L')->setWidth(20);
           $hoja_activa->setCellValue('L3', 'Usuario');
           $hoja_activa->getStyle('I3:L3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('ff581a');
           $hoja_activa->getStyle('I3:L3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
           $hoja_activa->getStyle('I3:D3')->getFont()->setBold(true);
           $hoja_activa->getRowDimension('3')->setRowHeight(20);
           $hoja_activa->getRowDimension('4')->setRowHeight(28);
           $hoja_activa->getStyle('I3:L3')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('I3:L3')->getAlignment()->setVertical('center');
           $fila = 2;
        
           $hoja_activa->mergeCells("I4:L4");
           
        $hoja_activa->getStyle('I4:L4')->getAlignment()->setHorizontal('center');
        $hoja_activa->getStyle('I4:L4')->getAlignment()->setVertical('center');
        $hoja_activa->setCellValue('I4', 'Al parecer no hubo gastos');
        $hoja_activa->setCellValue('K5', 'Total gastos');
        $hoja_activa->setCellValue('L5', '0');
        $indice = 5;
        /* $count++; */ 
       
    
   }else{

      

    $hoja_activa->mergeCells("I2:L2");
    $hoja_activa->getStyle('I2:L2')->getAlignment()->setHorizontal('center');
       $hoja_activa->getStyle('I2:L2')->getAlignment()->setVertical('center');
      $hoja_activa->setCellValue('I2', 'Gastos');
      /*  $drawing->getShadow()->setVisible(true);
       $drawing->getShadow()->setDirection(45); */
       $hoja_activa->setAutoFilter('I3:L3');
      // $autofilter = $hoja_activa->getAutofilter();
       

       $hoja_activa->getColumnDimension('I')->setWidth(5);
       $hoja_activa->setCellValue('I3', '#');
       $hoja_activa->getColumnDimension('J')->setWidth(30);
       $hoja_activa->setCellValue('J3', 'Descripcion');
       $hoja_activa->getColumnDimension('K')->setWidth(18);
       $hoja_activa->setCellValue('K3', 'Importe');
       $hoja_activa->getColumnDimension('L')->setWidth(20);
       $hoja_activa->setCellValue('L3', 'Usuario');
       $hoja_activa->getStyle('I3:L3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('ff581a');
       $hoja_activa->getStyle('I3:L3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
       $hoja_activa->getStyle('I3:D3')->getFont()->setBold(true);
       $hoja_activa->getRowDimension('3')->setRowHeight(20);
       $hoja_activa->getStyle('I3:L3')->getAlignment()->setHorizontal('center');
       $hoja_activa->getStyle('I3:L3')->getAlignment()->setVertical('center');
       $fila = 3;

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
       while ($row = array_shift($arreglo_gastos)) {
           # trabajos con los datos
      
           $id= $row["id"];
           $descripcion= $row["descripcion"];
           $vendedor= $row["usuario"];
           $total_gastos += $row["importe"];
           $importe = $row["importe"];

            $indice = $fila + 1;
            $indicador = $fila - 1;
            $hoja_activa->setCellValue('I' . $indice, $id);
            $hoja_activa->setCellValue('J' . $indice, $descripcion);
            $hoja_activa->setCellValue('K' . $indice, $importe);
            $hoja_activa->setCellValue('L' . $indice, $vendedor);

            $hoja_activa->getStyle('I' .$indice . ':L' .$indice)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('6495ed'));
            $fila++;
        
          
       }

       $indice++;
       $hoja_activa->setCellValue('K' . $indice, "Total");
       $hoja_activa->setCellValue('L' . $indice, $total_gastos);

       
   }



       if($index > $indice){
        $flag = $index;
       }else{
        $flag = $indice;
       }

       $flag++;$flag++;$flag++;

       $ordenes_combinados = traerPorMetodo($con, $fecha, $sucursal, "Combinado");
       $monto_combinado_efectivo = 0;
       $monto_combinado_transferencia = 0;
       $monto_combinado_tarjeta = 0;
       $monto_combinado_cheque = 0;

       if($ordenes_combinados !== 0){
            foreach ($ordenes_combinados as $key => $value) {
                $met = $value["metodo"];
                

                switch ($met) {
                    case 'Efectivo':
                        $monto_combinado_efectivo = $value["monto"];
                    break;
                    case 'Transferencia':
                        $monto_combinado_transferencia = $value["monto"];
                    break;
                    case 'Tarjeta':
                        $monto_combinado_tarjeta = $value["monto"];
                    break;
                    case 'Cheque':
                        $monto_combinado_cheque = $value["monto"];
                    break;

                    default:
                        # code...
                        break;
                }
            }

       }

    
           
       $monto_efectivo = traerPorMetodo($con, $fecha, $sucursal, "Efectivo");
       $hoja_activa->setCellValue('B' . $flag, "Monto en efectivo: ");
       $monto_total_efectivo = $monto_efectivo + $monto_combinado_efectivo;
       $hoja_activa->setCellValue('C' . $flag, $monto_total_efectivo);
       $flag++;

       $monto_transfe = traerPorMetodo($con, $fecha, $sucursal, "Transferencia");
       $hoja_activa->setCellValue('B' . $flag, "Monto en transferencia: ");
       $monto_total_transferencia = $monto_transfe + $monto_combinado_transferencia;
       $hoja_activa->setCellValue('C' . $flag, $monto_total_transferencia);
       $flag++;

       $monto_tarjeta = traerPorMetodo($con, $fecha, $sucursal, "Tarjeta");
       $hoja_activa->setCellValue('B' . $flag, "Monto en tarjeta: ");
       $monto_total_tarjeta = $monto_tarjeta + $monto_combinado_tarjeta;
       $hoja_activa->setCellValue('C' . $flag, $monto_total_tarjeta);
       $flag++;

       $monto_cheque = traerPorMetodo($con, $fecha, $sucursal, "Cheque");
       $hoja_activa->setCellValue('B' . $flag, "Monto en cheque: ");
       $monto_total_cheque = $monto_cheque + $monto_combinado_cheque;
       $hoja_activa->setCellValue('C' . $flag, $monto_total_cheque);
       $flag++;

       $monto_sin_def = traerPorMetodo($con, $fecha, $sucursal, "Sin definir");
       $hoja_activa->setCellValue('B' . $flag, "Monto sin definir: ");
       $hoja_activa->setCellValue('C' . $flag, $monto_sin_def);
       $flag++;

       
       //echo json_encode($ordenes_combinados, JSON_UNESCAPED_UNICODE);

       $flag++;
       $flag++;

           $hoja_activa->setCellValue('B' . $flag, "Inicio");
           $hoja_activa->setCellValue('C' . $flag, $apertura);
           $flag++;
           
           $hoja_activa->setCellValue('B' . $flag, "Ingreso efectivo");
           $hoja_activa->setCellValue('C' . $flag, $monto_total_efectivo);
           $flag++;

           $suma_ingresos_efectivo = $apertura + $monto_total_efectivo;
           
           $hoja_activa->setCellValue('B' . $flag, "Total ingresos efectivo");
           $hoja_activa->setCellValue('C' . $flag, $suma_ingresos_efectivo);
           $flag++;
           
           
           $hoja_activa->setCellValue('B' . $flag, "Gastos");
           $hoja_activa->setCellValue('C' . $flag, $total_gastos);
           $flag++;

           $total_final = $suma_ingresos_efectivo - $total_gastos;
           
           $hoja_activa->setCellValue('B' . $flag, "Total");
           $hoja_activa->setCellValue('C' . $flag, $total_final);
           $flag++;
          
           $count++;
        

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="Reporte de '.$fecha .'.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        
        $writer->save('php://output');

    
        //Funcion que traera los datos de la base de datos
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

        function traerDetalles($con, $orden_id){
            $consulta = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id = ?";
            $res = $con->prepare($consulta);
            $res->execute([$orden_id]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM detalle_orden WHERE orden_id = ?";
                $res = $con->prepare($consulta);
                $res->execute([$orden_id]);

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            } 
        }

        function traerGastos($con, $fecha, $sucursal){

            $consulta = "SELECT COUNT(*) FROM vista_gastos WHERE sucursal_id = ? AND fecha = ?";
            $res = $con->prepare($consulta);
            $res->execute([$sucursal, $fecha]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM vista_gastos WHERE sucursal_id = ? AND fecha = ?";
                $res = $con->prepare($consulta);
                $res->execute([$sucursal, $fecha]);

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            }
        }

        function traerPorMetodo($con, $fecha, $sucursal, $metodo){

            $acumulado = 0;
            if($metodo !== "Combinado"){
                $consulta = "SELECT COUNT(*) FROM vista_ordenes WHERE fecha_inicio = ? AND metodo_pago = ? AND sucursal_id = ?";
                $res = $con->prepare($consulta);
                $res->execute([$fecha, $metodo, $sucursal]);
                $total = $res->fetchColumn();
    
                if($total > 0){
                    $consulta = "SELECT * FROM vista_ordenes WHERE fecha_inicio = ? AND metodo_pago = ? AND sucursal_id = ?";
                    $res = $con->prepare($consulta);
                    $res->execute([$fecha, $metodo, $sucursal]);
    
                   
                      while ($row = $res->fetch()) {
                            $id = $row['id'];
                            $metodo_p = $row['metodo_pago'];
                            $total = $row['total'];
                            $acumulado += $total;
                        }
                    return $acumulado;
                }else{
                    return 0;
                }

            }else{
                $metodo_comb = "Combinado";

                $consultad = "SELECT COUNT(*) FROM vista_ordenes WHERE fecha_inicio = ? AND  metodo_pago = ? AND sucursal_id = ?";
                $ress = $con->prepare($consultad);
                $ress->execute([$fecha, $metodo_comb, $sucursal]);
                $total_comb = $ress->fetchColumn();

                if($total_comb > 0){
                    $consulta = "SELECT * FROM vista_ordenes WHERE fecha_inicio = ? AND metodo_pago = ? AND sucursal_id = ?";
                    $res = $con->prepare($consulta);
                    
                    $res->execute([$fecha, $metodo_comb, $sucursal]);
                    while ($row3 = $res->fetch()) {
                        $id = $row3['id'];
                        $consultac = "SELECT * FROM multi_metodo WHERE id_orden = ?";
                        $res2 = $con->prepare($consultac);
                        $res2->execute([$id]);
                        while ($row2 = $res2->fetch()) {
                            $met = $row2['metodo_pago'];
                            $monto = $row2['monto_pago'];
                            $data[] = array("metodo"=>$met, "monto"=>$monto, "id"=> $id);
                           /*  $acumulado += $row2['monto_pago']; */
                        }
                        
                    }
                    return $data;
                }else{
                    return 0;
                }
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