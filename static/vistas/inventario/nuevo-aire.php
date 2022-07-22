
<?php

    $postdata = $_POST["postdata"];
    
    if ($postdata == false) {
        ?>


<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Agregar clima nuevo</h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8">
        <div class="card">
            <div class="card-header text-center">
                <div class="row">
                    <div class="col-12 col-md-1" id="backbtn_area">
                        <div class="btn" onclick="RegresarAtras(1)">
                        <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                        </div>
                   
                    </div>
                    <div class="col-12 col-md-11">
                    <h5 class="card-title mb-0" id="title-card">Ingresa los datos del producto</h5>
                    </div>
                </div>
               
               
            </div>
            <div class="card-body" id="card-body">

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="proveedor">Proveedor</label>
                        <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                        <input name="proveedor" class="form-control" id="proveedor" placeholder="Escribe un proveedor">
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="tonelaje">Tonelaje</label>
                        <select class="form-control" name="tonelaje" id="tonelaje">
                            <option value="">Selecciona un tonelaje</option>
                            <option value="1 TON 220V">1 TON 220V</option>
                            <option value="1 TON 110V">1 TON 110V</option>
                            <option value="1.5 TON 220V">1.5 TON 220V</option>
                            <option value="2 TON 220V">2 TON 220V</option>
                            <option value="3 TON 220V">3 TON 220V</option>
                            
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="modelo">Modelo</label>
                        <input class="form-control" placeholder="Escribe un modelo" name="modelo" id="modelo">
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="marca">Marca</label>
                        <input class="form-control" placeholder="Escribe una marca" name="marca" id="marca">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="cantidad">Cantidad</label>
                        <input class="form-control" type="number" placeholder="0" name="cantidad" id="cantidad">
                    </div>

                    <div class="col-12 col-md-6">
                        <span class="mb-2">Sucursal a agregar</span>
                        <select class="form-control mb-1" id="sucursal" name="sucursal">
                            <option value="1">AireExpress</option>
                            <option value="2">ServiClima</option>
                        </select>
                    </div>

                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="costo">Costo</label>
                        <input class="form-control" placeholder="0.00" name="costo" id="costo" type="number">
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="precio">Precio</label>
                        <input class="form-control" placeholder="0.00" name="precio" id="precio" type="number">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-12">
                        <label for="descripcion">Descripción</label>
                        <textarea class="form-control" placeholder="Descripción" name="descripcion" id="descripcion"></textarea>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <div class="btn btn-success" onclick="agregarProducto()">Agregar</div>
                    </div>
                </div>



                <div class="row">
                    <div class="col-12 col-md-12">
                        <table id="example" class="table table-hover nowrap" style="width:100%">
                            <!-- <thead>
                                                <tr>
                                                    <th>Subscriber ID</th>
                                                    <th>Install Location</th>
                                                    <th>Subscriber Name</th>
                                                    <th>some data</th>
                                                </tr>
                                            </thead> -->
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    }else if($postdata == true) {

    
?>



<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Agregar clima nuevo</h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8">
        <div class="card">
            <div class="card-header text-center">
                <div class="row">
                    <div class="col-12 col-md-1" id="backbtn_area">
                        <div class="btn" onclick="RegresarAtras(1)">
                        <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                        </div>
                   
                    </div>
                    <div class="col-12 col-md-11">
                    <h5 class="card-title mb-0" id="title-card">Ingresa los datos del producto</h5>
                    </div>
                </div>
               
               
            </div>
            <div class="card-body" id="card-body">

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="proveedor">Proveedor</label>
                        <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                        <input name="proveedor" class="form-control" value="<?php echo $_POST['proveedor'] ?>" id="proveedor" placeholder="Escribe un proveedor">
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="tonelaje">Tonelaje</label>
                        <select class="form-control" name="tonelaje" id="tonelaje">
                            <option value="">Selecciona un tonelaje</option>
                            <option value="1 TON 220V" <?=$_POST['tonelaje'] == '1 TON 220V' ? ' selected="selected"' : '';?>>1 TON 220V</option>
                            <option value="1 TON 110V" <?=$_POST['tonelaje'] == '1 TON 110V' ? ' selected="selected"' : '';?>>1 TON 110V</option>
                            <option value="1.5 TON 220V" <?=$_POST['tonelaje'] == '1.5 TON 220V' ? ' selected="selected"' : '';?>>1.5 TON 220V</option>
                            <option value="2 TON 220V" <?=$_POST['tonelaje'] == '2 TON 220V' ? ' selected="selected"' : '';?>>2 TON 220V</option>
                            <option value="3 TON 220V" <?=$_POST['tonelaje'] == '3 TON 220V' ? ' selected="selected"' : '';?>>3 TON 220V</option>
                            
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="modelo">Modelo</label>
                        <input value="<?php echo $_POST['modelo'] ?>" class="form-control" placeholder="Escribe un modelo" name="modelo" id="modelo">
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="marca">Marca</label>
                        <input value="<?php echo $_POST['marca'] ?>" class="form-control" placeholder="Escribe una marca" name="marca" id="marca">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="cantidad">Cantidad</label>
                        <input type="number" class="form-control" value="<?php echo $_POST['cantidad'] ?>" placeholder="0" name="cantidad" id="cantidad">
                    </div>

                    <div class="col-12 col-md-6">
                        <span class="mb-2">Sucursal a agregar</span>
                        <select class="form-control mb-1" id="sucursal" name="sucursal">
                            <option value="1" <?=$_POST['id_sucursal'] == '1' ? ' selected="selected"' : '';?>>AireExpress</option>
                            <option value="2" <?=$_POST['id_sucursal'] == '2' ? ' selected="selected"' : '';?>>ServiClima</option>
                        </select>
                    </div>

                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-4">
                        <label for="costo">Costo</label>
                        <input class="form-control" value="<?php echo $_POST['costo'] ?>" placeholder="0.00" name="costo" id="costo" type="number">
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="precio">Precio <b>sin</b> instalación</label>
                        <input class="form-control" placeholder="0.00" value="<?php echo $_POST['precio'] ?>" name="precio" id="precio" type="number">
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="costo">Precio <b>con</b> instalación</label>
                        <input class="form-control" value="<?php echo $_POST['precio_con_inst'] ?>" placeholder="0.00" name="precio_con_inst" id="precio_con_inst" type="number">
                    </div>
                </div>

                

                <div class="row mb-3">
                    <div class="col-12 col-md-12">
                        <label for="descripcion">Descripción</label>
                        <textarea class="form-control" placeholder="Descripción" name="descripcion" id="descripcion"><?php echo $_POST['descripcion'] ?></textarea>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <div class="btn btn-success" onclick="agregarProducto()">Agregar</div>
                    </div>
                </div>



                <div class="row">
                    <div class="col-12 col-md-12">
                        <table id="example" class="table table-hover nowrap" style="width:100%">
                            <!-- <thead>
                                                <tr>
                                                    <th>Subscriber ID</th>
                                                    <th>Install Location</th>
                                                    <th>Subscriber Name</th>
                                                    <th>some data</th>
                                                </tr>
                                            </thead> -->
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<?php
}
?>