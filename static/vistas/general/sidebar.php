<nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
        <a class="sidebar-brand" href="index.html">
            <span class="align-middle">AireExpress</span>
        </a>

        <ul class="sidebar-nav">
            <li class="sidebar-header">
                Inicio
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="index.php">
                    <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Panel</span>
                </a>
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="nueva-orden.php">
                    <i class="align-middle" data-feather="shopping-cart"></i> <span class="align-middle">Nueva venta</span>
                </a>
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="nueva-cotizacion.php">
                    <i class="align-middle" data-feather="clipboard"></i> <span class="align-middle">Nueva cotización</span>
                </a>
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="historial.php">
                    <i class="align-middle" data-feather="folder"></i> <span class="align-middle">Historial</span>
                </a>
            </li>

            <!-- <li class="sidebar-item">
                <a class="sidebar-link" href="pages-blank.html">
                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Blank</span>
                </a>
            </li> -->

            <li class="sidebar-header">
                Inventario
            </li>


            <?php

            include './../servidor/database/conexion.php';

            $consultar_sucu = "SELECT COUNT(*) FROM sucursal";
            $res = $con->prepare($consultar_sucu);
            $res->execute();
            $total_sucu = $res->fetchColumn();
            $res->closeCursor();

            if ($total_sucu > 0) {

                $consultar = $con->prepare("SELECT * FROM sucursal");
                $consultar->execute();
                while ($row = $consultar->fetch()) {

            ?>

                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">

                            <li class="sidebar-item accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse<?php echo $row["id"] ?>" aria-expanded="true" aria-controls="collapse<?php echo $row["id"] ?>">
                                <a class="sidebar-link" href="#">
                                    <i class="align-middle" data-feather="map-pin"></i> <span class="align-middle"><?php echo $row["nombre"] ?></span>
                                </a>
                            </li>




                            <div id="collapse<?php echo $row["id"] ?>" class="accordion-collapse collapse" style="margin-left:13px;" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <li class="sidebar-item">
                                        <a class="sidebar-link" href="inventario.php?store_id=<?php echo $row['id'] ?>&name=<?php echo $row['nombre'] ?>">
                                            <i class="align-middle" data-feather="cloud-snow"></i> <span class="align-middle">Aires</span>
                                        </a>
                                    </li>
                                    <li class="sidebar-item">
                                        <a class="sidebar-link" href="refacciones.php?store_id=<?php echo $row['id'] ?>&name=<?php echo $row['nombre'] ?>">
                                            <i class="align-middle" data-feather="settings"></i> <span class="align-middle">Refacciones</span>
                                        </a>
                                    </li>
                                    <li class="sidebar-item">
                                        <a class="sidebar-link" href="servicios.php?store_id=<?php echo $row['id'] ?>&name=<?php echo $row['nombre'] ?>">
                                            <i class="align-middle" data-feather="truck"></i> <span class="align-middle">Servicios</span>
                                        </a>
                                    </li>
                                </div>
                            </div>

                        </div>
                    </div>



            <?php
                }
            }
            ?>







            <li class="sidebar-header">
                Personas
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="clientes.php">
                    <i class="align-middle" data-feather="heart"></i> <span class="align-middle">Clientes</span>
                </a>
            </li>

            <li class="sidebar-header">
                Seguridad
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="token.php">
                    <i class="align-middle" data-feather="heart"></i> <span class="align-middle">Token</span>
                </a>
            </li>
<!-- 
            <li class="sidebar-item">
                <a class="sidebar-link" href="maps-google.html">
                    <i class="align-middle" data-feather="users"></i> <span class="align-middle">Usuarios</span>
                </a>
            </li> -->
        </ul>

        <div class="sidebar-cta">
            <div class="sidebar-cta-content">
                <strong class="d-inline-block mb-2">Sistema en proceso</strong>
                <div class="mb-3 text-sm">
                    Algunas funciones estan en proceso de desarollo.
                </div>
                <!-- <div class="d-grid">
                    <a href="upgrade-to-pro.html" class="btn btn-primary">Upgrade to Pro</a>
                </div> -->
            </div>
        </div>
    </div>
</nav>