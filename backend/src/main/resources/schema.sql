CREATE TABLE machine (
    id INT PRIMARY KEY,
    machine VARCHAR(30),
    location VARCHAR(40)
);

CREATE TABLE userCountTrack (
    id INT PRIMARY KEY,
    hourNumber INT,
    userCount INT,
)