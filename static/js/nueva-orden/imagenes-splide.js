
function imagenSplide(id_producto, categoria){

  $.ajax({
    type: "POST",
    url: "../servidor/inventario/traer-datos-imagen.php",
    data: {"categoria": categoria, "id_producto": id_producto},
    dataType: "JSON",
    success: function (response) {

      $("#lista_splides").empty()
      if(response.files.length > 0){
        for (element of response.files) {
       
          nombre_imagen = element 
  
          $("#lista_splides").append('<li class="splide__slide">'+
          '<div class="slide_credito">'+
              '<img src="img/productos/'+ categoria +'/P'+ id_producto +'/'+nombre_imagen+'" style="width:15rem; border-radius:8px;">'+
          '</div>'+
      '</li>')
  
        }
      }else{
        uno = ["NA.jpg"];
        for (element of uno) {
       
          nombre_imagen = element 
  
          $("#lista_splides").append('<li class="splide__slide">'+
          '<div class="slide_credito">'+
              '<img src="img/productos/'+ categoria +'/'+nombre_imagen+'" style="width:15rem; border-radius:8px;"><br>Sin imagen'+
          '</div>'+
      '</li>')
  
        }
      }
      

      
var splide = new Splide( '#splide-nueva-orden', {
 // direction: 'ttb',
 // width  : '13rem',
  wheel    : true,
  pagination: false,
  perPage: 3,
});

splide.on( 'autoplay:playing', function ( rate ) {
  console.log( rate ); // 0-1
} );

splide.mount();

    }
});

}





/*       
      response.forEach(element => {
        
        element.forEach(function (value, index) { 

            cliente = value["cliente"];
            pagado = value["pagado"];
            restante = value["restante"]
            fecha_inicio = value["fecha_inicio"];
            fecha_final = value["fecha_final"];

            $("#lista_splides").append('<li class="splide__slide">'+
            '<div class="slide_credito">'+
                '<div class="row mt-2">'+
                '<div class="col-12 col-md-12 text-center">'+
                 '<span style="font-size: 18px;">Cliente: <b>' + cliente + '</b></span>'+
                '</div>'+
                '</div>'+
               '<div class="row mt-2 p-2">'+
               '<div class="col-12 col-md-3 text-center">'+
                'pagado: </br><b>$' + pagado + '</b>'+
                '</div> '+
                '<div class="col-12 col-md-3 text-center">'+
                'restante: </br><b>$' + restante + '</b>'+
                '</div>'+
                '<div class="col-12 col-md-3 text-center">'+
                'fecha inicial:</br> <b>' + fecha_inicio + '</b>'+
                '</div>'+ 
                '<div class="col-12 col-md-3 text-center">'+
                 'fecha final:</br> <b>' + fecha_inicio + '</b>'+
                '</div>'+ 
               '</div>'+
            '</div>'+
        '</li>')

         });
        
      });
 */



