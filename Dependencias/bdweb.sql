DROP DATABASE IF EXISTS web;
CREATE DATABASE web;
USE web;

-- Crear la tabla principal de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    user_type ENUM('profesional', 'cliente')
);

-- Crear la tabla de publicaciones
CREATE TABLE publicacion(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    contenido VARCHAR(255),
    confirmacion BOOLEAN,
    contactotel VARCHAR(10),
    contactocorreo VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Crear tabla para los profesionales
CREATE TABLE usersProfesional (
    user_id INT PRIMARY KEY,
    fechanacimiento DATE,
    celular VARCHAR(10),
    servicio VARCHAR(255),
    descripcionserv VARCHAR(255),
    experiencia VARCHAR(255),
    certificaciones VARCHAR(255),
    tarifa DECIMAL(10,2),
    disponibilidad VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear tabla para los clientes
CREATE TABLE usersCliente (
    user_id INT PRIMARY KEY,
    namecliente VARCHAR(100),
    fechanacimiento DATE,
    celular VARCHAR(10),
    direccion VARCHAR(255),
    informacionad VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
select* from usersCliente
