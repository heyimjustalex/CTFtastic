# CTFtastic

App that is used to organize CTF contests with React/Spring/MySQL/Flask/Kubernetes/Docker/Helm. It allows people to generate one container per challenge per team.

## Starting project

To start project without backend:
```python
docker-compose up
```
To start with backend:
```python
docker-compose -f docker-compose_with_backend.yml up
```

## Backend

### Starting Development
To develop backend you need to start compose without backend (docker-compose up) and then launch InteliJ. Make sure database is avaliable (docker ps) or you will not be able to build backend project.

If the project does not build

1. Delete these files
 <img src="https://user-images.githubusercontent.com/21158649/191355069-c24f6d6a-913a-4370-8844-9eec0983c92d.png" width="300">
 
2. Reopen project in InteliJ

3. And build like that
 <img src="https://user-images.githubusercontent.com/21158649/191355310-1bcd1a39-30b3-4c6d-999c-241b406f8efc.png" width="430">
 
### Backend config

It is stored in 2 files: pom.xml and aplication.properties 

<img src="https://user-images.githubusercontent.com/21158649/191355727-2996a422-8066-4c8c-b257-5e661a56372e.png" width="390">

db is database name specified in both setup.sql and docker-compose.yml
ports also specified in docker-compose.yml

## Database

### Schema modification
MySQL database schema is stored in setup.sql. To modify it you need to:

1. shut containers down (docker stop <container-id>)
2. delete containers (docker containers prune OR docker rm <container-id>)
3. delete volumes (docker volume prune OR docker volume rm <volume-name>

🔴IMPORTANT Schema won't reload if you have previous database stored in named volume❗ 

### Diagram
   <img src="https://user-images.githubusercontent.com/21158649/191381745-8949218e-63cf-470f-bc81-6d706831d310.png" width="700">


### PHPmyadmin
  There is phpmyadmin client if you want to see database without connection to the container. To log in you need to go to localhost:8081 and then fill in the form
  - Server: db 
  - User: root
  - Password: password
   <img src="https://user-images.githubusercontent.com/21158649/191350627-f9610001-7a8e-4211-846a-c54cc1efd06a.png" width="350">
   
   ### Logging to MySQL inside container
```python  
docker exec -it <container-id> bash
```
```python 
mysql -u root -p [ENTER]
```
```python 
 password  [ENTER]
 ```
```python 
SHOW databases;
USE db;
SHOW tables;
```
🔴[ENTER] means clicking enter 


  

