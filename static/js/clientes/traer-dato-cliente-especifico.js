
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

        var lista_direcciones = $("#direcciones-list");
            lista_direcciones.empty()

        Object.keys($direcciones).forEach(direccion => {
            let direccion_item = $direcciones[direccion];
            console.log(direccion_item);
            
            let id_li = Math.random() * (9999 - 1000) + 1;
            let id_trash = Math.random() * (9999 - 1000) + 1;
            lista_empty = $("#list-empty-dir").val();
            appendList(1);
          
            function appendList(type) {
              //Type == 1 -> Agregar direccion en list -- type == 2 -> Actualizar direccion 
              if(type == 1){
                count_click += 1;
                lista_direcciones.append(`
                <li class="list-group-item d-flex justify-content-between hover-list"
                id="${id_li}" 
                code="${id_li}"
                calle="${direccion_item.calle}"
                exterior = "${direccion_item.numero_ext}"
                interior = "${direccion_item.numero_int}" 
                colonia="${direccion_item.colonia}" 
                municipio="${direccion_item.municipio}" 
                estado ="${direccion_item.estado}"
                cp="${direccion_item.cp}"
                ciudad="${direccion_item.ciudad}"
                pais="${direccion_item.pais}"
                onclick="editarListDireccion(${id_li})"
                index_badge="${count_click}"
                value="1">
                <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click}</span>
                <span class="ml-3">${direccion_item.calle} ${direccion_item.numero_ext} ${direccion_item.colonia} ${direccion_item.cp} ${direccion_item.municipio} ${direccion_item.estado} ${direccion_item.pais}</span>
                <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarDirList(${id_li}, 'Sin direcciones agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
                </li>
            `);
          
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

function cambiandoDatos(){
    $("#area-btn-cliente-nuevo").empty().append(`
    <div class="btn btn-success" tipo_cliente="empresa" onclick="ActualizarCliente();" id="bnt-reg-cliente">Actualizar</div>
    `);
}

