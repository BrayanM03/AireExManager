let producto = $("#productos");

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
  let label =  repo.marca + " "+ repo.modelo + " " + repo.tonelaje;
 
  return repo.text || label;
}

function formatResultProducto(repo){


    if (repo.loading) {
        return repo.text;
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
                   <div>${repo.marca} ${repo.modelo} ${repo.tonelaje}</div>
               </div>
               <div class="col-12 col-md-12 mt-1" style="font-size:12px;">
                   <div><b>Costo:</b>${repo.precio} -- <b>Sucursal:</b>${sucursal_name} -- <b>Stock:</b>${repo.stock}</div>
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
     );;

      }

        
      }else{
          $container = "";
      }

        return $container;

}


function formatSelectionP(repo) {

  console.log(repo);
  setearSeries(repo.id);

  $("#precio").val(repo.precio)
  $("#datos-btn").attr("id_producto", repo.id)
  $("#datos-btn").attr("producto_id", repo.producto_id)
  $("#datos-btn").attr("serie_condensador", repo.serie_condensador)
  $("#datos-btn").attr("serie_evaporizador", repo.serie_evaporizador)
  $("#datos-btn").attr("fecha_compra", repo.fecha_compra)

  
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

              $.ajax({
                type: "POST",
                url: "../servidor/nueva-orden/comprobar-series-preventa.php",
                data: {"id_serie": element[6]},
                
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
                                <input class="form-check-input" type="checkbox" value="${element[0]}" id="${element[0]}">
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
                                <input class="form-check-input" type="checkbox" value="${element[0]}" id="${element[0]}">
                            </div>
                        </div>
                    </div>
            `)
                  }

                }
              });
                
                
             counter++;
            });
            /* tableDestroy();
            tableInit(array_dataset); */
          }
        },
      });

  }


function agregarProductoAPreventa(){
  let id_producto = $("#datos-btn").attr("id_producto");
  let precio = $("#precio").val();

  let valoresSeries = [];

$("input[type=checkbox]:checked").each(function(){
  console.log(this.value);
    valoresSeries.push(this.value);
});

  if(valoresSeries.length == 0){
      Toast.fire({
        icon: 'error',
        title: 'Selecciona una o mas series'
      })
  }else{

    $.ajax({
      type: "POST",
      url: "../servidor/nueva-orden/agregar-preventa.php",
      data: { id: id_producto, series: valoresSeries, precio: precio },
      dataType: "JSON",
      success: function (response) {
        if(response == 1){
          setearSeries(id_producto)
          tabla.ajax.reload(null, false)  
        }
      }
    
    })

  }
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


