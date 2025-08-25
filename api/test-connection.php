<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

// Verificar si la conexión a la base de datos funciona
if ($mysqli->ping()) {
    echo json_encode([
        'ok' => true,
        'message' => 'Conexión exitosa a la base de datos',
        'server_info' => $mysqli->server_info,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} else {
    echo json_encode([
        'ok' => false,
        'error' => 'No se pudo conectar a la base de datos',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

$mysqli->close();
?>

