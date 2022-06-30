<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Agregar series</h1>
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
                    <h5 class="card-title mb-0" id="title-card">Selecciona un producto dependiendo de la sucursal y agrega las series que necesites</h5>
                    </div>
                </div>
               
               
            </div>
            <div class="card-body" id="card-body">

                <div class="row mb-3">

                    <div class="col-12 col-md-6">
                        <span class="mb-2">Sucursal a agregar</span>
                        <select class="form-control mb-1" id="sucursal" name="sucursal">
                            <option value="">Selecciona una sucursal</option>
                            <option value="1">AireExpress</option>
                            <option value="2">ServiClima</option>
                        </select>
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="cantidad">Producto</label>
                        <select class="form-control" name="producto" id="producto" disabled>
                        </select>
                    </div>

                </div>

                <div class="row mb-3">
                  
                        <div class="col-12 col-md-5 text-center">
                            <span>Serie de condensador</span>
                            <input type="text" class="form-control" id="serie-cond" placeholder="Condensador" disabled>
                        </div>

                        <div class="col-12 col-md-5 text-center">
                            <span>Serie de evaporador</span>
                            <input type="text" class="form-control" id="serie-evap" placeholder="Evaporizador" disabled>
                        </div>

                        <div class="col-12 col-md-2 text-center">
                            <span>Fecha</span>
                            <input type="date" class="form-control" id="fecha-compra">
                        </div>
                </div>
                

                <div class="row mb-3 justify-content-center">
                    <div class="col-12 col-md-6 text-center">
                        <div class="btn btn-success disabled" id="btn-add-serie" onclick="agregarSerie()">Agregar</div>
                    </div>
                </div>



                <div class="row mt-5">
                    <div class="col-12 col-md-12">
                        <table id="example" class="table table-hover nowrap" style="width:100%">
                         
                        </table>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>