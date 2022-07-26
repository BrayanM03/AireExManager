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

  setPantallaCargando()  
  let tipo = $("#tipo").val()
  if(tipo == "1"){
    price = repo.precio
  }else if(tipo == "2"){
    price = repo.precio_con_inst
  }
  
  
  $("#precio").val(price)
  $("#datos-btn").attr("id_producto", repo.id)
  $("#datos-btn").attr("producto_id", repo.producto_id)
  $("#datos-btn").attr("serie_condensador", repo.serie_condensador)
  $("#datos-btn").attr("serie_evaporizador", repo.serie_evaporizador)
  $("#datos-btn").attr("fecha_compra", repo.fecha_compra)

  quitarLoad()


  }else{

    Toast.fire({
      icon: 'error',
      title: 'Este producto no pertenece a tu sucursal'
    });
    
    $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12">Sin datos</div>
                        </div>
                    </div>
            `)

  }

  
}



function agregarProductoAPreventa(){
 


    setPantallaCargando() 

    let id_producto = $("#datos-btn").attr("id_producto");
    let precio = $("#precio").val();
    let categoria = $("#buscador-select").val();
    valoresSeries = []

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

        
          tabla.ajax.reload(null, false)  
          $("#neto").val(response.importe)
        }
      }
    
    })

  

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



