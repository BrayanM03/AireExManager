<div class="row">
    <div class="col-12 col-md-6">
            <h1 class="h3 mb-3">Nueva Cotización </h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8 text-center">
        <label for="tipo">Selecciona un tipo de venta</label>
        <select class="form-control mt-2" id="tipo">
            <option value="1">Venta sin instalación</option>
            <option value="2">Venta con instalación</option>
            <option value="3">Servicio</option>
            <option value="4">Refacción</option>
        </select>
    </div>
</div>

<div id="contendor-formulario">

<div class="row justify-content-center">
    <div class="col-12 col-md-8 text-center">
    <?php
    include "vistas/nueva_orden/seleccion-cliente.php";
    ?>
    </div>
</div>

<div class="row  justify-content-center mt-3" id="verificaciones_area">
</div>

<div class="row justify-content-center mt-3">
    <div class="col-12 col-md-4 text-start">
        <label for="buscador-select"><i class="fa-solid fa-magnifying-glass"></i> Buscar:</label>
        <select name="buscador" class="form-control w-50" id="buscador-select" onchange="cambiarSeleccionarProducto()">
            <option value="inventario">Aire Acondicionado</option>
            <option value="refacciones">Refaccion</option>
            <!-- <option value="servicios">Servicio</option> -->
        </select>
    </div>
    
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8 text-center" id="area-seleccion-producto">
    <?php
    include "vistas/nueva_cotizacion/seleccion-producto.php";
    ?>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8 text-center" id="area-preventa">
    <?php
    include "vistas/nueva_cotizacion/pre-venta.php";
    ?>
    </div>
</div>

   
</div>