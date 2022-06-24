
let id_cliente = obtenerParametroGet("id_customer")
console.log(id_cliente);

var  related_tables = {
    "01": {
        "nombre": "detalle_direccion"
    },
    "02": {
        "nombre": "detalle_correo"
    },
    "03": {
        "nombre": "detalle_cuenta_bancaria"
    }
}
var data = {id: id_cliente, tabla: "clientes", relacion: true, tablas_relacionadas: related_tables}

fetch('../servidor/database/traer-un-solo-dato.php', {
    method: 'POST',
    body:JSON.stringify(data), 
    headers: {'Content-Type': 'application/json'}
}).then(res => res.json())
.catch(error => {
    console.error('Error:', error)
    Swal.fire({
        icon: 'error',
        html: '<h3>No existe un cliente con ese ID, selecciona un nuevo cliente porfavor</h3>',
        confirmButtonText: 'Regresar al area de clientes',
        allowOutsideClick: false
    }).then(function(response) {
        if(response.isConfirmed){
            window.location.href = "clientes.php";
        }
    })
})
.then(response => {
    console.log('Success:', response)
    let razon_social = document.getElementById("razon-social")
    let rfc= document.getElementById("rfc")
    let telefono = document.getElementById("telefono")
    let contacto = document.getElementById("contacto")

    $datos_generales = response.data;
    $direcciones = response.detalle_direccion;
    $correos = response.detalle_correo;
    $cuentas = response.detalle_cuenta_bancaria;
    Object.keys($datos_generales).forEach(element => {
     
         razon_social.value = $datos_generales.nombre
         rfc.value = $datos_generales.rfc
         telefono.value = $datos_generales.telefono
         contacto.value = $datos_generales.contacto
        
    });

    if($direcciones.length > 0) {

        Object.keys($direcciones).forEach(direccion => {
            let direccion_item = $direcciones[direccion];
            console.log(direccion_item);
            var lista_correos = $("#correos-list");
            id_list = Math.random() * (9999 - 1000) + 1;
            id_trash = Math.random() * (9999 - 1000) + 1;
            appendListCorreo(1);
            function appendListCorreo(type) {
    
                if(type == 1){
                  
                  count_click2 += 1;
                  lista_correos.append(`
                  <li class="list-group-item d-flex justify-content-between hover-list"
                  id=${id_list}
                  onclick="editarListEmail(${id_list})" 
                  code="${id_list}"
                  correo="${correo}"
                  etiqueta="${etiqueta}"
                  value="1"
                  index_badge="${count_click2}"
                  >
                  <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click2}</span>
                  <span class="ml-3"><b>${etiqueta}:</b> ${correo}</span>
                  <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarEmailList(${id_list}, 'Sin correos agregados')" style="height:30px"><i class="fas fa-trash"></i></div>
                  </li>
              `);
            
              
            
                }else if(type == 2){
                  
                  
                  let list = document.querySelector('#correos-list').getElementsByTagName('li');
                  let id_actual_correo = $("#btn-update-correo").attr("id_li");
                  let index_badge = $("#btn-update-correo").attr("estatus_click"); 
                  [].forEach.call(list, element => {
                    let  id_cicle_correo = element.getAttribute("code");
                 
                    if(id_actual_correo == id_cicle_correo){
                      element.setAttribute("id", id_actual_correo) 
                      element.setAttribute("code", id_actual_correo);
                      element.setAttribute("correo", correo);
                      element.setAttribute("etiqueta", etiqueta);
                      element.setAttribute("index_badge", index_badge);
            
                      element.innerHTML = `
                      <span class="badge bg-primary" style="height:23px; margin-right:7px;">${index_badge}</span>
                      <span class="ml-3"><b>${etiqueta}:</b> ${correo}</span>
                      <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarEmailList(${ id_actual_correo }, 'Sin correos')" style="height:30px"><i class="fas fa-trash"></i></div>
                      
                      `;
                    
                    }
                    
                  });
            
                }
                
              }
        });

    }

    if($correos.length > 0) {

    }

    if($cuentas.length > 0) {

    }

    

});



function obtenerParametroGet(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

