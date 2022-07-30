$("#select-sucursal").change(function (e) { 
    $("#example").dataTable().fnDestroy();
    
    let folder = $("#cotizacion-title").attr("folder")
   let sucursal_id = $(this).val();

   if(folder == "historial"){
       columnas = [
        { data:0, title:'#' },
        { data:14, title:'cliente' },
        { data:3, title:'fecha inicio' },
        { data:4, title:'hora inicio' },
        { data:5, title:'fecha cierre' },
        { data:6, title:'hora cierre' },
        { data:7, title:'total' },
        { data:8, title:'utilidad'},
        { data:null, title:'estatus', render:function(data,row){ 
         
          if(data[9] == "Cerrada"){classN = 'success'}else if(data[9] == "Pendiente"){
            classN = 'warning'
          }
         return `<span class="badge bg-${classN}">${data[9]}</span>`}},
        { data:11, title:'metodo' },
        { data:15, title:'usuario' },
        { data:null, title:'tipo', render(data, row){
          switch(data[10]){
            case '1': type = 'Venta <b style="color: tomato;">sin</b> instalación'; break;
            case '2': type = 'Venta <b style="color: #009c8c;">con</b> instalación'; break;
            case '3': type = 'Servicio'; break;
          }
          return type;
        } },
        { data:null, title:'Opciones', render: function(row){
            return `
            <div class='row'>
                <div class='col-12 col-md-12'>
                    <div class="btn btn-success" onclick="descargarOrden(${row[0]})"><i class="fa-solid fa-file-pdf"></i></div>
                    <div class="btn btn-primary" onclick="verOpciones(${row[0]},'${row[9]}', '${row[10]}')"><i class="fa-solid fa-gear"></i></i></div>
                    <div class="btn btn-danger" onclick="eliminarOrden(${row[0]})"><i class="fa-solid fa-trash"></i></div>
                </div>
            </div>
            `
        }}
    ]
   }else if(folder == "historial_cotizaciones"){
       columnas = [
        { data:0, title:'#' },
        { data:12, title:'cliente' },
        { data:3, title:'fecha' },
        { data:4, title:'hora' },
        { data:5, title:'total' },
        { data:null, title:'estatus', render:function(data,row){ 
         
          if(data[7] == "Cerrada"){classN = 'success'}else if(data[7] == "Pendiente"){
            classN = 'warning'
          }
         return `<span class="badge bg-${classN}">${data[7]}</span>`}},
        { data:13, title:'usuario' },
        { data:null, title:'tipo', render(data, row){
          switch(data[8]){
            case '1': type = 'Venta <b style="color: tomato;">sin</b> instalación'; break;
            case '2': type = 'Venta <b style="color: #009c8c;">con</b> instalación'; break;
            case '3': type = 'Servicio'; break;
          }
          return type;
        } },
        { data:null, title:'Opciones', render: function(row){
            return `
            <div class='row'>
                <div class='col-12 col-md-12'>
                    <div class="btn btn-success" onclick="descargarCotizacion(${row[0]})"><i class="fa-solid fa-file-pdf"></i></div>
                    <div class="btn btn-danger" onclick="eliminarCotizacion(${row[0]})"><i class="fa-solid fa-trash"></i></div>
                </div>
            </div>
            `//<div class="btn btn-primary" onclick="verOpciones(${row[0]},'${row[9]}', '${row[10]}')"><i class="fa-solid fa-gear"></i></i></div>
        }}
    ]
   }else if(folder == "gastos"){
    columnas =  [
      { data:0, title:'#' },
      { data:1, title:'Descripcion' },
      { data:2, title:'Importe' },
      { data:7, title:'Sucursal' },
      { data:8, title:'Usuario' },
      { data:5, title:'Fecha' },
      { data:6, title:'Hora' },
      { data:null, title:'Opciones', render: function(row){
          return `
          <div class='row'>
              <div class='col-12 col-md-12'>
                
                  
                  <div class="btn btn-danger" onclick="eliminarGasto(${row[0]})"><i class="fa-solid fa-trash"></i></div>
              </div>
          </div>
          `
      }}
  ]
   }

   tabla = $('#example').DataTable({
    processing: true,
    serverSide: true,
    ajax:{
        url: '../servidor/'+ folder +'/server_processing.php?sucursal_id=' + sucursal_id,
        dataType: 'json'
    },
    responsive: true,
    order: [0, 'desc'],
    columns:  columnas,
    
        language: language_options,


    
    
});



 })