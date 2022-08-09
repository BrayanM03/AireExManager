<div class="row">
    <div class="col-12 col-md-6">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Agregar nuevos conceptos a la orden --- F<span id="folio"></span></h4>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre" disabled>
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección</label>
                    <textarea class="form-control" id="direccion" placeholder="Dirección" disabled></textarea>
                </div>
                <div class="form-group">
                    <label for="tipo">Tipo de venta</label>
                    <select name="" id="tipo" class="form-control" disabled>
                        <option value="1">Venta sin instalación</option>
                        <option value="2">Venta con instalación</option>
                        <option value="3">Servicio</option>
                    </select>
                </div>
                <div class="form-group mt-3">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <label for="exampleInputPassword1">Buscar</label>
                            <select name="" id="buscador-select" onchange="cambiarSeleccionarProducto()" class="form-control">
                                <option value="inventario">Aire acondicionado</option>
                                <option value="refacciones">Refacción</option>
                                <option value="servicios">Servicio</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="fecha">Fecha</label>
                                <input type="date" class="form-control" id="fecha" placeholder="Fecha">
                            </div>
                        </div>
                    </div>

                </div>

                

                <div id="area-seleccion-producto">

                <div class="card mt-3 mb-3 border">
        <div class="card-header" style="background-color:#eff5f3">
            <span>Conceptos</span>
            <div class="row mt-2">
                <div class="col-12 col-md-12">
                    <label for="producto"><b>Selecciona un producto</b></label>
                    <select name="productos" class="form-control" id="productos"></select>
                </div>
                
            </div>
            <div class="row justify-content-center">
                <div class="col-12 mt-3 col-md-4 text-center">
                <label class="input-corto precio-pointer" id="precio-tok" onclick="generarToken();">
                <b id="precio-label">Precio:</b> 
                <input type="number" class="form-control" id="precio" placeholder="0" disabled>
         </label>
                </div>
            </div>
        </div>

        <div class="card-body" style="font-size:12px;">

            <div class="row mt-4">
            
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" style="background-color:tomato; color:white" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-1">#</div>
                            <div class="col-12 col-md-2">Fecha compra</div>
                            <div class="col-12 col-md-3">Serie condensador</div>
                            <div class="col-12 col-md-3">Serie evaporizador</div>
                            <div class="col-12 col-md-3">Seleccionar</div>
                        </div>
                    </a>
                    <div id="lista-series">
                        <a href="#" class="list-group-item list-group-item-action text-center">Sin datos</a>
                    </div>
                </div>

            </div>

            <div class="row mt-3 justify-content-center">
                <div class="col-12 col-md-3">
                     <div id="datos-btn" class="btn btn-info" onclick="agregarProductoAOrden()">Agregar a la orden</div>
                </div>
            </div>

        </div>
</div>
            </div>


        </div>
        </div>
    </div>

    <div class="col-12 col-md-6">
    <div class="card">
            <div class="card-header">
                <h4 class="card-title">Conceptos actuales</h4>
            </div>
            <div class="card-body">
               

                <div class="row">
            
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" style="background-color: #1E90FF; color:white" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-1">#</div>
                            <div class="col-12 col-md-4">Concepto</div>
                            <div class="col-12 col-md-1">Cant</div>
                            <div class="col-12 col-md-2">Precio</div>
                            <div class="col-12 col-md-2">importe</div>
                            <div class="col-12 col-md-2"></div>
                        </div>
                    </a>
                    <div id="lista-detalles">
                        <a href="#" class="list-group-item list-group-item-action text-center">Sin datos</a>
                    </div>
                </div>

            </div>


        </div>
    </div>
</div>