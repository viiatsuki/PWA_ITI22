-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS `login` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE `login`;

-- Crear la tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar un usuario de prueba (cambia las credenciales según necesites)
INSERT IGNORE INTO `usuarios` (`usuario`, `contraseña`, `email`) VALUES
('admin', 'admin123', 'admin@example.com'),
('usuario1', 'password123', 'usuario1@example.com'),
('test', 'test123', 'test@example.com');

