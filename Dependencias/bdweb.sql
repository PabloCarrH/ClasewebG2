DROP DATABASE IF EXISTS web;
CREATE DATABASE web;
USE web;

-- Crear la tabla principal de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    user_type ENUM('professional', 'client')
);

-- Crear la tabla de publicaciones
CREATE TABLE publicacion(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    servicio VARCHAR(255),
    costo VARCHAR(255),
    fehcaInicio DATE,
    fehcaFinal DATE,
    NomCliente VARCHAR(15), -- Aumentado para soportar códigos de área
    NomProfecional VARCHAR(100),
    asignado boolean,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear tabla para los profesionales
CREATE TABLE usersProfesional (
    user_id INT PRIMARY KEY,
    fechanacimiento DATE,
    celular VARCHAR(10),
    direccion VARCHAR(255),
    servicio VARCHAR(255),
    descripcionserv VARCHAR(255),
    experiencia VARCHAR(255),
    certificaciones VARCHAR(255),
    tarifa DECIMAL(10,2),
    disponibilidad VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear tabla para los clientes
CREATE TABLE usersCliente (
    user_id INT PRIMARY KEY,
    namecliente VARCHAR(100),
    fechanacimiento DATE,
    celular VARCHAR(10),
    direccion VARCHAR(255),
    informacionad VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO usersProfesional (user_id, fechanacimiento, celular, direccion, servicio, descripcionserv, experiencia, certificaciones, tarifa, disponibilidad) VALUES
(1, '1985-04-15', '5551234567', 'Calle Falsa 123', 'Plomería', 'Servicios de plomería residencial y comercial', '10 años', 'Certificación en plomería', 50.00, 'Lunes a Viernes, 9 AM - 5 PM'),
(2, '1990-06-20', '5559876543', 'Avenida Siempre Viva 742', 'Electricidad', 'Instalación y reparación eléctrica', '8 años', 'Certificación en electricidad', 60.00, 'Sábado, 10 AM - 4 PM');
INSERT INTO usersCliente (user_id, namecliente, fechanacimiento, celular, direccion, informacionad) VALUES
(1, 'Carlos Gómez', '1992-03-10', '5554567890', 'Boulevard de los Sueños 456', 'Cliente habitual de servicios de plomería'),
(2, 'Lucía Fernández', '1988-11-25', '5553216549', 'Calle de la Amistad 789', 'Interesada en servicios de electricidad');


-- Mostrar datos de la tabla usersCliente
SELECT * FROM usersCliente;
SELECT * FROM usersCliente WHERE user_id= 2;

