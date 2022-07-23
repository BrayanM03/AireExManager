function agregarEventos(params) {
  let sucursal = $("#sucursal");
  let producto = $("#producto");
  array_dataset = [];
  tableInit(array_dataset);

  sucursal.on("change", function () {
    if ($(this).val() !== "") {

      let id_sucursal = $(this).val();
      let indicador = "sucursal";
      let tabla_ref = "inventario";

      $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: { id: id_sucursal, tabla: tabla_ref, indicador: indicador },
        dataType: "JSON",
        success: function (response) {
          if (response.status == true) {
            $("#producto").prop("disabled", false);
            $("#producto")
              .empty()
              .append(`<option value="null">Selecciona un producto</select>`);
              setearForm(2);
            response.data.forEach((element) => {
              $("#producto").append(`
                            <option value="${element.id}">${element.marca} ${element.modelo}</option>
                        `);
            });
          } else {
             setearForm(1);
          }
        },
      });

    } else {
      setearForm(1);
    }
  });

  producto.on("change", function () {
    if ($(this).val() !== "null") {
      let id_producto = $(this).val();
      let indicador = "producto_id";
      let tabla_ref = "series";
      $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: { id: id_producto, tabla: tabla_ref, indicador: indicador },
        dataType: "JSON",
        success: function (response) {
          if (response.status == true) {
            $("#serie-cond").prop("disabled", false);
            $("#serie-evap").prop("disabled", false);
            $("#btn-add-serie").removeClass("disabled")

            let array_dataset = response.data.map(function (item) {
              let array_item = Object.values(item);
              return array_item;
            });

             array_dataset = array_dataset.filter(function(val) {
              console.log(val[6]);
              if(val[6] == "Activo"){
                return val; 
              }
              
          });

          
            
            tableDestroy();
            tableInit(array_dataset);
          }
        },
      });
    } else {
      setearForm(2);
    }
  });

}


let language_options = {
  processing: "<div >Procesando...</div>",
  lengthMenu: "Mostrar _MENU_ registros",
  zeroRecords: "No se encontraron resultados",
  emptyTable: "Ningún dato disponible en esta tabla",
  infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
  infoFiltered: "(filtrado de un total de _MAX_ registros)",
  search: "Buscar:",
  infoThousands: ",",
  loadingRecords: "Cargando...",
  paginate: {
    first: "Primero",
    last: "Último",
    next: "Siguiente",
    previous: "Anterior",
  },
  aria: {
    sortAscending: ": Activar para ordenar la columna de manera ascendente",
    sortDescending: ": Activar para ordenar la columna de manera descendente",
  },
  buttons: {
    copy: "Copiar",
    colvis: "Visibilidad",
    collection: "Colección",
    colvisRestore: "Restaurar visibilidad",
    copyKeys:
      "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.",
    copySuccess: {
      1: "Copiada 1 fila al portapapeles",
      _: "Copiadas %ds fila al portapapeles",
    },
    copyTitle: "Copiar al portapapeles",
    csv: "CSV",
    excel: "Excel",
    pageLength: {
      "-1": "Mostrar todas las filas",
      _: "Mostrar %d filas",
    },
    pdf: "PDF",
    print: "Imprimir",
    renameState: "Cambiar nombre",
    updateState: "Actualizar",
    createState: "Crear Estado",
    removeAllStates: "Remover Estados",
    removeState: "Remover",
    savedStates: "Estados Guardados",
    stateRestore: "Estado %d",
  },
  autoFill: {
    cancel: "Cancelar",
    fill: "Rellene todas las celdas con <i>%d</i>",
    fillHorizontal: "Rellenar celdas horizontalmente",
    fillVertical: "Rellenar celdas verticalmentemente",
  },
  decimal: ",",
  searchBuilder: {
    add: "Añadir condición",
    button: {
      0: "Constructor de búsqueda",
      _: "Constructor de búsqueda (%d)",
    },
    clearAll: "Borrar todo",
    condition: "Condición",
    conditions: {
      date: {
        after: "Despues",
        before: "Antes",
        between: "Entre",
        empty: "Vacío",
        equals: "Igual a",
        notBetween: "No entre",
        notEmpty: "No Vacio",
        not: "Diferente de",
      },
      number: {
        between: "Entre",
        empty: "Vacio",
        equals: "Igual a",
        gt: "Mayor a",
        gte: "Mayor o igual a",
        lt: "Menor que",
        lte: "Menor o igual que",
        notBetween: "No entre",
        notEmpty: "No vacío",
        not: "Diferente de",
      },
      string: {
        contains: "Contiene",
        empty: "Vacío",
        endsWith: "Termina en",
        equals: "Igual a",
        notEmpty: "No Vacio",
        startsWith: "Empieza con",
        not: "Diferente de",
        notContains: "No Contiene",
        notStarts: "No empieza con",
        notEnds: "No termina con",
      },
      array: {
        not: "Diferente de",
        equals: "Igual",
        empty: "Vacío",
        contains: "Contiene",
        notEmpty: "No Vacío",
        without: "Sin",
      },
    },
    data: "Data",
    deleteTitle: "Eliminar regla de filtrado",
    leftTitle: "Criterios anulados",
    logicAnd: "Y",
    logicOr: "O",
    rightTitle: "Criterios de sangría",
    title: {
      0: "Constructor de búsqueda",
      _: "Constructor de búsqueda (%d)",
    },
    value: "Valor",
  },
  searchPanes: {
    clearMessage: "Borrar todo",
    collapse: {
      0: "Paneles de búsqueda",
      _: "Paneles de búsqueda (%d)",
    },
    count: "{total}",
    countFiltered: "{shown} ({total})",
    emptyPanes: "Sin paneles de búsqueda",
    loadMessage: "Cargando paneles de búsqueda",
    title: "Filtros Activos - %d",
    showMessage: "Mostrar Todo",
    collapseMessage: "Colapsar Todo",
  },
  select: {
    cells: {
      1: "1 celda seleccionada",
      _: "%d celdas seleccionadas",
    },
    columns: {
      1: "1 columna seleccionada",
      _: "%d columnas seleccionadas",
    },
    rows: {
      1: "1 fila seleccionada",
      _: "%d filas seleccionadas",
    },
  },
  thousands: ".",
  datetime: {
    previous: "Anterior",
    next: "Proximo",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    unknown: "-",
    amPm: ["AM", "PM"],
    months: {
      0: "Enero",
      1: "Febrero",
      2: "Marzo",
      3: "Abril",
      4: "Mayo",
      5: "Junio",
      6: "Julio",
      7: "Agosto",
      8: "Septiembre",
      9: "Octubre",
      10: "Noviembre",
      11: "Diciembre",
    },
    weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  },
  editor: {
    close: "Cerrar",
    create: {
      button: "Nuevo",
      title: "Crear Nuevo Registro",
      submit: "Crear",
    },
    edit: {
      button: "Editar",
      title: "Editar Registro",
      submit: "Actualizar",
    },
    remove: {
      button: "Eliminar",
      title: "Eliminar Registro",
      submit: "Eliminar",
      confirm: {
        1: "¿Está seguro que desea eliminar 1 fila?",
        _: "¿Está seguro que desea eliminar %d filas?",
      },
    },
    error: {
      system:
        'Ha ocurrido un error en el sistema (<a target="\\"rel="\\nofollow"href="\\">Más información&lt;\\/a&gt;).</a>',
    },
    multi: {
      title: "Múltiples Valores",
      info: "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
      restore: "Deshacer Cambios",
      noMulti:
        "Este registro puede ser editado individualmente, pero no como parte de un grupo.",
    },
  },
  info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
  stateRestore: {
    creationModal: {
      button: "Crear",
      name: "Nombre:",
      order: "Clasificación",
      paging: "Paginación",
      search: "Busqueda",
      select: "Seleccionar",
      columns: {
        search: "Búsqueda de Columna",
        visible: "Visibilidad de Columna",
      },
      title: "Crear Nuevo Estado",
      toggleLabel: "Incluir:",
    },
    emptyError: "El nombre no puede estar vacio",
    removeConfirm: "¿Seguro que quiere eliminar este %s?",
    removeError: "Error al eliminar el registro",
    removeJoiner: "y",
    removeSubmit: "Eliminar",
    renameButton: "Cambiar Nombre",
    renameLabel: "Nuevo nombre para %s",
    duplicateError: "Ya existe un Estado con este nombre.",
    emptyStates: "No hay Estados guardados",
    removeTitle: "Remover Estado",
    renameTitle: "Cambiar Nombre Estado",
  },
};

function tableInit(array_dataset) {
 
  console.log(array_dataset);
  tabla = $("#example").DataTable({
    
    processing: true,
    data: array_dataset,
    responsive: true,
    order: [0, 'desc'],
    columns: [
      { data: 0, title: "#" },
      { data: 1, title: "Fecha compra" },
      { data: 2, title: "Condensador" },
      { data: 3, title: "Evaporizador" },
      {
        data: null,
        title: "Opciones",
        render: function (row) {
          return `
                <div class='row'>
                    <div class='col-12 col-md-12'>
                        <div class="btn btn-primary" onclick="editarSerie(${row[0]}, '${row[1]}', '${row[2]}', '${row[3]}','${row[7]}')"><i class="fa-solid fa-pen-to-square"></i></div>
                        <div class="btn btn-danger" onclick="eliminarSerie(${row[0]})"><i class="fa-solid fa-trash"></i></div>
                    </div>
                </div>
                `;
        },
      },
    ],

    language: language_options,
  });

  $('#example tbody tr').on('click', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
      tabla.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
  });
};

function tableDestroy() {
  $("#example").dataTable().fnDestroy();
};

function setearForm(origin) {
  if (origin == 1) {
    $("#producto").empty().prop("disabled", true);
  }

  $("#serie-cond").prop("disabled", true);
  $("#serie-evap").prop("disabled", true);
  tableDestroy();
  let array_dataset = [];
  tableInit(array_dataset);
  $("#btn-add-serie").addClass("disabled")
};

function agregarSerie(){
    
    let sucursal = $("#sucursal").val();
    let producto = $("#producto").val();
    let metodo = $("#metodo").val();
    let fecha = $("#fecha-compra").val();
    let serie_cond = $("#serie-cond").val(); 
    let serie_evap = $("#serie-evap").val();

    let dato = {
        type: "insercion",
        sucursal: sucursal,
        producto: producto,
        fecha: fecha,
        metodo: metodo,
        serie_cond: serie_cond,
        serie_evap: serie_evap
    };

    

    $.ajax({
        type: "POST",
        url: "../servidor/inventario/manejo-de-series.php",
        data: dato,
        dataType: "JSON",
        success: function (response) {
          
            if(response.status == true) {

                Toast.fire({
                    icon: 'success',
                    title: response.mensj
                  })

                 reloadTable();

            }else{
                Toast.fire({
                    icon: 'error',
                    title: response.mensj
                  })
            }

        }
      });



};

function eliminarSerie(id_serie){

  Swal.fire({
    icon: "question",
    html: "<b>¿Seguro de eliminar estas series?</b>",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "Mejor no"
  }).then((response) => {
    if(response.isConfirmed) {

      let id_producto = $("#producto").val();
      let dato = {
        producto: id_producto,
        type: "eliminacion",
        serie:id_serie
    };

      $.ajax({
        type: "POST",
        url: "../servidor/inventario/manejo-de-series.php",
        data: dato,
        dataType: "JSON",
        success: function (response) {
        
        reloadTable()

        Toast.fire({
          icon: 'success',
          title: response.mensj
        })
          
        }
    });

    }
  }) 
    
}


function editarSerie(id_serie, fecha, condensador, evaporizador, metodo) {


  $('#serie-cond').val(condensador)
  $('#serie-evap').val(evaporizador)
  $('#fecha-compra').val(fecha)
  $('#metodo').val(metodo)

  $("#area-botones").empty().append(`
  <div class="col-12 col-md-6 text-end">
       <div class="btn btn-danger" id="btn-cancel-update" onclick="cancelarUpdate()">Cancelar</div>
  </div>

  <div class="col-12 col-md-6 text-start">
       <div class="btn btn-primary" id="btn-update-series" onclick="updateSeries(${id_serie})">Actualizar</div>
  </div>
                    `)


}

function updateSeries(id_serie) { 

  let id_producto = $("#producto").val();
  let serie_cond = $("#serie-cond").val();
  let serie_evap = $("#serie-evap").val();
  let fecha_compra = $("#fecha-compra").val();
  let metodo = $("#metodo").val();
  let dato = {
    producto: id_producto,
    serie_cond: id_serie,
    serie_cond: serie_cond,
    serie_evap: serie_evap,
    fecha_compra: fecha_compra,
    metodo: metodo,
    type: "actualizacion",
    serie:id_serie
};

  $.ajax({
    type: "POST",
    url: "../servidor/inventario/manejo-de-series.php",
    data: dato,
    dataType: "JSON",
    success: function (response) {
    
    reloadTable()

    Toast.fire({
      icon: 'success',
      title: response.mensj
    })
      
    }
});

 }

function cancelarUpdate(){

  $('#serie-cond').val("")
  $('#serie-evap').val("")
  $('#fecha-compra').val("")

  $("#area-botones").empty().append(`
  <div class="col-12 col-md-6 text-center">
     <div class="btn btn-success" id="btn-add-serie" onclick="agregarSerie()">Agregar</div>
 </div>
                    `)

}


function reloadTable(){

  let id_producto = $("#producto").val();
  let indicador = "producto_id";
  let tabla_ref = "series";

  $.ajax({
     type: "POST",
     url: "../servidor/inventario/traer-datos-en-base-uno.php",
     data: { id: id_producto, tabla: tabla_ref, indicador: indicador },
     dataType: "JSON",
     success: function (response) {
     if (response.status == true) {
         $("#serie-cond").prop("disabled", false);
         $("#serie-evap").prop("disabled", false);
         $("#btn-add-serie").removeClass("disabled")

         let array_dataset = response.data.map(function (item) {
         let array_item = Object.values(item);
         console.log(array_item);
         return array_item;
         });
         
         array_dataset = array_dataset.filter(function(val) {
          console.log(val[6]);
          if(val[6] == "Activo"){
            return val; 
          }
          
      });
         
         tableDestroy();
         tableInit(array_dataset);
     }
     },
 });

}

