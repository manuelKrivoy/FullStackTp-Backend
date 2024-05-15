CREATE DATABASE TpArqWeb;

CREATE TABLE usuarios (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES usuarios(username) ON DELETE CASCADE -- Necesario
);

-- Crear usuario admin (NECESARIO)
INSERT INTO usuarios (username, password) VALUES ('admin', 'admin123');