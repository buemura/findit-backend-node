CREATE DATABASE findit;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    address VARCHAR(200),
    postal_code VARCHAR(10), 
    user_photo VARCHAR(200),
    UNIQUE (email)
);

CREATE TABLE services(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(150) NOT NULL,
    price VARCHAR(10) NOT NULL,
    postal_code VARCHAR(10) NOT NULL
);

CREATE TABLE phones(
    phone_id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    phone VARCHAR(20) NOT NULL
);

INSERT INTO users (name, email, password, address, postal_code, user_photo) 
    VALUES ('bruno', 'bruno@gmail.com', '123456', 'Example Street, N 000, Example District', '13056999', 'https://github.com/BrunoUemura.png');

INSERT INTO users (name, email, password)
    VALUES ('elon musk', 'elon.musk@gmail.com', '12345678');

INSERT INTO services (title, category, description, price, postal_code) 
    VALUES ('Phone repair', 'IT', 'I perform all brand phone repair', '40', '13056482'), ('Construction services', 'Construction', 'I perform all kind of construction services', '100', '13056487');
