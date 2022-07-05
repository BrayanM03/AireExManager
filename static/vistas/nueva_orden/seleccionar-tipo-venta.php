<div class="row">
    <div class="col-12 col-md-6">
            <h1 class="h3 mb-3">Nueva orden </h1>
    </div>
</div>

<div class="row">
    <div class="col-12 col-md-12 text-center">
        <label for="tipo">Selecciona un tipo de venta</label>
        <select class="form-control mt-2" id="tipo">
            <option value="1">Venta sin instalación</option>
            <option value="2">Venta con instalación</option>
            <option value="3">Servicio</option>
        </select>
    </div>
</div>

<div id="contendor-formulario">

<div class="row justify-content-center">
    <div class="col-12 col-md-10 text-center">
    <?php
    include "vistas/nueva_orden/seleccion-cliente.php";
    ?>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-10 text-center" id="area-seleccion-producto">
    <?php
    include "vistas/nueva_orden/seleccion-producto.php";
    ?>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-10 text-center" id="area-preventa">
    <?php
    include "vistas/nueva_orden/pre-venta.php";
    ?>
    </div>
</div>

   
</div>