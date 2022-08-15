<div class="row justify-content-center">
    <div class="col-12 col-md-8">
        <div class="card">
            <div class="card-header text-center">
                <!-- <div class="row">
                    <div class="col-12 col-md-1" id="backbtn_area">
                        <div class="btn" onclick="RegresarAtras(1)">
                            <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                        </div>

                    </div>
                    <div class="col-12 col-md-11">
                        <h5 class="card-title mb-0" id="title-card">Ingresa los datos del producto</h5>
                    </div>
                </div> -->


            </div>
            <div class="card-body" id="card-body">


                <div class="row mb-3">


                    <div class="col-12 col-md-6">
                        <label for="sucursal">Planta</label>
                        <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                        <select name="sucursal" class="form-control" id="sucursal" disabled>
                            <option value="1">Sliding de México</option>
                        </select>

                    </div>
                </div>

                <div class="row mb-3">

                    <div class="col-12 col-md-6">
                        <label for="nombre"><b>Nombre completo:</b></label>
                        <input type="text" placeholder="Nombre" id="nombre" name="nombre" class="form-control">
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="cantidad"><b>Numero de empleado:</b></label>
                        <input type="number" placeholder="0" id="no_empleado" name="no_empleado" class="form-control">
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-12 col-md-6">
                        <label for="area"><b>Area:</b></label>
                        <input type="text" placeholder="Area" id="area" name="area" class="form-control">

                    </div>

                    <div class="col-12 col-md-6">
                        <label for="date">Fecha</label>
                        <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                        <input type="date" class="form-control" id="fecha" value="<?php echo date('Y-m-d') ?>">

                    </div>



                </div>



                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="codigo">Codigo</label>
                        <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                        <select name="codigo" class="form-control" id="codigo">
                        </select>

                    </div>

                    <div class="col-12 col-md-4">
                        <label for="cantidad"><b>Cantidad:</b></label>
                        <input type="number" placeholder="0" id="cantidad" name="cantidad" class="form-control">
                        <div class="valid-feedback" id="feedback">
                            Looks good!
                        </div>
                    </div>

                    <div class="col-12 col-md-2 text-start">
                        <div class="btn btn-primary" valid="false" id="btn-add" style="margin-top:20px" onclick="agregarPreSalida()">Agregar</div>
                    </div>


                </div>

            

                <hr class="mb-5">

                <div class="row mb-3">
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
                

                <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-4 text-center">
                        <div class="btn btn-warning" onclick="restearTabla(<?php echo $_SESSION['id'] ?>)">Resetar tabla</div>
                    </div>
                    <div class="col-12 col-md-4 text-center">
                        <div class="btn btn-success" onclick="registarSalida()">Registrar salida</div>
                    </div>
                </div>



                
            </div>
        </div>
    </div>
</div>