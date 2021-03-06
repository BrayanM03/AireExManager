// Landscape export, 2×4 inches
const doc = new jsPDF();

logo = data_logo.replace(/[\s"\\]/gm, "");
icon_checked= data_checked.replace(/[\s"\\]/gm, "");
icon_unchecked = data_unchecked.replace(/[\s"\\]/gm, "");
doc.addImage(logo, "JPEG", 8, 5, 40, 12);

let id_orden = getParameterByName("id_orden")  

$.ajax({
    type: "POST",
    url: "../reportes/traer-datos-de-cotizacion.php",
    data: {id_orden: id_orden, tabla: "cotizaciones", indicador: "id"},
    dataType: "JSON",
    success: function (response) {
        console.log(response);

doc.setFont("helvetica"); // set font
doc.setFontType("bold"); // set font

doc.text("Cotización", 140, 10);

doc.setFontSize(12);
doc.text("868348398", 140, 17);
doc.text("C" + response.folio, 170, 17);

doc.setDrawColor(255,0,0); // draw red lines
doc.line(8, 30, 200, 30); //Line
doc.setDrawColor(10,10,10); // draw black lines
doc.line(8, 31, 200, 31); //Line

//Diseño de formulario de datoa de cliente - maquetacion
doc.setDrawColor(220,220,220); // draw gray lines
doc.rect(8,32,192,15)
doc.line(8, 39, 200, 39); //Line
doc.line(145, 32, 145, 47); // vertical line

doc.rect(8,47,192,15)
doc.line(8, 55, 200, 55); //Line
doc.line(145, 47, 145, 62); // vertical line

doc.setDrawColor(10,10,10); // draw black lines
doc.setFontType("normal"); // set font
doc.setFontSize(10);
doc.text("Calle Diesciseis Buena Vista, 87350 Heroica Matamoros, Tamps.", 80, 27);

//Datos cliente
doc.setFontType("bold"); // set font
doc.text("Nombre", 10, 38);
doc.text("Fecha", 147, 38);
doc.text("Contacto", 10, 45);
doc.text("RFC", 147, 45);
doc.text("Domicilio", 10, 53);
doc.text("Telefono", 147, 53);
doc.text("Colonia", 10, 60);
doc.text("Correo", 147, 60);

doc.setFontType("normal"); // set font
doc.text(response.datos_cliente.nombre, 28, 38)
doc.text(response.fecha, 160, 38)
doc.text(response.datos_cliente.contacto, 28, 45)
doc.text(response.datos_cliente.rfc, 165, 45)
doc.text(response.datos_cliente.direccion, 28, 53)
doc.text(response.datos_cliente.telefono, 170, 53)

 //---------Cuerpo de seires ---//
/*  let bodySeries = [];
 let contador = 1;
 response.detalle_orden.forEach(element => {
    if(element["series"]){
      element["series"].forEach(serie => {
        bodySeries.push({index: contador, condensador: serie.serie_condensador, evaporizador: serie.serie_evaporador, desc: serie.descripcion})
        contador++;
      });
    }
}); */


//-----------Cuerpo de items -----//

if(response.tipo == "1" || response.tipo == "3"){
   comentario = 'Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes'
}else if(response.tipo == "2"){
   comentario = `Incluye instalación basica de 4 metros de distancia entre evaporador y 
   condensador, se requiere caja y breaker a menos de 1 metro`
}

let bodyTable = response.detalle_orden;
let metodo = { precio_unit: 'Metodo', importe:response.metodo_pago };
let importe_total = { descripcion: comentario, precio_unit: 'Total', importe: response.total}

bodyTable.push(metodo, importe_total)
/* [
    { cantidad: '2', descripcion: 'Toshiba T-15300 2 TON 220V', precio_unit: '9,500.00', importe:'19,000.00' },
    { precio_unit: 'Metodo', importe:'Tarjeta' },
    { descripcion: 'Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes', precio_unit: 'Total', importe:'76,000.00' },
  ]; */

 
  //---------END------


doc.autoTable(({
    theme: 'grid',
    /* columnStyles: { 0: { halign: 'left', fillColor: [255, 255, 255] } }, */
    /* headStyles: { 0: { halign: 'left', fillColor: [211, 211, 211] } }, */
    headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79]},
    body: bodyTable,

    columns: [
      { header: 'Cant', dataKey: 'cantidad' },
      { header: 'Descripcion', dataKey: 'descripcion' },
      { header: 'Precio Unit.', dataKey: 'precio_unit' },
      { header: 'Importe', dataKey: 'importe' },
    ],
    startY:64,
    margin: { left: 8 },
    tableWidth: 193
  }))

  //Tabla medidas de StartY a partir de la primera pártida. 7.5 puntos de altura por partida
  //86.5 puntos de altura inicial
  /* 1 item = 94 puntos en Y
     2 item = 101.5 puntos en Y
     3 item = 109 puntos en Y
     4 item = 116.5 puntos en Y */
     let alturaPartidas = 8.5 * (bodyTable.length)   
     let startY = 85 + alturaPartidas;



     //MAQUETANDO FOOT DEPENDIENDO DEL TIPO DE ORDENES
     //TIPO 1 VENTA SIN INSTALACION
     //TIPO 2 VENTA CON INSTALACION
     //TIPO 3 SERVICIO

  

      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:startY,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: 'Esta es una nota de presupuesto o cotización', dataKey: null }
          ],
      }))
    
    
    
    
      let alturaSeries = 7.5 
    
      let startYfooter = 25 + startY + alturaSeries;
    
      
    
    
      doc.text("Firma:", 10, startYfooter);
      doc.text("Nombre:", 60, startYfooter);
      doc.text("Fecha:", 160, startYfooter);
    
    
      doc.setFontType("bold");
    doc.text("Comentarios:", 10, startYfooter + 10);
    doc.setFontType("normal");
    doc.setFontSize(9);
    let incluye = `  Precios Sujetos a cambio sin previo aviso. Se requiere deposito y/o pago para realizar los servicios de esta cotización. 
    Productos sujetos a disponibilidad, confirmar existencias con agente de ventas.`
    doc.text(incluye, 10, startYfooter + 15);

     
  
doc.save("Reporte de cotización C"+ response.folio+".pdf");



  }
});


/* 
console.log(doc.getFontList()); */




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function cerrar() { 
    window.open('','_parent',''); 
    window.close(); 
 } 