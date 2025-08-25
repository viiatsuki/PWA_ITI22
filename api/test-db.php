<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo "<h2>Test de Conexión a Base de Datos</h2>";

// Paso 1: Verificar que PHP puede conectarse a MySQL
echo "<h3>Paso 1: Verificar extensión MySQLi</h3>";
if (extension_loaded('mysqli')) {
    echo "✅ MySQLi está habilitado<br>";
} else {
    echo "❌ MySQLi NO está habilitado<br>";
    exit;
}

// Paso 2: Intentar conexión
echo "<h3>Paso 2: Intentar conexión a MySQL</h3>";
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'login';

try {
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
    
    if ($mysqli->connect_error) {
        echo "❌ Error de conexión: " . $mysqli->connect_error . "<br>";
        echo "Host: $DB_HOST<br>";
        echo "Usuario: $DB_USER<br>";
        echo "Contraseña: " . (empty($DB_PASS) ? 'vacía' : 'configurada') . "<br>";
    } else {
        echo "✅ Conexión a MySQL exitosa<br>";
        echo "Versión del servidor: " . $mysqli->server_info . "<br>";
        
        // Paso 3: Verificar si existe la base de datos
        echo "<h3>Paso 3: Verificar base de datos 'login'</h3>";
        $result = $mysqli->query("SHOW DATABASES LIKE 'login'");
        if ($result->num_rows > 0) {
            echo "✅ Base de datos 'login' existe<br>";
            
            // Paso 4: Seleccionar la base de datos
            if ($mysqli->select_db($DB_NAME)) {
                echo "✅ Base de datos 'login' seleccionada<br>";
                
                // Paso 5: Verificar si existe la tabla usuarios
                echo "<h3>Paso 4: Verificar tabla 'usuarios'</h3>";
                $result = $mysqli->query("SHOW TABLES LIKE 'usuarios'");
                if ($result->num_rows > 0) {
                    echo "✅ Tabla 'usuarios' existe<br>";
                    
                    // Paso 6: Verificar estructura de la tabla
                    echo "<h3>Paso 5: Estructura de la tabla</h3>";
                    $result = $mysqli->query("DESCRIBE usuarios");
                    echo "<table border='1'>";
                    echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row['Field'] . "</td>";
                        echo "<td>" . $row['Type'] . "</td>";
                        echo "<td>" . $row['Null'] . "</td>";
                        echo "<td>" . $row['Key'] . "</td>";
                        echo "<td>" . $row['Default'] . "</td>";
                        echo "<td>" . $row['Extra'] . "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    
                    // Paso 7: Verificar si hay usuarios
                    echo "<h3>Paso 6: Usuarios en la tabla</h3>";
                    $result = $mysqli->query("SELECT COUNT(*) as total FROM usuarios");
                    $count = $result->fetch_assoc()['total'];
                    echo "Total de usuarios: $count<br>";
                    
                    if ($count > 0) {
                        $result = $mysqli->query("SELECT ID, usuario FROM usuarios LIMIT 5");
                        echo "Primeros usuarios:<br>";
                        while ($row = $result->fetch_assoc()) {
                            echo "- ID: " . $row['ID'] . ", Usuario: " . $row['usuario'] . "<br>";
                        }
                    }
                    
                } else {
                    echo "❌ Tabla 'usuarios' NO existe<br>";
                    echo "Debes crear la tabla con:<br>";
                    echo "<code>CREATE TABLE usuarios (ID INT AUTO_INCREMENT PRIMARY KEY, usuario VARCHAR(100) UNIQUE NOT NULL, contraseña VARCHAR(255) NOT NULL);</code><br>";
                }
                
            } else {
                echo "❌ No se pudo seleccionar la base de datos 'login'<br>";
            }
            
        } else {
            echo "❌ Base de datos 'login' NO existe<br>";
            echo "Debes crearla con:<br>";
            echo "<code>CREATE DATABASE login CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;</code><br>";
        }
        
        $mysqli->close();
    }
    
} catch (Exception $e) {
    echo "❌ Excepción: " . $e->getMessage() . "<br>";
}
?>
