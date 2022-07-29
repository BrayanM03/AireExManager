function configurationPanel(){
    
    Swal.fire({
        icon: 'info',
        title: 'Configuraciones',
        html: `
        <div class="container">
        <div class="list-group">
            
            <a href="#" class="list-group-item list-group-item-action" onclick="realizarReporte()">Reporte de venta</a>
        </div>
        </div>
        `
        
    })
}

function realizarReporte(){
    
    window.location.href = "realizar-corte.php";

}