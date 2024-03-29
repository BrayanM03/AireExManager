let producto = $("#productos");
let sucursal_usuario = $("#user-data").attr("id_sucursal")


//Select2 clientes
producto.select2({
    placeholder: "Producto",
    theme: "bootstrap-5",
    height:"20px",
    ajax: {
        url: "../servidor/nueva-orden/buscar-productos.php",
        type: "post",
        dataType: 'json',
        delay: 250,

        data: function (params) {
         return {
           input: params.term // search term
           
         };
        },
        processResults: function (data) {
            return {
               results: data
            }; 
          },
       
        cache: true

    },
    language:  {

        inputTooShort: function () {
            return "Busca un producto...";
          },
          
        noResults: function() {
    
          return "Sin resultados";        
        },
        searching: function() {
    
          return "Buscando..";
        }
      },

      templateResult: formatResultProducto,
      templateSelection: formatsSelection

});



producto.on('select2:select', function(selection){

  let repo = selection.params.data
  
      
      formatSelectionP(repo)
   

})

function formatsSelection(repo){

  
  if(sucursal_usuario == repo.sucursal){
  let label =  repo.descripcion;
 
  return label;
  }else{
    
  }
}

function formatResultProducto(repo){


    if (repo.loading) {
        return repo.text;
      }

 
      let tipo = $("#tipo").val();
    
      if(tipo == "1"){
        price = repo.precio
      }else if(tipo == "2"){
        price = repo.precio_con_inst
      }else if(tipo == "3"){
        price = repo.precio
      }
    

      if(repo.id !== ""){

        if(repo.categoria == "producto"){
          if(repo.sucursal == "1"){
            sucursal_name = "AireExpress"
       }else if(repo.sucursal == "2"){
            sucursal_name = "ServiClima"
       }

 
       var $container = $(`
           <div class="row">
               <div class="col-12 col-md-12">
                   <div>${repo.descripcion}</div>
               </div>
               <div class="col-12 col-md-12 mt-1" style="font-size:12px;">
                   <div><b>Precio:</b>${price} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo.stock}</div>
               </div>
           </div>
       `
         //  "<span id='"+repo.id+"'>"+ repo.marca +" "+ repo.modelo + " " + repo.tonelaje + "</span>"
       );

        }else if(repo.categoria == "serie"){
         
          
            if(repo[6].sucursal == "1"){
              sucursal_name = "AireExpress"
         }else if(repo[6].sucursal == "2"){
              sucursal_name = "ServiClima"
         }

         $container = $(`
         <div class="row">
             <div class="col-12 col-md-12">
                 <div>${repo[6].marca} ${repo[6].modelo} ${repo[6].tonelaje}</div>
             </div>
             <div class="col-12 col-md-6 mt-1" style="font-size:12px;">
                 <div><b>Costo:</b>${repo[6].precio} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo[6].stock}</div>
             </div>
             <div class="col-12 col-md-6 mt-1" style="font-size:12px;">
                 <div><b>NS Condensador:</b>${repo[2]} <div><b>NS Evaporizador:</b>${repo[3]}
             </div>
         </div>
     `
       //  "<span id='"+repo.id+"'>"+ repo.marca +" "+ repo.modelo + " " + repo.tonelaje + "</span>"
     );

      }

        
      }else{
          $container = "";
      }

        return $container;

}


function formatSelectionP(repo) {

  
  if(sucursal_usuario == repo.sucursal){

    if(repo.stock == 0){

      Toast.fire({
        icon: 'error',
        title: 'Este producto no ya no tiene stock'
      });
      
      $("#lista-series").empty().append(`
                      <div class="list-group-item list-group-item-action" aria-current="true">
                          <div class="row">
                              <div class="col-12 col-md-12 text-center">Sin datos</div>
                          </div>
                      </div>
              `)

    }else{

      setPantallaCargando()  
  let tipo = $("#tipo").val()
  if(tipo == "1"){
    price = repo.precio
  }else if(tipo == "2"){
    price = repo.precio_con_inst
  }else if(tipo == "3"){
    price = repo.precio
  }
  
  setearSeries(repo.id);
  $("#precio").val(price);
  let tipo_tarjeta = $("#metodo-pago").attr("tipo")
  if(tipo_tarjeta == "credito"){
    comisi = ((price*3)/100)
    $("#comision").val(comisi)
  }else if(tipo_tarjeta == "debito"){
    comisi = ((price*1.6)/100)
    $("#comision").val(comisi)
  }else{
    $("#comision").val(0)
  }
  $("#datos-btn").attr("id_producto", repo.id)
  $("#datos-btn").attr("producto_id", repo.producto_id)
  $("#datos-btn").attr("serie_condensador", repo.serie_condensador)
  $("#datos-btn").attr("serie_evaporizador", repo.serie_evaporizador)
  $("#datos-btn").attr("fecha_compra", repo.fecha_compra)

  quitarLoad()

    }

  }else{

    Toast.fire({
      icon: 'error',
      title: 'Este producto no pertenece a tu sucursal'
    });
    
    $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12 text-center">Sin datos</div>
                        </div>
                    </div>
            `)

  }

  

  
}


function setearSeries(id_producto){


    let tabla_ref = "series"
    let indicador = "producto_id";
    $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: { id: id_producto, tabla: tabla_ref, indicador: indicador },
        dataType: "JSON",
        success: function (response) {
          if (response.status == true) {

              let array_dataset = response.data.map(function (item) {
              let array_item = Object.values(item);
              return array_item;

            });

            counter = 1;
            $("#lista-series").empty();


            
            array_dataset.forEach(element => {

              if(element[6] == "Activo"){
                
                $.ajax({
                  type: "POST",
                  url: "../servidor/nueva-orden/comprobar-series-preventa.php",
                  data: {"id_serie": element[0]},
                  
                  success: function (response2) {
                   
                    if(response2 == 1){
  
                      $("#lista-series").append(`
                      <div class="list-group-item list-group-item-action" aria-current="true">
                          <div class="row">
                              <div class="col-12 col-md-1">${element[0]}</div>
                              <div class="col-12 col-md-2">${element[1]}</div>
                              <div class="col-12 col-md-3">${element[2]}</div>
                              <div class="col-12 col-md-3">${element[3]}</div>
                              <div class="col-12 col-md-3">
                                  <input class="form-check-input" onchange="setComision()" type="checkbox" value="${element[0]}" id="${element[0]}">
                              </div>
                          </div>
                      </div>
              `)
                    }else if(response2 == 0){
                      $("#lista-series").append(`
                      <div class="list-group-item list-group-item-action disabled" aria-disabled="true" style="background-color:whitesmoke">
                          <div class="row">
                              <div class="col-12 col-md-1">${element[0]}</div>
                              <div class="col-12 col-md-2">${element[1]}</div>
                              <div class="col-12 col-md-3">${element[2]}</div>
                              <div class="col-12 col-md-3">${element[3]}</div>
                              <div class="col-12 col-md-3">
                                  <input class="form-check-input" onchange="setComision()" type="checkbox" value="${element[0]}" id="${element[0]}">
                              </div>
                          </div>
                      </div>
              `)
                    }
  
                  }
                });

              }  //Porgramar un else para los modelos con series totalmente vendidas
                   
             counter++;
            });

            
            /* tableDestroy();
            tableInit(array_dataset); */
          }
        },
      });

  }


function agregarProductoAPreventa(){
 
  
  let valoresSeries = [];

$(".list-group input[type=checkbox]:checked").each(function(){
 
    valoresSeries.push(this.value);
});





  if(valoresSeries.length == 0){
      Toast.fire({
        icon: 'error',
        title: 'Selecciona una o mas series'
      })
  }else{

    setPantallaCargando() 

    let id_producto = $("#datos-btn").attr("id_producto");
    let precio = $("#precio").val();
    let categoria = $("#buscador-select").val();

    $.ajax({
      type: "POST",
      url: "../servidor/nueva-orden/agregar-preventa.php",
      data: { id: id_producto, series: valoresSeries, precio: precio, categoria: categoria},
      dataType: "JSON",
      success: function (response) {
        if(response.status == true){
          Toast.fire({
            icon: 'success',
            title: 'Agregado correctamente'
          });

          setearSeries(id_producto)
          tabla.ajax.reload(null, false)  
          $("#neto").val(response.importe)
        }
      }
    
    })

  }

  quitarLoad()
}


const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


function setPantallaCargando(){
 
  $("#area-loading").append(`
  <div class="loading show">
  <div style="display:flex; flex-direction:column; justify-content:center;">
      <div class="spin"></div><br>
      <span><b>Cargando<span class = "dotting"> </span></b></span>
  </div>
</div>
  `)
}

function setComision(){
   let cont = 1;
   $("#comision").val(0);
  $(".list-group input[type=checkbox]:checked").each(function(){
 
    
    let pric = $("#precio").val();
    neto = pric * cont;

    let tipo = $("#metodo-pago").attr("tipo")
    console.log(tipo);
    if(tipo == "Credito"){
      comision = ((neto * 3)/100)
    }else if(tipo == "Debito"){
      comision = ((neto * 1.6)/100)
    }else{
      comision = 0
    }
    
    console.log(neto);
    $("#comision").val(comision);
    cont++;
    //valoresSeries.push(this.value);
});
}


