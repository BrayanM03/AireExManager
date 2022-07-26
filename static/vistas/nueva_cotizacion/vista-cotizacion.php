<div class="card" style="height: auto; width: auto;">
                            <h4 class="ml-auto mr-auto mt-5" style="color:#191919;">Nueva cotización</h4>
                            <div class="row mt-4">
                            <div class="col-md-12">
                            <form action=""  class="m-auto" style="width: 50%;">   
                            <div class="form-group m-auto"  style="width: 100%;">
                            <label for="busquedaLlantas" class="">Agregar llantas</label>
                            <select style="width:100%" class="form-control" id="busquedaLlantas" value="" name="search"></select> 
                            </div> 
                            <div class="form-group mt-3 row"  style="width: 100%;">
                            <div class="col-md-6">

                            <label for="busqueda" class="">Cliente</label>
                            <select style="width:100%" class="form-control" id="clientes" value="" name="clientes"></select>
                            </div>
                            <div class="col-md-6">
                            <label for="Cantidad" class="">Cantidad</label> 
                            <input style="width:100%; height:33px;" type="number" class="form-control" id="cantidad" value="" name="cantidad">
                            </div>
                            <div class="col-md-6 mt-3 mr-auto ml-auto"  onclick="generarToken();" id="precio-tok" >
                            <label for="precio">Precio</label> 
                            <input style="width:100%; height:33px;"type="number" class="form-control" id="precio" value="" name="precio" disabled>
                            </div>
                            </div> 
                            <div class="form-group mt-3 row"  style="width: 100%;">
                           
                            <div class="btn btn-success m-auto" id="btn-agregar"onclick="agregarProducto();">Agregar</div>
                            </div>

                            </form>
                            </div>
                            
                            <div class="col-12 col-md-10 ml-auto mr-auto mt-5 text-center">
                                <table id="pre-cotizacion" class="table table-success table-bordered table-hover round_table"></table>
                                <div class="row text-center mt-3 justify-content-center align-items-center">
                                <div class="col-12 col-md-4">
                                    <div class="center-block">
                                    <label for="">Total:</label>
                                    <input type="text" id="total-cotizacion" class="form-control" placeholder="0.00" disabled>
                                
                                    </div>
                                    </div>
                            </div>
                            </div>
                            
                            </div>
                            <div class="form-group mt-3 row justify-content-center align-items-center"  style="width: 100%;">
                            <div class="btn btn-danger text-white mr-3" comentario="" style="color: rgb(31, 28, 28);" id="hacer-comentario"><i class="fas fa-comment-dots"></i></div>
                            <div class="btn btn-danger" id="btn-cotizar" onclick="generarCotizacion();">Cotizar</div>
                            </div>

                     </div>