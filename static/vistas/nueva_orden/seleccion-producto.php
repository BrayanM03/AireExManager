<div class="card mt-3 mb-3 border">
        <div class="card-header" style="background-color:#eff5f3">
            <span>Conceptos</span>
            <div class="row mt-2 justify-content-center">
                <div class="col-12 col-md-8">
                        <div class="splide" id="splide-nueva-orden">
                                        <div class="splide__track">
                                                    <ul class="splide__list" id="lista_splides">

                                                       <img src="img/productos/climas/NA.jpg" id="product-img" alt="" style="width:8rem; border-radius:8px;">
                                                        <!-- <li class="splide__slide"><div class="slide_credito">Hola</div></li>
                                                        <li class="splide__slide"><div class="slide_credito">Hola</div></li> -->
                                                    </ul>
                                        </div>

                                        <div class="splide__progress">
                                                <div class="splide__progress__bar">
                                                </div>
                                        </div>
                        </div>
                </div>
            </div>
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
                            <div class="col-12 col-md-2">Metodo</div>
                            <div class="col-12 col-md-1">Select</div>
                        </div>
                    </a>
                    <div id="lista-series">
                        <a href="#" class="list-group-item list-group-item-action">Sin datos</a>
                    </div>
                </div>

            </div>

            <div class="row mt-3 justify-content-center">
                <div class="col-12 col-md-3">
                     <div id="datos-btn" class="btn btn-info" onclick="agregarProductoAPreventa()">Agregar a la lista</div>
                </div>
            </div>

        </div>
</div>


    <!-- <div class="card mt-3 mb-3 border">
        <div class="card-header" style="background-color:#eff5f3">
            <span>Direccion</span>
            <div class="row mt-2">
                <div class="col-12 col-md-12">
                    <label for="direccion"><b>Selecciona una dirección</b></label>
                    <select name="direccion" class="form-control" id="direccion"></select>
                </div>
            </div>
        </div>

        <div class="card-body" style="font-size:12px;">

            <div class="row mt-4 text-start">
                <div class="col-12 col-md-4">
                    <b>Calle:</b>
                    <span id="calle"></span>
                </div>

                <div class="col-12 col-md-2">
                    <b>No. Int:</b>
                    <span id="no-int"></span>
                </div>

                <div class="col-12 col-md-2">
                    <b>No. Ext:</b>
                    <span id="no-ext"></span>
                </div>

                <div class="col-12 col-md-4">
                    <b>Colonia:</b>
                    <span id="colonia"></span>
                </div>
            </div>

            <div class="row mt-3 text-start">
                <div class="col-12 col-md-4">
                    <b>Ciudad:</b>
                    <span id="ciudad"></span>
                </div>

                <div class="col-12 col-md-2">
                    <b>Municipio:</b>
                    <span id="municipio"></span>
                </div>

                <div class="col-12 col-md-2">
                    <b>Estado:</b>
                    <span id="estado"></span>
                </div>

                <div class="col-12 col-md-4">
                    <b>Pais:</b>
                    <span id="pais"></span>
                </div>
            </div>

            <div class="row mb-3 text-start">
                <div class="col-12 col-md-4">
                        <b>Codigo Postal:</b>
                        <span id="cp"></span>
                </div>
            </div>

            	
            <hr style="color: #0056b2;" />

            <div class="row mb-3 text-start">
                <div class="col-12 col-md-12">
                        <b>Correos electronicos:</b>
                        <p id="correos">
                            
                        </p>
                </div>
            </div>

        </div>
    </div> -->