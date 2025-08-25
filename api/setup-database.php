<?php
header('Content-Type: application/json');

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';

try {
    // Conectar sin especificar base de datos
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
    
    if ($mysqli->connect_error) {
        throw new Exception('Error conectando a MySQL: ' . $mysqli->connect_error);
    }
    
    // Leer el archivo SQL
    $sqlFile = __DIR__ . '/setup-database.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception('Archivo SQL no encontrado');
    }
    
    $sql = file_get_contents($sqlFile);
    
    // Ejecutar las consultas SQL
    $queries = explode(';', $sql);
    $results = [];
    
    foreach ($queries as $query) {
        $query = trim($query);
        if (!empty($query)) {
            if ($mysqli->query($query)) {
                $results[] = ['query' => $query, 'status' => 'success'];
            } else {
                $results[] = ['query' => $query, 'status' => 'error', 'message' => $mysqli->error];
            }
        }
    }
    
    echo json_encode([
        'ok' => true,
        'message' => 'Base de datos configurada correctamente',
        'results' => $results,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'ok' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

if (isset($mysqli)) {
    $mysqli->close();
}
?>

