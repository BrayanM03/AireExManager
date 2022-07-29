<div class="card">
<div class="card-header text-center">
                <div class="row justify-content-center mb-3">
                  
                    <div class="col-12 col-md-6 text-center">
                    <h5 class="card-title mb-0" id="title-card">Panel de reporte de ventas</h5>
                    </div>
                </div>

                <div class="row mb-3 justify-content-center">
                  
                  <div class="col-12 col-md-6 text-center">
                    <label for="sucursal"><b>Selecciona una sucursal</b></label>
                    <select name="sucursal" class="form-control" id="sucursal">
                        <option value="null">Selecciona una sucursal</option>
                        <option value="1">AireExpress</option>
                        <option value="2">ServiClima</option>
                    </select>
                  </div>
              </div>

              <div class="row mb-3 justify-content-center">
                  
                  <div class="col-12 col-md-3">
                  <label class="input-corto precio-pointer" id="precio-tok" onclick="generarToken();">
                            <b id="precio-label">Monto de apertura:</b> 
                            <input name="apertura" class="form-control" type="number" id="apertura" placeholder="0.00" disabled>
                     </label>
                  </div>
                  <div class="col-12 col-md-3">
                    <label for="fecha"><b>Selecciona la fecha del reporte</b></label>
                    <input type="date" class="form-control" id="fecha">
                  </div>
              </div>

              <div class="row justify-content-center">
                  
                  <div class="col-12 col-md-3" style="display:flex; justify-content:center">
                    <div class="btn btn-success"  style="width:130px; display:flex; justify-content:center" id="btn-registrar" onclick="bajarReporte()">Bajar reporte</div>
                  </div>
              </div>


             
               
               
            </div>
</div>