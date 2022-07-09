// Landscape export, 2×4 inches
const doc = new jsPDF();

logo = data_logo.replace(/[\s"\\]/gm, "");
doc.addImage(logo, "JPEG", 8, 5, 40, 18);

let id_orden = getParameterByName("id_orden")  

/* $.ajax({
    type: "POST",
    url: "../inventario/traer-datos-de-ordne.php",
    data: {id_orden: id_orden},
    dataType: "JSON",
    success: function (response) {
        console.log(response);
    }
}); */

console.log(doc.getFontList());
doc.setFont("helvetica"); // set font
doc.setFontType("bold"); // set font

doc.text("Orden de servicio", 140, 10);

doc.setFontSize(12);
doc.text("868348398", 140, 17);

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


doc.save("Orden de servicio.pdf");



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }