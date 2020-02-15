# Service


## Requirements
- mysql Ver 14.14 Distrib 5.7.29

- mosquitto version 1.4.15 

- node v8.10.0

- npm 3.5.2

- Python 3.6.9 


## Setup Database
>*CREATE USER 'leaf_eye'@'localhost' IDENTIFIED BY 'leaf_eye';*

>*CREATE DATABASE leaf_eye;*

>*GRANT ALL PRIVILEGES ON leaf_eye.* TO 'leaf_eye'@'localhost';*

C>*REATE TABLE data (timestamp TIMESTAMP NOT NULL, leaf_id INT UNSIGNED, temperature FLOAT, humidity FLOAT UNSIGNED, pressure FLOAT UNSIGNED);*

