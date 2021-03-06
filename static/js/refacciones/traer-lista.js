$(document).ready(function () {

    let sucursal_id = getParameterByName("store_id")
    tabla = $('#example').DataTable({
        processing: true,
        serverSide: true,
        ajax:{
            url: '../servidor/refacciones/server_processing.php?sucursal_id=' + sucursal_id,
            dataType: 'json'
        },
        responsive: true,
        order: [0, 'desc'],
        columns:  [
            { data:0, title:'#' },
            { data:1, title:'Proveedor' },
            { data:2, title:'Descripcion' },
            { data:null, title:'Stock', render:function(data,row){ 
             
              if(data[3] == 0){
                return `${data[3]} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
              }else{
                return data[3]
              }
             }},
            { data:4, title:'Modelo' },
            { data:5, title:'Marca' },
            { data:6, title:'Costo' },
            { data:7, title:'Precio' },
            { data:8, title:'Estatus' },
            { data:9, title:'Observaciones' },
            { data:null, title:'Opciones', render: function(row){
                return `
                <div class='row'>
                    <div class='col-12 col-md-12'>
                        <div class="btn btn-primary" onclick="editarRefaccion(${row[0]})"><i class="fa-solid fa-pen-to-square"></i></div>
                        <div class="btn btn-danger" onclick="eliminarRefaccion(${row[0]})"><i class="fa-solid fa-trash"></i></div>
                    </div>
                </div>
                `
            }}
        ],
        
            language: language_options,
    

        
        
    });
});

function editarProducto(id){
  let sucursal_id = getParameterByName("store_id")
  let store_name = getParameterByName("name")
    window.location.href = "editar-producto.php?id_product="+ id +"&store_id=" + sucursal_id + "&name="+ store_name;

}

function eliminarProducto(id_product){
  Swal.fire({
    icon: "question",
    html: "<b>??Seguro de eliminar este producto?</b>"+
    "<p>Se eliminaran las series de este modelo</p>",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "Mejor no"
  }).then((response) => {
    if(response.isConfirmed) {
  
      let dato = {
        producto: id_product,
        type: "eliminacion",
    };

      $.ajax({
        type: "POST",
        url: "../servidor/inventario/manejo-productos.php",
        data: dato,
        dataType: "JSON",
        success: function (response) {
        
       tabla.ajax.reload( null, false)

        Toast.fire({
          icon: 'success',
          title: response.mensj
        })
          
        }
    });

    }
  }) 
}


let language_options = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ning??n dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
      "first": "Primero",
      "last": "??ltimo",
      "next": "Siguiente",
      "previous": "Anterior"
    },
    "aria": {
      "sortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
      "copy": "Copiar",
      "colvis": "Visibilidad",
      "collection": "Colecci??n",
      "colvisRestore": "Restaurar visibilidad",
      "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.",
      "copySuccess": {
        "1": "Copiada 1 fila al portapapeles",
        "_": "Copiadas %ds fila al portapapeles"
      },
      "copyTitle": "Copiar al portapapeles",
      "csv": "CSV",
      "excel": "Excel",
      "pageLength": {
        "-1": "Mostrar todas las filas",
        "_": "Mostrar %d filas"
      },
      "pdf": "PDF",
      "print": "Imprimir",
      "renameState": "Cambiar nombre",
      "updateState": "Actualizar",
      "createState": "Crear Estado",
      "removeAllStates": "Remover Estados",
      "removeState": "Remover",
      "savedStates": "Estados Guardados",
      "stateRestore": "Estado %d"
    },
    "autoFill": {
      "cancel": "Cancelar",
      "fill": "Rellene todas las celdas con <i>%d</i>",
      "fillHorizontal": "Rellenar celdas horizontalmente",
      "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
      "add": "A??adir condici??n",
      "button": {
        "0": "Constructor de b??squeda",
        "_": "Constructor de b??squeda (%d)"
      },
      "clearAll": "Borrar todo",
      "condition": "Condici??n",
      "conditions": {
        "date": {
          "after": "Despues",
          "before": "Antes",
          "between": "Entre",
          "empty": "Vac??o",
          "equals": "Igual a",
          "notBetween": "No entre",
          "notEmpty": "No Vacio",
          "not": "Diferente de"
        },
        "number": {
          "between": "Entre",
          "empty": "Vacio",
          "equals": "Igual a",
          "gt": "Mayor a",
          "gte": "Mayor o igual a",
          "lt": "Menor que",
          "lte": "Menor o igual que",
          "notBetween": "No entre",
          "notEmpty": "No vac??o",
          "not": "Diferente de"
        },
        "string": {
          "contains": "Contiene",
          "empty": "Vac??o",
          "endsWith": "Termina en",
          "equals": "Igual a",
          "notEmpty": "No Vacio",
          "startsWith": "Empieza con",
          "not": "Diferente de",
          "notContains": "No Contiene",
          "notStarts": "No empieza con",
          "notEnds": "No termina con"
        },
        "array": {
          "not": "Diferente de",
          "equals": "Igual",
          "empty": "Vac??o",
          "contains": "Contiene",
          "notEmpty": "No Vac??o",
          "without": "Sin"
        }
      },
      "data": "Data",
      "deleteTitle": "Eliminar regla de filtrado",
      "leftTitle": "Criterios anulados",
      "logicAnd": "Y",
      "logicOr": "O",
      "rightTitle": "Criterios de sangr??a",
      "title": {
        "0": "Constructor de b??squeda",
        "_": "Constructor de b??squeda (%d)"
      },
      "value": "Valor"
    },
    "searchPanes": {
      "clearMessage": "Borrar todo",
      "collapse": {
        "0": "Paneles de b??squeda",
        "_": "Paneles de b??squeda (%d)"
      },
      "count": "{total}",
      "countFiltered": "{shown} ({total})",
      "emptyPanes": "Sin paneles de b??squeda",
      "loadMessage": "Cargando paneles de b??squeda",
      "title": "Filtros Activos - %d",
      "showMessage": "Mostrar Todo",
      "collapseMessage": "Colapsar Todo"
    },
    "select": {
      "cells": {
        "1": "1 celda seleccionada",
        "_": "%d celdas seleccionadas"
      },
      "columns": {
        "1": "1 columna seleccionada",
        "_": "%d columnas seleccionadas"
      },
      "rows": {
        "1": "1 fila seleccionada",
        "_": "%d filas seleccionadas"
      }
    },
    "thousands": ".",
    "datetime": {
      "previous": "Anterior",
      "next": "Proximo",
      "hours": "Horas",
      "minutes": "Minutos",
      "seconds": "Segundos",
      "unknown": "-",
      "amPm": [
        "AM",
        "PM"
      ],
      "months": {
        "0": "Enero",
        "1": "Febrero",
        "2": "Marzo",
        "3": "Abril",
        "4": "Mayo",
        "5": "Junio",
        "6": "Julio",
        "7": "Agosto",
        "8": "Septiembre",
        "9": "Octubre",
        "10": "Noviembre",
        "11": "Diciembre"
      },
      "weekdays": [
        "Dom",
        "Lun",
        "Mar",
        "Mie",
        "Jue",
        "Vie",
        "Sab"
      ]
    },
    "editor": {
      "close": "Cerrar",
      "create": {
        "button": "Nuevo",
        "title": "Crear Nuevo Registro",
        "submit": "Crear"
      },
      "edit": {
        "button": "Editar",
        "title": "Editar Registro",
        "submit": "Actualizar"
      },
      "remove": {
        "button": "Eliminar",
        "title": "Eliminar Registro",
        "submit": "Eliminar",
        "confirm": {
          "1": "??Est?? seguro que desea eliminar 1 fila?",
          "_": "??Est?? seguro que desea eliminar %d filas?"
        }
      },
      "error": {
        "system": "Ha ocurrido un error en el sistema (<a target=\"\\\"rel=\"\\nofollow\"href=\"\\\">M??s informaci??n&lt;\\/a&gt;).</a>"
      },
      "multi": {
        "title": "M??ltiples Valores",
        "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aqu??, de lo contrario conservar??n sus valores individuales.",
        "restore": "Deshacer Cambios",
        "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
      }
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "stateRestore": {
      "creationModal": {
        "button": "Crear",
        "name": "Nombre:",
        "order": "Clasificaci??n",
        "paging": "Paginaci??n",
        "search": "Busqueda",
        "select": "Seleccionar",
        "columns": {
          "search": "B??squeda de Columna",
          "visible": "Visibilidad de Columna"
        },
        "title": "Crear Nuevo Estado",
        "toggleLabel": "Incluir:"
      },
      "emptyError": "El nombre no puede estar vacio",
      "removeConfirm": "??Seguro que quiere eliminar este %s?",
      "removeError": "Error al eliminar el registro",
      "removeJoiner": "y",
      "removeSubmit": "Eliminar",
      "renameButton": "Cambiar Nombre",
      "renameLabel": "Nuevo nombre para %s",
      "duplicateError": "Ya existe un Estado con este nombre.",
      "emptyStates": "No hay Estados guardados",
      "removeTitle": "Remover Estado",
      "renameTitle": "Cambiar Nombre Estado"
    }
  }


  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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