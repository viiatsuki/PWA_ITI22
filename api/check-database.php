<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

// Verificar si la tabla usuarios existe
$tableExists = false;
$result = $mysqli->query("SHOW TABLES LIKE 'usuarios'");
if ($result && $result->num_rows > 0) {
    $tableExists = true;
}

// Verificar la estructura de la tabla
$tableStructure = [];
if ($tableExists) {
    $result = $mysqli->query("DESCRIBE usuarios");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $tableStructure[] = $row;
        }
    }
}

// Verificar si hay usuarios en la tabla
$userCount = 0;
if ($tableExists) {
    $result = $mysqli->query("SELECT COUNT(*) as count FROM usuarios");
    if ($result) {
        $row = $result->fetch_assoc();
        $userCount = $row['count'];
    }
}

// Obtener el nombre de la base de datos actual
$currentDb = '';
$result = $mysqli->query("SELECT DATABASE() as current_db");
if ($result) {
    $row = $result->fetch_assoc();
    $currentDb = $row['current_db'];
}

echo json_encode([
    'ok' => true,
    'database_name' => $currentDb,
    'server_info' => $mysqli->server_info,
    'table_exists' => $tableExists,
    'table_structure' => $tableStructure,
    'user_count' => $userCount,
    'timestamp' => date('Y-m-d H:i:s')
]);

$mysqli->close();
?>
