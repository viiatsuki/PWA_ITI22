<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'POST') {
	http_response_code(405);
	echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
	exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$username = isset($input['usuario']) ? trim($input['usuario']) : '';
$password = isset($input['contrasena']) ? $input['contrasena'] : '';

if ($username === '' || $password === '') {
	http_response_code(400);
	echo json_encode(['ok' => false, 'error' => 'usuario y contrasena son requeridos']);
	exit();
}

$stmt = $mysqli->prepare('SELECT `ID`, `usuario`, `contraseña` FROM `usuarios` WHERE `usuario` = ? LIMIT 1');
if (!$stmt) {
	http_response_code(500);
	echo json_encode(['ok' => false, 'error' => 'Query prepare failed']);
	exit();
}
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
	http_response_code(401);
	echo json_encode(['ok' => false, 'error' => 'Credenciales invalidas']);
	exit();
}

// Plain-text password check (replace with password_hash in production)
if ($password !== $user['contraseña']) {
	http_response_code(401);
	echo json_encode(['ok' => false, 'error' => 'Credenciales invalidas']);
	exit();
}

echo json_encode([
	'ok' => true,
	'user' => [
		'ID' => (int)$user['ID'],
		'usuario' => $user['usuario']
	]
]);
