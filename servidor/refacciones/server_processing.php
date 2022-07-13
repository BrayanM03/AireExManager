<?php

/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simple to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = 'refacciones';

// Table's primary key
$primaryKey = 'id';
$sucursal_id = $_GET['sucursal_id'];


// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'db' => 'id', 'dt' => 0 ),
	array( 'db' => 'proveedor',  'dt' => 1 ),
	array( 'db' => 'descripcion', 'dt' => 2 ),
	array( 'db' => 'stock', 'dt' => 3 ),
	array( 'db' => 'modelo', 'dt' => 4 ),
	array( 'db' => 'marca', 'dt' => 5 ),
	array( 'db' => 'costo',  'dt' => 6 ),
	array( 'db' => 'precio',   'dt' => 7 ),
	array( 'db' => 'estatus',   'dt' => 8 ),
	array( 'db' => 'observaciones',   'dt' => 9 ),
	array( 'db' => 'sucursal',   'dt' => 10 ),
/* 	array(
		'db'        => 'start_date',
		'dt'        => 4,
		'formatter' => function( $d, $row ) {
			return date( 'jS M y', strtotime($d));
		}
	),
	array(
		'db'        => 'salary',
		'dt'        => 5,
		'formatter' => function( $d, $row ) {
			return '$'.number_format($d);
		}
	) */
);

// SQL server connection information
$sql_details = array(
	'user' => 'root',
	'pass' => '',
	'db'   => 'aire_express',
	'host' => 'localhost'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( '../database/ssp.class.php' );

echo json_encode(
	SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, null, "sucursal = '$sucursal_id'")
);


