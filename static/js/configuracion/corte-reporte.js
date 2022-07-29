
$("#sucursal").change(function() {

    var sucursal = $("#sucursal").val();
    var url = "../servidor/configuracion/traer-monto-apertura.php";
    $.ajax({
        url: url,
        type: "POST",
        data: {id: sucursal},
        dataType: "json",
        success: function(data) {
            $("#apertura").val(data.data);

        }
    });

})

function bajarReporte(){
    $("#btn-registrar").empty().html("<div class='preloader'></div>")

    var sucursal = $("#sucursal").val();
    var apertura = $("#apertura").val();
    var fecha = $("#fecha").val();

    if(sucursal == "null"){
        $("#btn-registrar").empty().html("Bajar reporte");
        $("#sucursal").focus();
        Toast.fire({
            icon: 'error',
            title: 'Selecciona una sucursal'
          });
        return false;
    }else if(fecha == ""){
        $("#btn-registrar").empty().html("Bajar reporte");
        Toast.fire({
            icon: 'error',
            title: 'Selecciona una fecha para realizar el reporte'
          });
    }else{
        $("#btn-registrar").empty().text("Bajar reporte")
        window.open("../servidor/configuracion/corte-reporte.php?sucursal="+sucursal+"&apertura="+apertura+"&fecha="+fecha,'_blank' );

        /* var url = "../servidor/configuracion/corte-reporte.php";
        $.ajax({
            url: url,
            type: "POST",
            data: {sucursal: sucursal, apertura: apertura, fecha: fecha},
            dataType: "json",
            success: function(data) {
                $("#btn-registrar").empty().html("Bajar reporte");
                if(data.status == "success"){
                    window.open("../servidor/configuracion/corte-reporte.php?sucursal="+sucursal+"&apertura="+apertura+"&fecha="+fecha);
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: data.message
                      });
                }
            }
        }); */
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
  