toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut" 
  }


  function descargarOrden(id){
    window.open('../servidor/reportes/nota-de-venta.php?id_orden=' + id, '_blank');
  }

  function descargarCotizacion(id){
    
    window.open('../servidor/reportes/nota-de-cotizacion.php?id_orden=' + id, '_blank');
  }



  