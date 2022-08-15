$("#cantidad").keyup(function(e) {
    let cant = $(this).val()
   /*  cant = cant.replace(/ /g, "") */
   
   codigo_da = $("#codigo-data").text()
   if(codigo_da !== ""){
    
    if(cant.length <= 0){

        input_codigo = $("#cantidad");
        input_codigo.removeClass().addClass("form-control")

    }else{

        $.ajax({
            type: "POST",
            url: "servidor/salidas/validar-codigo.php",
            data: {"cant":cant, "codigo":codigo_da},
            dataType: "JSON",
            success: function (response2) {
               if(response2.status == true) {
    
                input_codigo = $("#cantidad");
                validar_clase_valida = input_codigo.hasClass("is-valid");
                validar_clase_invalida = input_codigo.hasClass("is-invalid");
    
                if(validar_clase_invalida == true){
                  input_codigo.removeClass("is-invalid");
                  input_codigo.addClass("is-valid");
                }else if(validar_clase_invalida == false){
                  input_codigo.addClass("is-valid");
                }else if(validar_clase_valida == true){
                  input_codigo.removeClass("is-valid");
                  input_codigo.addClass("is-valid");
                }
    
                $('#feedback').removeClass();
                $('#feedback').addClass("valid-feedback");
                $('#feedback').text(response2.mensj);
                validad_code_area = $("#cantidad").attr("valido", "si");
    
              
    
               }else if(response2.status == false){
    
                input_codigo = $("#cantidad");
                validar_clase_valida = input_codigo.hasClass("is-valid");
                validar_clase_invalida = input_codigo.hasClass("is-invalid");
    
                if(validar_clase_invalida == true){
                  input_codigo.removeClass("is-invalid");
                  input_codigo.addClass("is-invalid");
                }else if(validar_clase_invalida == false){
                  input_codigo.removeClass("is-valid");
                  input_codigo.addClass("is-invalid");
                }else if(validar_clase_valida == true){
                  input_codigo.removeClass("is-valid");
                  input_codigo.addClass("is-invalid");
                }
    
                $('#feedback').removeClass();
                $('#feedback').addClass("invalid-feedback");
                $('#feedback').text(response2.mensj);
                validad_code_area = $("#cantidad").attr("valido", "no");
    
               }
            }
        });

    }
   }
  
      
    })




    function registarSalida() { 

      Swal.fire({
        icon: 'question',
        html: '<h5>¿Esta seguro de registrar la salida?</h5>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, registrar!',
        cancelButtonText: 'No, cancelar!',
      }).then((result) => {
        if (result.value) {
          registrar();
        }

      })
     
      
  
   }


   function registrar(){
    let nombre = $("#nombre").val();
    let no_empleado = $("#no_empleado").val();
    let area = $("#area").val();
    let fecha = $("#fecha").val();
 

    

    
    if(nombre == ""){
      toastr.error('Escribe un nombre', 'Error')
  }else if(no_empleado == ""){
      toastr.error('Escribe un numero de empleado', 'Error')
  }else if(fecha == ""){
      toastr.error('Escribe una fecha', 'Error')
  }else{

        let sucursal = $("#sucursal").val();

    let data = {
        nombre: nombre,
        no_empleado: no_empleado,
        area: area,
        fecha: fecha,
        sucursal: sucursal
    } 

    $.ajax({
        type: "POST",
        url: "servidor/salidas/registrar-salida.php",
        data: data,
        dataType: "JSON",
        success: function (response2) {
            if(response2.status == true){
                Swal.fire({
                    icon:"success",
                    html: `<b>${response2.mensj}</b>
                    ¿Abrir ticket?
                    `,
                    confirmButtonText: 'Si, por supuesto',
                    showCancelButton: true,
                    cancelButtonText: "Mejor no"

                }).then((result) => {

                    if(result.isConfirmed){
                      restearTabla(user_id);
                      window.location.href = "ticket.php?id="+response2.id_nuevo;

                       

                    }else if(result.isCancelled){
                        window.location.reload
                    }

                })

                
            }
        }
    });

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
   };