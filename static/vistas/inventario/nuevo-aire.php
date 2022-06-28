<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Agregar clima nuevo</h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8">
        <div class="card">
            <div class="card-header text-center">
                <h5 class="card-title mb-0" id="title-card">Ingresa los datos del producto</h5>
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
                    <div class="col-12 col-md-12">
                        <label for="cantidad">Cantidad</label>
                        <input class="form-control" placeholder="0" name="cantidad" id="cantidad">
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
                    <div class="col-12 col-md-6">
                    <div class="btn btn-primary" onclick="regresar()">Regresar</div>
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