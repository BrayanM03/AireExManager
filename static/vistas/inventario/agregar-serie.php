<form id="contenedor-series">

<div class="row mb-4 justify-content-center">
    <div class="col-12 col-md-6 text-center">
        
        Fecha compra
        <input class="form-control" type="date" id="fecha_compra" name="fecha_compra">
    </div>

    <div class="col-12 col-md-6 text-center">
        
        Metodo
        <select class="form-control" id="metodo" name="metodo">
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
        </select>
    </div>
</div>

<div class="row mb-3">
<div class="col-1 col-md-1 text-center">Indice</div>
    <div class="col-12 col-md-5 text-center">
        <span>Numero de serie de condensador</span>
    </div>

    <div class="col-12 col-md-5 text-center">
        <span>Numero de serie de evaporador</span>
    </div>
</div>





    <?php
    $cantidad = $_POST['cantidad'];
    $counter = 1;
    for ($i=0; $i < $cantidad; $i++) { 
        echo ' <div class="row mb-3">

        <div class="col-12 col-md-1">
            <b class="mt-3">#'.$counter.'</b>
         </div>

        <div class="col-12 col-md-5">
            <input class="form-control cond-input" name="data_cond'. $counter .'" id="serie_condensador_'.$counter.'" type="text" placeholder="Serie condensador '.$counter.'">
        </div>
    
        <div class="col-12 col-md-5">
        <input class="form-control evap-input" name="data_evap'. $counter .'" id="serie_evaporador_'.$counter.'" type="text" placeholder="Serie evaporador '.$counter.'">
        </div>
    </div>';
    $counter++;
    }
    ?>


<div class="row justify-content-center">
    <div class="col-12 col-3">
        <div class="btn btn-success" onclick="terminarRegistro(2)">Finalizar</div>
    </div>
</div>

</form> 

