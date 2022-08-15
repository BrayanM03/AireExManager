producto = $("#codigo")
producto.select2({
    placeholder: "Busca por codigo o descripcion...",
    theme: "bootstrap-5",
    height:"20px",
    ajax: {
        url: "../servidor/salidas/buscar-refacciones.php",
        type: "post",
        dataType: 'json',
        delay: 250,

        data: function (params) {
      
          sucur = $("#sucursal").val();
          
         return {
           sucursal: sucur,
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
            return "Busca por descripcion...";
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

  
  if(repo.id == ""){
  let label =  repo.text;
  return label;
  }else{
    $("#btn-add").attr("valid", "true");
    return repo.descripcion
   
  }
}

function formatResultProducto(repo){


    if (repo.loading) {
        return repo.text;
      }


      if(repo.id !== ""){

     
        

 
       var $container = $(`
           <div class="row">
                <div class="col-12 col-md-8">

                <div class="row">
                    <div class="col-12 col-md-12">
                        <div>${repo.descripcion}</div>
                    </div>
                </div>

                <div class="row">
                        <div class="col-12 col-md-12 mt-1" style="font-size:12px;">
                        <div><b>Modelo:</b>${repo.modelo}  <b>Stock:</b>${repo.stock}</div>
                    </div>
                </div>

                </div>

           </div>

           



       `
         //  "<span id='"+repo.id+"'>"+ repo.marca +" "+ repo.modelo + " " + repo.tonelaje + "</span>"
       );
        
      }else{
          $container = "";
      }

        return $container;

}


function formatSelectionP(repo) {

  
  if(repo){

  setPantallaCargando()  
 
  $("#cantidad").attr("id_prod", repo.id)
  $("#cantidad").attr("descripcion", repo.descripcion)
  $("#cantidad").attr("modelo", repo.modelo)
  $("#cantidad").val("")
  $('#feedback').removeClass();
  $('#feedback').text("");
  $("#cantidad").attr("valido", "");
  $("#cantidad").removeClass().addClass("form-control");
  $("#producto_id").val(repo.id)


  quitarLoad()


  }else{

    toastr.error('La cantidad no puede ser menor a 0', 'Error')
    
    $("#lista-series").empty().append(`
                    <div class="list-group-item list-group-item-action" aria-current="true">
                        <div class="row">
                            <div class="col-12 col-md-12">Sin datos</div>
                        </div>
                    </div>
            `)

  }

  

  
}



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

  function quitarLoad() { 
 
    $(".loading").removeClass("show");
    setTimeout(removeLoad, 1300)
   }

   function removeLoad(){
    $(".loading").remove();
   };